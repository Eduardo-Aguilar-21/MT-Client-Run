@echo off
setlocal
cd /d "%~dp0"

powershell.exe -NoProfile -ExecutionPolicy Bypass -Command "$root=(Get-Location).Path; Get-Process java,node,postgres,electron -ErrorAction SilentlyContinue | Where-Object { $_.Path -like ($root + '\*') } | Stop-Process -Force -ErrorAction SilentlyContinue; foreach($p in 3000,8080,5434){ $ids=(Get-NetTCPConnection -LocalPort $p -State Listen -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique); foreach($id in $ids){ $proc=Get-Process -Id $id -ErrorAction SilentlyContinue; if($proc -and $proc.ProcessName -in @('java','node','postgres','electron')){ Stop-Process -Id $id -Force -ErrorAction SilentlyContinue } } }; Remove-Item -Recurse -Force '.\data\logs' -ErrorAction SilentlyContinue; Remove-Item -Recurse -Force ($env:APPDATA + '\mt-cotiza-client-electron'),($env:LOCALAPPDATA + '\mt-cotiza-client-electron'),($env:APPDATA + '\MT Cotiza Client'),($env:LOCALAPPDATA + '\MT Cotiza Client') -ErrorAction SilentlyContinue"

if not exist "electron\dist\electron.exe" (
  call "%~dp0prepare-MT-Cotiza-Client-Run-Electron.bat"
  if errorlevel 1 exit /b 1
)
"%~dp0electron\dist\electron.exe" "%~dp0electron"
