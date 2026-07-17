param(
  [string]$BackupFile = ""
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$runRoot = $PSScriptRoot
$envFile = Join-Path $runRoot ".env"
$backupDir = Join-Path $runRoot "data\backups"
$pgBin = Join-Path $runRoot "runtime\postgres\bin"
$pgRestore = Join-Path $pgBin "pg_restore.exe"
$dropDb = Join-Path $pgBin "dropdb.exe"
$createdb = Join-Path $pgBin "createdb.exe"

function Get-EnvValue([string]$Key, [string]$Default = "") {
  if (-not (Test-Path -Path $envFile)) { return $Default }
  $line = Get-Content -Path $envFile |
    Where-Object { -not [string]::IsNullOrWhiteSpace($_) -and $_.TrimStart() -notlike "#*" } |
    ForEach-Object {
      $parts = $_ -split "=", 2
      if ($parts.Count -ge 2 -and $parts[0].Trim() -eq $Key) { $_ }
    } |
    Select-Object -First 1
  if (-not $line) { return $Default }
  return ($line -replace "^[^=]*=", "").Trim()
}

foreach ($tool in @($pgRestore, $dropDb, $createdb)) {
  if (-not (Test-Path -Path $tool)) { throw "No se encontro herramienta PostgreSQL: $tool" }
}

if ([string]::IsNullOrWhiteSpace($BackupFile)) {
  $latest = Get-ChildItem -Path $backupDir -Filter "*.backup" -ErrorAction SilentlyContinue | Sort-Object LastWriteTime -Descending | Select-Object -First 1
  if (-not $latest) { throw "No se encontro backup en $backupDir" }
  $BackupFile = $latest.FullName
}

if (-not (Test-Path -Path $BackupFile)) {
  throw "No existe backup: $BackupFile"
}

$dbHost = "127.0.0.1"
$dbPort = Get-EnvValue "POSTGRES_PORT" "5434"
$dbName = Get-EnvValue "POSTGRES_DB" "cotiflow"
$dbUser = Get-EnvValue "POSTGRES_USER" "cotiflow_user"
$dbPassword = Get-EnvValue "POSTGRES_PASSWORD" "cotiflow_password"

[Environment]::SetEnvironmentVariable("PGPASSWORD", $dbPassword, "Process")
Write-Host "Restaurando $BackupFile sobre base $dbName"
Write-Host "Cierra la aplicacion antes de restaurar para evitar conexiones activas."

& $dropDb @("-h", $dbHost, "-p", $dbPort, "-U", $dbUser, "--if-exists", $dbName)
if ($LASTEXITCODE -ne 0) { throw "Fallo dropdb (codigo $LASTEXITCODE). Cierra la app y vuelve a intentar." }
& $createdb @("-h", $dbHost, "-p", $dbPort, "-U", $dbUser, $dbName)
if ($LASTEXITCODE -ne 0) { throw "Fallo createdb (codigo $LASTEXITCODE)." }
& $pgRestore @("-h", $dbHost, "-p", $dbPort, "-U", $dbUser, "-d", $dbName, "--clean", "--if-exists", $BackupFile)
if ($LASTEXITCODE -ne 0) { throw "Fallo restore (codigo $LASTEXITCODE)." }
Write-Host "Restauracion completada."
