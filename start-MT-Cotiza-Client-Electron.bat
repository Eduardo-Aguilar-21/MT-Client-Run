@echo off
setlocal
cd /d "%~dp0"

powershell.exe -NoProfile -ExecutionPolicy Bypass -Command "Get-Process java,node,postgres,electron -ErrorAction SilentlyContinue | Where-Object { $_.Path -like '%CD%\*' } | Stop-Process -Force -ErrorAction SilentlyContinue; Remove-Item -Recurse -Force '.\data\logs' -ErrorAction SilentlyContinue"

if not exist "electron\dist\electron.exe" (
  call "%~dp0prepare-MT-Cotiza-Client-Run-Electron.bat"
  if errorlevel 1 exit /b 1
)
"%~dp0electron\dist\electron.exe" "%~dp0electron"
