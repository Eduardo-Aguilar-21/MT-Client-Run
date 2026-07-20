Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$runRoot = $PSScriptRoot
$envFile = Join-Path $runRoot ".env"
$backupDir = Join-Path $runRoot "data\backups"
$pgBin = Join-Path $runRoot "runtime\postgres\bin"
$pgDump = Join-Path $pgBin "pg_dump.exe"

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

if (-not (Test-Path -Path $pgDump)) {
  throw "No se encontro pg_dump.exe en $pgDump"
}

New-Item -ItemType Directory -Path $backupDir -Force | Out-Null

$dbHost = "127.0.0.1"
$dbPort = Get-EnvValue "POSTGRES_PORT" "15434"
$dbName = Get-EnvValue "POSTGRES_DB" "cotiflow"
$dbUser = Get-EnvValue "POSTGRES_USER" "cotiflow_user"
$dbPassword = Get-EnvValue "POSTGRES_PASSWORD" "cotiflow_password"
$stamp = Get-Date -Format "yyyyMMdd-HHmmss"
$outFile = Join-Path $backupDir "cotiflow-$stamp.backup"

[Environment]::SetEnvironmentVariable("PGPASSWORD", $dbPassword, "Process")
Write-Host "Generando backup de $dbName en $outFile"
& $pgDump @("-h", $dbHost, "-p", $dbPort, "-U", $dbUser, "-d", $dbName, "-F", "c", "-f", $outFile)
if ($LASTEXITCODE -ne 0) {
  throw "Fallo backup de base de datos (codigo $LASTEXITCODE). Verifica que Run este iniciado."
}
Write-Host "Backup creado: $outFile"
