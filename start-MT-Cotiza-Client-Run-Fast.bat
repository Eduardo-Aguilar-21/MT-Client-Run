@echo off
setlocal
set "ROOT=%~dp0"
cd /d "%ROOT%"

if /I "%~1"=="--clean" (
  powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%ROOT%run-with-clean-MT-Cotiza-Client-Run.ps1" -Clean
  exit /b %errorlevel%
)

if /I "%~1"=="--noclean" (
  powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%ROOT%run-with-clean-MT-Cotiza-Client-Run.ps1"
  exit /b %errorlevel%
)

if /I "%~1"=="/?" (
  echo Uso:
  echo   start-MT-Cotiza-Client-Run-Fast.bat --clean      Limpieza + arranque
  echo   start-MT-Cotiza-Client-Run-Fast.bat --noclean    Arranque sin limpieza
  echo   start-MT-Cotiza-Client-Run-Fast.bat              Arranque con prompt de limpieza
  exit /b 0
)

if /I "%~1"=="-h" (
  echo Uso:
  echo   start-MT-Cotiza-Client-Run-Fast.bat --clean      Limpieza + arranque
  echo   start-MT-Cotiza-Client-Run-Fast.bat --noclean    Arranque sin limpieza
  echo   start-MT-Cotiza-Client-Run-Fast.bat              Arranque con prompt de limpieza
  exit /b 0
)

powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%ROOT%run-with-clean-MT-Cotiza-Client-Run.ps1"
exit /b %errorlevel%
