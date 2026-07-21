Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$runRoot = $PSScriptRoot
$electronExe = Join-Path $runRoot "electron\dist\electron.exe"
$electronApp = Join-Path $runRoot "electron"
if (-not (Test-Path -Path $electronExe)) {
  throw "No existe Electron: $electronExe"
}

$desktop = [Environment]::GetFolderPath("Desktop")
$shortcutPath = Join-Path $desktop "MT Cotiza Client.lnk"
$iconPath = Join-Path $runRoot "electron\assets\run-app-icon.ico"

$shell = New-Object -ComObject WScript.Shell
$shortcut = $shell.CreateShortcut($shortcutPath)
$shortcut.TargetPath = $electronExe
$shortcut.Arguments = '"' + $electronApp + '"'
$shortcut.WorkingDirectory = $runRoot
$shortcut.Description = "MT Cotiza Client (Escritorio)"
$shortcut.IconLocation = $iconPath + ",0"
$shortcut.Save()

Write-Host "Acceso directo creado: $shortcutPath"
Write-Host "Usa ese acceso para abrir MT Cotiza Client. Para reinicio completo usa restart-MT-Cotiza-Client-Electron.bat."
