Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$runRoot = $PSScriptRoot
$electronRoot = Join-Path $runRoot "electron"
$electronDist = Join-Path $electronRoot "dist"
$embeddedRuntime = Join-Path $electronRoot "runtime"
$cacheRoot = Join-Path $runRoot "runtime\_downloads"
$electronVersion = "33.4.11"
$electronZipName = "electron-v$electronVersion-win32-x64.zip"
$electronZip = Join-Path $cacheRoot $electronZipName
$electronUrl = "https://github.com/electron/electron/releases/download/v$electronVersion/$electronZipName"

function Join-ChunkFiles([string]$Pattern, [string]$OutputPath) {
  $chunks = Get-ChildItem -Path $Pattern | Sort-Object Name
  if (-not $chunks -or $chunks.Count -eq 0) { return $false }
  if (Test-Path $OutputPath) { Remove-Item -LiteralPath $OutputPath -Force }
  $outStream = [System.IO.File]::OpenWrite($OutputPath)
  try {
    foreach ($chunk in $chunks) {
      $inStream = [System.IO.File]::OpenRead($chunk.FullName)
      try { $inStream.CopyTo($outStream) } finally { $inStream.Dispose() }
    }
  } finally {
    $outStream.Dispose()
  }
  return $true
}

if (Test-Path (Join-Path $electronDist "electron.exe")) {
  Write-Host "Electron portable ya existe: $electronDist\electron.exe"
  exit 0
}

New-Item -ItemType Directory -Force -Path $cacheRoot | Out-Null
New-Item -ItemType Directory -Force -Path $electronRoot | Out-Null

if (-not (Test-Path $electronZip)) {
  $chunkPattern = Join-Path $embeddedRuntime "$electronZipName.*"
  if (Join-ChunkFiles -Pattern $chunkPattern -OutputPath $electronZip) {
    Write-Host "Electron portable reconstruido desde electron\runtime."
  } else {
    Write-Host "Descargando Electron portable $electronVersion..."
    [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
    Invoke-WebRequest -Uri $electronUrl -OutFile $electronZip -UseBasicParsing
  }
}

if (Test-Path $electronDist) { Remove-Item -LiteralPath $electronDist -Recurse -Force }
New-Item -ItemType Directory -Force -Path $electronDist | Out-Null
Expand-Archive -Path $electronZip -DestinationPath $electronDist -Force

if (-not (Test-Path (Join-Path $electronDist "electron.exe"))) {
  throw "No se encontro electron.exe despues de extraer $electronZip"
}

Write-Host "Electron portable listo: $electronDist\electron.exe"
