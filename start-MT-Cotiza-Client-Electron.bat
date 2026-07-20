@echo off
setlocal
cd /d "%~dp0"
if not exist "electron\node_modules\electron\dist\electron.exe" (
  call "%~dp0prepare-MT-Cotiza-Client-Run-Electron.bat"
  if errorlevel 1 exit /b 1
)
"%~dp0runtime\node\npm.cmd" --prefix "%~dp0electron" start
