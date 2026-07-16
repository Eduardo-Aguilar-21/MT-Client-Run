@echo off
cd /d "%~dp0"
if exist standalone.pids.json (
  powershell -NoProfile -ExecutionPolicy Bypass -Command "$f='standalone.pids.json'; $s=Get-Content $f -Raw | ConvertFrom-Json; if($s.api){Stop-Process -Id $s.api -ErrorAction SilentlyContinue}; if($s.front){Stop-Process -Id $s.front -ErrorAction SilentlyContinue}; Remove-Item $f -Force"
)
if exist "runtime\postgres\bin\pg_ctl.exe" if exist "data\db\PG_VERSION" (
  "runtime\postgres\bin\pg_ctl.exe" -D "data\db" stop -m fast >nul 2>nul
)
where docker >nul 2>nul
if %ERRORLEVEL% EQU 0 (
  docker compose --env-file .env -f docker-compose.yml down
)
pause
