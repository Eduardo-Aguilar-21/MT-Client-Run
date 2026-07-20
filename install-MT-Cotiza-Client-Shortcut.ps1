Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$runRoot = $PSScriptRoot
$launcher = Join-Path $runRoot "start-MT-Cotiza-Client-Electron.bat"
if (-not (Test-Path -Path $launcher)) {
  throw "No existe launcher: $launcher"
}

$desktop = [Environment]::GetFolderPath("Desktop")
$shortcutPath = Join-Path $desktop "MT Cotiza Client.lnk"
$iconPath = Join-Path $runRoot "electron\assets\run-logo.png"

$shell = New-Object -ComObject WScript.Shell
$shortcut = $shell.CreateShortcut($shortcutPath)
$shortcut.TargetPath = $launcher
$shortcut.WorkingDirectory = $runRoot
$shortcut.Description = "MT Cotiza Client"
if (Test-Path -Path (Join-Path $runRoot "electron\dist\electron.exe")) {
  $shortcut.IconLocation = (Join-Path $runRoot "electron\dist\electron.exe")
}
$shortcut.Save()

Write-Host "Acceso directo creado: $shortcutPath"
Write-Host "Usa ese acceso para abrir MT Cotiza Client. Para reinicio completo usa restart-MT-Cotiza-Client-Electron.bat."
