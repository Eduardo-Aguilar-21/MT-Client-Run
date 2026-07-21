@echo off
setlocal
cd /d "%~dp0"
call "%~dp0start-MT-Cotiza-Client-Electron.bat"
exit /b %ERRORLEVEL%
