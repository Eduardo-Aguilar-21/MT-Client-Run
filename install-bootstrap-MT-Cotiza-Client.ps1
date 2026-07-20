Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$runRoot = $PSScriptRoot
$dataRoot = Join-Path $env:LOCALAPPDATA "MT Cotiza Client\data"
$dbVersion = Join-Path $dataRoot "db\PG_VERSION"
$bootstrapLog = Join-Path $dataRoot "logs\install-bootstrap.log"

New-Item -ItemType Directory -Force -Path (Join-Path $dataRoot "logs") | Out-Null

if (Test-Path -Path $dbVersion) {
  "Data existente detectada. Bootstrap de instalacion omitido: $dataRoot" | Set-Content -Path $bootstrapLog -Encoding UTF8
  exit 0
}

"Bootstrap inicial iniciado: $(Get-Date -Format o)" | Set-Content -Path $bootstrapLog -Encoding UTF8
$env:MT_COTIZA_DATA_ROOT = $dataRoot

& powershell.exe -NoProfile -ExecutionPolicy Bypass -File (Join-Path $runRoot "MT-Cotiza-Client-Run.ps1") -NoBrowser -BootstrapOnly *>> $bootstrapLog
$exitCode = $LASTEXITCODE
"Bootstrap inicial terminado con codigo ${exitCode}: $(Get-Date -Format o)" | Add-Content -Path $bootstrapLog
exit $exitCode
