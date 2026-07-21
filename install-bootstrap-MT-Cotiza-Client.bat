@echo off
setlocal
cd /d "%~dp0"
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0install-bootstrap-MT-Cotiza-Client.ps1"
exit /b %ERRORLEVEL%
