@echo off
setlocal
cd /d "%~dp0"
if not exist "runtime\node\npm.cmd" (
  echo Falta runtime\node\npm.cmd. Ejecuta prepare-MT-Cotiza-Client-Run-Runtime.bat primero.
  pause
  exit /b 1
)
"%~dp0runtime\node\npm.cmd" --prefix "%~dp0electron" install
if errorlevel 1 pause
