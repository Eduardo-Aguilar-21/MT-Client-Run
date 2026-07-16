@echo off
cd /d "%~dp0"
call stop-MT-Cotiza-Client.bat
if exist "data\db" rmdir /s /q "data\db"
if exist "data\logs" rmdir /s /q "data\logs"
mkdir "data\db" >nul 2>nul
mkdir "data\logs" >nul 2>nul
echo Limpieza completa. Se conservaron build, runtime y uploads.
pause
