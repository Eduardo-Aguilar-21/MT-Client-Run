@echo off
cd /d "%~dp0"
if exist standalone.pids.json (
  powershell -NoProfile -ExecutionPolicy Bypass -Command ^
  "$f='.\standalone.pids.json'; $s=Get-Content $f -Raw | ConvertFrom-Json; if($s.api){Stop-Process -Id $s.api -ErrorAction SilentlyContinue}; if($s.front){Stop-Process -Id $s.front -ErrorAction SilentlyContinue}; Remove-Item $f -Force"
)
docker compose --env-file .env -f docker-compose.yml down
pause
