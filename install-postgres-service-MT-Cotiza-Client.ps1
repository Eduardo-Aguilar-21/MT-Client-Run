Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$runRoot = $PSScriptRoot
$choiceFile = Join-Path $runRoot "installer-db-choice.env"
if (Test-Path -Path $choiceFile) {
  $choice = Get-Content -Path $choiceFile -Raw
  if ($choice -match "RUN_DB_MODE=external") {
    Write-Host "PostgreSQL existente seleccionado. No se instala servicio local."
    exit 0
  }
}

$serviceName = "MTCotizaPostgres"
$dataRoot = Join-Path $env:ProgramData "MT Cotiza Client\data"
$pgData = Join-Path $dataRoot "db"
$logsDir = Join-Path $dataRoot "logs"
$pgBin = Join-Path $runRoot "runtime\postgres\bin"
$initdb = Join-Path $pgBin "initdb.exe"
$pgCtl = Join-Path $pgBin "pg_ctl.exe"
$psql = Join-Path $pgBin "psql.exe"
$createdb = Join-Path $pgBin "createdb.exe"
$port = "15434"
$dbName = "cotiflow"
$dbUser = "cotiflow_user"
$dbPassword = "cotiflow_password"

New-Item -ItemType Directory -Force -Path $pgData, $logsDir | Out-Null
if (-not (Test-Path $initdb)) { throw "No se encontro $initdb" }

icacls $dataRoot /grant "*S-1-5-20:(OI)(CI)F" /T | Out-Null
icacls $runRoot /grant "*S-1-5-20:(OI)(CI)RX" /T | Out-Null

if (-not (Test-Path (Join-Path $pgData "PG_VERSION"))) {
  & $initdb -D $pgData -U postgres -A trust -E UTF8
  if ($LASTEXITCODE -ne 0) { throw "initdb fallo con codigo $LASTEXITCODE" }
  icacls $pgData /grant "*S-1-5-20:(OI)(CI)F" /T | Out-Null
}

$service = Get-Service -Name $serviceName -ErrorAction SilentlyContinue
if (-not $service) {
  & $pgCtl register -N $serviceName -D $pgData -U "NT AUTHORITY\NetworkService" -S auto -o "-p $port -h 127.0.0.1"
  if ($LASTEXITCODE -ne 0) { throw "No se pudo registrar servicio PostgreSQL $serviceName" }
}

Start-Service -Name $serviceName -ErrorAction SilentlyContinue
$ready = $false
for ($i = 0; $i -lt 60; $i++) {
  & (Join-Path $pgBin "pg_isready.exe") -h 127.0.0.1 -p $port >$null 2>$null
  if ($LASTEXITCODE -eq 0) { $ready = $true; break }
  Start-Sleep -Seconds 1
}
if (-not $ready) { throw "Servicio PostgreSQL $serviceName no quedo listo" }

$roleExists = (& $psql -h 127.0.0.1 -p $port -U postgres -d postgres -tAc "SELECT 1 FROM pg_roles WHERE rolname = '$dbUser'") -join ""
if ($roleExists.Trim() -ne "1") {
  & $psql -h 127.0.0.1 -p $port -U postgres -d postgres -c "CREATE ROLE `"$dbUser`" LOGIN PASSWORD '$dbPassword'" | Out-Null
} else {
  & $psql -h 127.0.0.1 -p $port -U postgres -d postgres -c "ALTER ROLE `"$dbUser`" WITH PASSWORD '$dbPassword'" | Out-Null
}
& $createdb -h 127.0.0.1 -p $port -U postgres -O $dbUser $dbName 2>$null


Write-Host "Servicio PostgreSQL listo: $serviceName en 127.0.0.1:$port"
