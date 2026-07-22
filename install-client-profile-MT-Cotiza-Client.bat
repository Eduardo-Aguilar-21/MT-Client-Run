@echo off
setlocal
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0install-client-profile-MT-Cotiza-Client.ps1"
exit /b %errorlevel%
