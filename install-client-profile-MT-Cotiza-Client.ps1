Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$runRoot = $PSScriptRoot
$dataRoot = Join-Path (Join-Path $env:ProgramData "MT Cotiza Client") "data"
$profileRoot = Join-Path $dataRoot "profile"
$activeRoot = Join-Path $profileRoot "active"
$defaultRoot = Join-Path (Join-Path $runRoot "profiles") "default"
$installerProfile = Join-Path $runRoot "installer-profile.mct"
$frontProfileRoot = Join-Path (Join-Path (Join-Path $runRoot "build") "front") "public\client-profile"
$profileLog = Join-Path (Join-Path $dataRoot "logs") "install-profile.log"
$maxPackageBytes = 10MB
$maxExpandedBytes = 25MB
$maxEntries = 32
$allowedExtensions = @(".json", ".txt", ".svg", ".png", ".ico", ".jpg", ".jpeg", ".webp")

New-Item -ItemType Directory -Force -Path (Split-Path $profileLog -Parent) | Out-Null
New-Item -ItemType Directory -Force -Path $profileRoot | Out-Null

function Write-ProfileLog([string]$Message) {
  "$(Get-Date -Format o) $Message" | Add-Content -LiteralPath $profileLog -Encoding UTF8
}

function Get-RequiredTextProperty($Object, [string]$Name) {
  if (-not ($Object.PSObject.Properties.Name -contains $Name)) { throw "Falta la propiedad '$Name'." }
  $value = [string]$Object.$Name
  if ([string]::IsNullOrWhiteSpace($value)) { throw "La propiedad '$Name' esta vacia." }
  return $value.Trim()
}

function Assert-SafeFileName([string]$Name) {
  if ([System.IO.Path]::GetFileName($Name) -ne $Name -or $Name.Contains("..") -or $Name.Contains("/") -or $Name.Contains("\")) {
    throw "Ruta no permitida: $Name"
  }
  $extension = [System.IO.Path]::GetExtension($Name).ToLowerInvariant()
  if ($allowedExtensions -notcontains $extension) { throw "Tipo de archivo no permitido: $extension" }
}

function Test-ExpandedProfile([string]$Directory) {
  $manifestPath = Join-Path $Directory "profile.json"
  if (-not (Test-Path -LiteralPath $manifestPath -PathType Leaf)) { throw "El perfil no contiene profile.json." }
  $manifest = Get-Content -LiteralPath $manifestPath -Raw -Encoding UTF8 | ConvertFrom-Json
  if ([int]$manifest.schemaVersion -ne 1) { throw "Version de perfil no compatible." }
  if ((Get-RequiredTextProperty $manifest "format") -ne "mycont360-profile") { throw "El archivo no es un perfil Mycont360." }
  Get-RequiredTextProperty $manifest "profileId" | Out-Null
  Get-RequiredTextProperty $manifest "companyName" | Out-Null
  if (-not ($manifest.PSObject.Properties.Name -contains "assets")) { throw "Falta la seccion assets." }
  foreach ($assetKey in @("primaryLogo", "appIcon", "splashLogo")) {
    $assetName = Get-RequiredTextProperty $manifest.assets $assetKey
    Assert-SafeFileName $assetName
    if (-not (Test-Path -LiteralPath (Join-Path $Directory $assetName) -PathType Leaf)) { throw "No existe el activo '$assetName'." }
  }
  $files = @(Get-ChildItem -LiteralPath $Directory -File -Recurse)
  if ($files.Count -gt $maxEntries) { throw "El perfil contiene demasiados archivos." }
  $expandedBytes = ($files | Measure-Object -Property Length -Sum).Sum
  if ($expandedBytes -gt $maxExpandedBytes) { throw "El perfil expandido supera 25 MB." }
  return $manifest
}

function Expand-SelectedProfile([string]$PackagePath, [string]$Destination) {
  if ((Get-Item -LiteralPath $PackagePath).Length -gt $maxPackageBytes) { throw "El archivo .mct supera 10 MB." }
  Add-Type -AssemblyName System.IO.Compression.FileSystem
  $archive = [System.IO.Compression.ZipFile]::OpenRead($PackagePath)
  try {
    if ($archive.Entries.Count -gt $maxEntries) { throw "El perfil contiene demasiadas entradas." }
    $totalBytes = 0L
    foreach ($entry in $archive.Entries) {
      $name = $entry.FullName
      Assert-SafeFileName $name
      $totalBytes += $entry.Length
      if ($totalBytes -gt $maxExpandedBytes) { throw "El perfil expandido supera 25 MB." }
    }
  } finally {
    $archive.Dispose()
  }
  $temporaryZip = Join-Path $profileRoot ("profile-" + [Guid]::NewGuid().ToString("N") + ".zip")
  try {
    Copy-Item -LiteralPath $PackagePath -Destination $temporaryZip -Force
    Expand-Archive -LiteralPath $temporaryZip -DestinationPath $Destination -Force
  } finally {
    Remove-Item -LiteralPath $temporaryZip -Force -ErrorAction SilentlyContinue
  }
}

function Activate-Profile([string]$StagingRoot, [string]$SourceKind) {
  $backupRoot = Join-Path $profileRoot (".backup-" + [Guid]::NewGuid().ToString("N"))
  $hadActive = Test-Path -LiteralPath $activeRoot
  if ($hadActive) { Move-Item -LiteralPath $activeRoot -Destination $backupRoot }
  try {
    Move-Item -LiteralPath $StagingRoot -Destination $activeRoot
    if ($hadActive) { Remove-Item -LiteralPath $backupRoot -Recurse -Force -ErrorAction SilentlyContinue }
    Set-Content -LiteralPath (Join-Path $profileRoot "active-source.txt") -Value $SourceKind -Encoding ASCII
  } catch {
    if ((-not (Test-Path -LiteralPath $activeRoot)) -and (Test-Path -LiteralPath $backupRoot)) {
      Move-Item -LiteralPath $backupRoot -Destination $activeRoot
    }
    throw
  }
}

function Install-DefaultProfile([string]$Reason) {
  $stagingRoot = Join-Path $profileRoot (".staging-" + [Guid]::NewGuid().ToString("N"))
  New-Item -ItemType Directory -Force -Path $stagingRoot | Out-Null
  try {
    Copy-Item -Path (Join-Path $defaultRoot "*") -Destination $stagingRoot -Recurse -Force
    $manifest = Test-ExpandedProfile $stagingRoot
    Activate-Profile $stagingRoot "default"
    Remove-Item -LiteralPath (Join-Path $profileRoot "active.mct") -Force -ErrorAction SilentlyContinue
    Write-ProfileLog "Perfil predeterminado activado ($Reason): $($manifest.companyName)"
  } finally {
    Remove-Item -LiteralPath $stagingRoot -Recurse -Force -ErrorAction SilentlyContinue
  }
}

function Publish-FrontendProfile() {
  if (-not (Test-Path -LiteralPath (Split-Path $frontProfileRoot -Parent) -PathType Container)) {
    Write-ProfileLog "No se publico el perfil web porque el build del Front no esta disponible."
    return
  }
  Remove-Item -LiteralPath $frontProfileRoot -Recurse -Force -ErrorAction SilentlyContinue
  New-Item -ItemType Directory -Force -Path $frontProfileRoot | Out-Null
  Copy-Item -Path (Join-Path $defaultRoot "*") -Destination $frontProfileRoot -Recurse -Force
  Copy-Item -Path (Join-Path $activeRoot "*") -Destination $frontProfileRoot -Recurse -Force
  Write-ProfileLog "Perfil activo publicado para Electron y Front."
}

Write-ProfileLog "Inicio de configuracion de perfil."
try {
  if (Test-Path -LiteralPath $installerProfile -PathType Leaf) {
    $stagingRoot = Join-Path $profileRoot (".staging-" + [Guid]::NewGuid().ToString("N"))
    New-Item -ItemType Directory -Force -Path $stagingRoot | Out-Null
    try {
      Expand-SelectedProfile $installerProfile $stagingRoot
      $manifest = Test-ExpandedProfile $stagingRoot
      Activate-Profile $stagingRoot "custom"
      Copy-Item -LiteralPath $installerProfile -Destination (Join-Path $profileRoot "active.mct") -Force
      Write-ProfileLog "Perfil personalizado activado: $($manifest.companyName) [$($manifest.profileId)]"
    } catch {
      Write-ProfileLog "Perfil personalizado rechazado: $($_.Exception.Message)"
      Install-DefaultProfile "el archivo seleccionado no era valido"
    } finally {
      Remove-Item -LiteralPath $stagingRoot -Recurse -Force -ErrorAction SilentlyContinue
    }
  } elseif (Test-Path -LiteralPath (Join-Path $activeRoot "profile.json") -PathType Leaf) {
    try {
      Test-ExpandedProfile $activeRoot | Out-Null
      Write-ProfileLog "Perfil existente conservado."
    } catch {
      Write-ProfileLog "Perfil existente invalido: $($_.Exception.Message)"
      Install-DefaultProfile "el perfil existente estaba dañado"
    }
  } else {
    Install-DefaultProfile "no se selecciono un archivo .mct"
  }
  Publish-FrontendProfile
  Write-ProfileLog "Configuracion de perfil completada."
  exit 0
} catch {
  Write-ProfileLog "ERROR: $($_.Exception.Message)"
  exit 1
} finally {
  Remove-Item -LiteralPath $installerProfile -Force -ErrorAction SilentlyContinue
}
