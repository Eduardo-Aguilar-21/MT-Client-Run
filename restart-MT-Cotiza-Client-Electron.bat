@echo off
setlocal
cd /d "%~dp0"

powershell.exe -NoProfile -ExecutionPolicy Bypass -Command "$root=(Get-Location).Path; Get-Process java,node,postgres,electron,psql,pg_ctl,wscript,cscript -ErrorAction SilentlyContinue | Where-Object { $_.Path -like ($root + '\*') -or ($_.Path -like '*\wscript.exe') -or ($_.Path -like '*\cscript.exe') } | Stop-Process -Force -ErrorAction SilentlyContinue; foreach($p in 3000,8080,5434){ $ids=(Get-NetTCPConnection -LocalPort $p -State Listen -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique); foreach($id in $ids){ $proc=Get-Process -Id $id -ErrorAction SilentlyContinue; if($proc -and $proc.ProcessName -in @('java','node','postgres','electron')){ Stop-Process -Id $id -Force -ErrorAction SilentlyContinue } } }; Start-Sleep -Seconds 2; Remove-Item -Recurse -Force '.\data\logs' -ErrorAction SilentlyContinue"

call "%~dp0start-MT-Cotiza-Client-Electron.bat"
