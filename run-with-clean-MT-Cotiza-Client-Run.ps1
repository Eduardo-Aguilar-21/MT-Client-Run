param(
  [switch]$Clean,
  [switch]$NoPrompt
)

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location -Path $ScriptDir

function Invoke-Cleanup {
  Write-Host "[1/3] Ejecutando limpieza (detener procesos + limpiar data\db y data\logs)..."
  Get-Process java,node,postgres -ErrorAction SilentlyContinue | Stop-Process -Force
  Remove-Item -Recurse -Force .\data\db -ErrorAction SilentlyContinue
  Remove-Item -Recurse -Force .\data\logs -ErrorAction SilentlyContinue
  Write-Host "[1/3] Limpieza lista."
}

function Show-Usage {
  Write-Host "run-with-clean-MT-Cotiza-Client-Run.ps1"
  Write-Host ""
  Write-Host "Opciones:"
  Write-Host "  -Clean     Ejecuta limpieza automáticamente."
  Write-Host "  -NoPrompt  No muestra confirmacion si se omite la limpieza."
  Write-Host ""
  Write-Host "Sintaxis de ejemplo:"
  Write-Host "  .\run-with-clean-MT-Cotiza-Client-Run.ps1 -Clean"
  Write-Host "  .\run-with-clean-MT-Cotiza-Client-Run.ps1"
}

if ($Clean) {
  Invoke-Cleanup
} elseif (-not $NoPrompt) {
  $answer = Read-Host "¿Quieres limpiar procesos (java/node/postgres) y data\db + data\logs antes de iniciar? (S/N)"
  if ($answer -match "^[sS]") {
    Invoke-Cleanup
  }
}

Write-Host "[2/3] Iniciando MT-Cotiza Client (silent)..."
& (Join-Path $ScriptDir "MT-Cotiza-Client-Run-Start-Silent.vbs")
Write-Host "[3/3] Done."
