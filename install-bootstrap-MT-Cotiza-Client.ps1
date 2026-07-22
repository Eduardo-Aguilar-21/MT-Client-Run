Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$runRoot = $PSScriptRoot
$dataRoot = Join-Path $env:ProgramData "MT Cotiza Client\data"
$dbVersion = Join-Path $dataRoot "db\PG_VERSION"
$bootstrapMarker = Join-Path $dataRoot "bootstrap.done"
$baseAccountMarker = Join-Path $dataRoot "base-account-v2.done"
$bootstrapLog = Join-Path $dataRoot "logs\install-bootstrap.log"
$accountConfigPath = Join-Path $runRoot "installer-account.env"

New-Item -ItemType Directory -Force -Path (Join-Path $dataRoot "logs") | Out-Null

function Remove-AccountConfig {
  if (Test-Path -LiteralPath $accountConfigPath) {
    Remove-Item -LiteralPath $accountConfigPath -Force -ErrorAction SilentlyContinue
  }
}

if (Test-Path -LiteralPath $accountConfigPath) {
  $allowedAccountKeys = @(
    "MT_COTIZA_BASE_ACCOUNT_FULL_NAME",
    "MT_COTIZA_BASE_ACCOUNT_USERNAME",
    "MT_COTIZA_BASE_ACCOUNT_PASSWORD"
  )
  Get-Content -LiteralPath $accountConfigPath | ForEach-Object {
    if ($_ -match '^([^=]+)=(.*)$') {
      $accountKey = $matches[1].Trim()
      if ($allowedAccountKeys -contains $accountKey) {
        [Environment]::SetEnvironmentVariable($accountKey, $matches[2], "Process")
      }
    }
  }
}

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
if ($mode -eq "portable" -and (Test-Path -Path $dbVersion) -and (Test-Path -Path $bootstrapMarker) -and (Test-Path -Path $baseAccountMarker)) {
  "Data local existente detectada. Bootstrap de instalacion omitido: $dataRoot" | Set-Content -Path $bootstrapLog -Encoding UTF8
  Remove-AccountConfig
  exit 0
}
if ($mode -eq "external" -and (Test-Path -Path $bootstrapMarker) -and (Test-Path -Path $baseAccountMarker)) {
  "Bootstrap external existente detectado. Omitido." | Set-Content -Path $bootstrapLog -Encoding UTF8
  Remove-AccountConfig
  exit 0
}

"Bootstrap inicial iniciado: $(Get-Date -Format o)" | Set-Content -Path $bootstrapLog -Encoding UTF8
try {
  & powershell.exe -NoProfile -ExecutionPolicy Bypass -File (Join-Path $runRoot "MT-Cotiza-Client-Run.ps1") -NoBrowser -BootstrapOnly -ResetBaseAccount *>> $bootstrapLog
  $exitCode = $LASTEXITCODE
} finally {
  Remove-AccountConfig
}
if ($exitCode -eq 0) {
  $completedAt = Get-Date -Format o
  Set-Content -Path $bootstrapMarker -Value $completedAt -Encoding ASCII
  Set-Content -Path $baseAccountMarker -Value $completedAt -Encoding ASCII
}
"Bootstrap inicial terminado con codigo ${exitCode}: $(Get-Date -Format o)" | Add-Content -Path $bootstrapLog
exit $exitCode
