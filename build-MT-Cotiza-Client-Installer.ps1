Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$runRoot = $PSScriptRoot
$iss = Join-Path $runRoot "installer\MT-Cotiza-Client.iss"
$isccCandidates = @(
  (Join-Path ${env:ProgramFiles(x86)} "Inno Setup 6\ISCC.exe"),
  (Join-Path $env:ProgramFiles "Inno Setup 6\ISCC.exe")
)
$iscc = $isccCandidates | Where-Object { Test-Path -Path $_ } | Select-Object -First 1
if (-not $iscc) {
  throw "No se encontro Inno Setup 6. Instala Inno Setup y vuelve a ejecutar build-MT-Cotiza-Client-Installer.bat."
}
if (-not (Test-Path -Path (Join-Path $runRoot "electron\dist\electron.exe"))) {
  & (Join-Path $runRoot "prepare-MT-Cotiza-Client-Run-Electron.bat")
  if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
}
& $iscc $iss
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
Write-Host "Instalador generado en installer\output."
