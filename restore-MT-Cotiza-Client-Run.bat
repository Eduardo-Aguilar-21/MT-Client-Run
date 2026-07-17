@echo off
cd /d "%~dp0"
if "%~1"=="" (
  powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0restore-MT-Cotiza-Client-Run.ps1"
) else (
  powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0restore-MT-Cotiza-Client-Run.ps1" -BackupFile "%~1"
)
pause
