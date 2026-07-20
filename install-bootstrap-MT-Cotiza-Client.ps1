Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$runRoot = $PSScriptRoot
$dataRoot = Join-Path $env:ProgramData "MT Cotiza Client\data"
$dbVersion = Join-Path $dataRoot "db\PG_VERSION"
$bootstrapMarker = Join-Path $dataRoot "bootstrap.done"
$bootstrapLog = Join-Path $dataRoot "logs\install-bootstrap.log"

New-Item -ItemType Directory -Force -Path (Join-Path $dataRoot "logs") | Out-Null

$env:MT_COTIZA_DATA_ROOT = $dataRoot
if (Test-Path -Path (Join-Path $runRoot "installer-db-choice.env")) {
  Get-Content -Path (Join-Path $runRoot "installer-db-choice.env") | ForEach-Object {
    if ($_ -match '^\s*([^#][^=]+)=(.*)$') {
      [Environment]::SetEnvironmentVariable($matches[1].Trim(), $matches[2].Trim(), "Process")
    }
  }
}

$mode = [Environment]::GetEnvironmentVariable("RUN_DB_MODE", "Process")
if ([string]::IsNullOrWhiteSpace($mode)) { $mode = "portable" }
if ($mode -eq "portable" -and (Test-Path -Path $dbVersion) -and (Test-Path -Path $bootstrapMarker)) {
  "Data local existente detectada. Bootstrap de instalacion omitido: $dataRoot" | Set-Content -Path $bootstrapLog -Encoding UTF8
  exit 0
}
if ($mode -eq "external" -and (Test-Path -Path $bootstrapMarker)) {
  "Bootstrap external existente detectado. Omitido." | Set-Content -Path $bootstrapLog -Encoding UTF8
  exit 0
}

"Bootstrap inicial iniciado: $(Get-Date -Format o)" | Set-Content -Path $bootstrapLog -Encoding UTF8
& powershell.exe -NoProfile -ExecutionPolicy Bypass -File (Join-Path $runRoot "MT-Cotiza-Client-Run.ps1") -NoBrowser -BootstrapOnly *>> $bootstrapLog
$exitCode = $LASTEXITCODE
if ($exitCode -eq 0) { Set-Content -Path $bootstrapMarker -Value (Get-Date -Format o) -Encoding ASCII }
"Bootstrap inicial terminado con codigo ${exitCode}: $(Get-Date -Format o)" | Add-Content -Path $bootstrapLog
exit $exitCode
