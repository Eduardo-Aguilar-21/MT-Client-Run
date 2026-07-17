Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$runRoot = $PSScriptRoot
$runtimeRoot = Join-Path $runRoot "runtime"
$cacheRoot = Join-Path $runtimeRoot "_downloads"
$nodeDir = Join-Path $runtimeRoot "node"
$javaDir = Join-Path $runtimeRoot "java"
$postgresBin = Join-Path $runtimeRoot "postgres\bin"

$nodeVersion = "20.19.5"
$nodeZipName = "node-v$nodeVersion-win-x64.zip"
$nodeUrl = "https://nodejs.org/dist/v$nodeVersion/$nodeZipName"
$javaUrl = "https://api.adoptium.net/v3/binary/latest/17/ga/windows/x64/jre/hotspot/normal/eclipse"
$javaZipName = "temurin-jre-17-win-x64.zip"

function Ensure-Folder([string]$Path) {
  if (-not (Test-Path -Path $Path)) {
    New-Item -ItemType Directory -Path $Path | Out-Null
  }
}

function Download-File([string]$Url, [string]$OutputPath) {
  if (Test-Path -Path $OutputPath) { return }
  Write-Host "Descargando $Url"
  [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
  Invoke-WebRequest -Uri $Url -OutFile $OutputPath -UseBasicParsing
}

function Expand-SingleRootZip([string]$ZipPath, [string]$DestinationPath) {
  $tmp = Join-Path $cacheRoot ([IO.Path]::GetFileNameWithoutExtension($ZipPath))
  if (Test-Path -Path $tmp) { Remove-Item -LiteralPath $tmp -Recurse -Force }
  if (Test-Path -Path $DestinationPath) { Remove-Item -LiteralPath $DestinationPath -Recurse -Force }
  Ensure-Folder $tmp
  Expand-Archive -Path $ZipPath -DestinationPath $tmp -Force
  $root = Get-ChildItem -Path $tmp -Directory | Select-Object -First 1
  if (-not $root) { throw "No se pudo detectar carpeta raiz en $ZipPath" }
  Move-Item -Path $root.FullName -Destination $DestinationPath
  Remove-Item -LiteralPath $tmp -Recurse -Force
}

Ensure-Folder $runtimeRoot
Ensure-Folder $cacheRoot

$nodeExe = Join-Path $nodeDir "node.exe"
if (Test-Path -Path $nodeExe) {
  Write-Host "Node portable ya existe: $nodeExe"
} else {
  $nodeZip = Join-Path $cacheRoot $nodeZipName
  Download-File -Url $nodeUrl -OutputPath $nodeZip
  Expand-SingleRootZip -ZipPath $nodeZip -DestinationPath $nodeDir
  if (-not (Test-Path -Path $nodeExe)) { throw "No se instalo Node portable en $nodeExe" }
  Write-Host "Node portable listo: $nodeExe"
}

$javaExe = Join-Path $javaDir "bin\java.exe"
if (Test-Path -Path $javaExe) {
  Write-Host "Java portable ya existe: $javaExe"
} else {
  $javaZip = Join-Path $cacheRoot $javaZipName
  Download-File -Url $javaUrl -OutputPath $javaZip
  Expand-SingleRootZip -ZipPath $javaZip -DestinationPath $javaDir
  if (-not (Test-Path -Path $javaExe)) { throw "No se instalo Java portable en $javaExe" }
  Write-Host "Java portable listo: $javaExe"
}

$postgresExe = Join-Path $postgresBin "postgres.exe"
if (-not (Test-Path -Path $postgresExe)) {
  throw "Falta PostgreSQL portable en $postgresExe. Copia PostgreSQL para Windows dentro de runtime\postgres antes de entregar el Run."
}
Write-Host "PostgreSQL portable OK: $postgresExe"

Write-Host "Runtime portable completo. Esta carpeta Run ya puede moverse al equipo cliente sin instalar Node ni Java."
