@echo off
setlocal
cd /d "%~dp0"

powershell.exe -NoProfile -ExecutionPolicy Bypass -Command "$root=(Get-Location).Path; Get-Process java,node,electron -ErrorAction SilentlyContinue | Where-Object { $_.Path -like ($root + '\*') } | Stop-Process -Force -ErrorAction SilentlyContinue; if(Get-Service MTCotizaPostgres -ErrorAction SilentlyContinue){ Restart-Service MTCotizaPostgres -Force -ErrorAction SilentlyContinue }; Start-Sleep -Seconds 2; Remove-Item -Recurse -Force ($env:ProgramData + '\MT Cotiza Client\data\logs') -ErrorAction SilentlyContinue"

call "%~dp0start-MT-Cotiza-Client-Electron.bat"
