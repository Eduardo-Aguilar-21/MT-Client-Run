@echo off
setlocal
cd /d "%~dp0"

if not exist "electron\dist\electron.exe" (
  call "%~dp0prepare-MT-Cotiza-Client-Run-Electron.bat"
  if errorlevel 1 exit /b 1
)

"%~dp0electron\dist\electron.exe" "%~dp0electron"
