param(
  [Parameter(Mandatory = $true)]
  [string]$InstallRoot,

  [switch]$ResetData,

  [string]$DataRoot = (Join-Path (Join-Path $env:ProgramData "MT Cotiza Client") "data"),

  [string]$LogPath = (Join-Path (Join-Path $env:ProgramData "MT Cotiza Client") "installer-stop-processes.log")
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Write-InstallerLog([string]$Message) {
  try {
    $logDirectory = Split-Path $LogPath -Parent
    New-Item -ItemType Directory -Force -Path $logDirectory -ErrorAction SilentlyContinue | Out-Null
    "$(Get-Date -Format o) $Message" | Add-Content -LiteralPath $LogPath -Encoding UTF8 -ErrorAction SilentlyContinue
  } catch {
    # El log no debe impedir la instalacion.
  }
}

function Stop-InstallerTarget([int]$ProcessId, [string]$Description) {
  if ($ProcessId -eq $PID) { return }
  try {
    $taskKill = Join-Path $env:SystemRoot "System32\taskkill.exe"
    & $taskKill /PID $ProcessId /T /F 1>$null 2>$null
    if ($LASTEXITCODE -eq 0) {
      Write-InstallerLog "Proceso detenido con taskkill: $Description (PID $ProcessId)."
      return
    }
  } catch {
    Write-InstallerLog "Aviso de taskkill para $Description (PID $ProcessId): $($_.Exception.Message)"
  }
  try {
    Stop-Process -Id $ProcessId -Force -ErrorAction Stop
    Write-InstallerLog "Proceso detenido con Stop-Process: $Description (PID $ProcessId)."
  } catch {
    Write-InstallerLog "Aviso: no se pudo detener $Description (PID $ProcessId): $($_.Exception.Message)"
  }
}

function Get-InstalledClientProcesses() {
  try {
    return @(Get-CimInstance Win32_Process -ErrorAction Stop | Where-Object {
      $name = ([string]$_.Name).ToLowerInvariant()
      if (@("electron.exe", "java.exe", "node.exe") -notcontains $name) { return $false }
      $executablePath = [string]$_.ExecutablePath
      $commandLine = [string]$_.CommandLine
      ($executablePath.StartsWith($rootPrefix, [StringComparison]::OrdinalIgnoreCase)) -or
        ($commandLine.IndexOf($InstallRoot, [StringComparison]::OrdinalIgnoreCase) -ge 0)
    })
  } catch {
    Write-InstallerLog "Aviso al consultar procesos instalados con CIM: $($_.Exception.Message)"
    return @()
  }
}

Write-InstallerLog "Inicio. InstallRoot=$InstallRoot ResetData=$ResetData DataRoot=$DataRoot"
$launcherProcessNames = @('powershell.exe', 'pwsh.exe', 'cmd.exe', 'wscript.exe', 'cscript.exe')
$clientScriptNames = @('MT-Cotiza-Client-Run.ps1', 'start-MT-Cotiza-Client-Services-Silent.vbs', 'MT-Cotiza-Client-Run-Start-Silent.vbs')

try {
  $launchers = @(Get-CimInstance Win32_Process -ErrorAction SilentlyContinue | Where-Object {
    if ([int]$_.ProcessId -eq $PID -or $launcherProcessNames -notcontains ([string]$_.Name).ToLowerInvariant()) {
      return $false
    }
    $commandLine = [string]$_.CommandLine
    $referencesRoot = $commandLine.IndexOf($InstallRoot, [StringComparison]::OrdinalIgnoreCase) -ge 0
    $referencesScript = @($clientScriptNames | Where-Object {
      $commandLine.IndexOf($_, [StringComparison]::OrdinalIgnoreCase) -ge 0
    }).Count -gt 0
    $referencesRoot -and $referencesScript
  })
  foreach ($launcher in $launchers) {
    Stop-InstallerTarget -ProcessId ([int]$launcher.ProcessId) -Description ([string]$launcher.Name)
  }
} catch {
  Write-InstallerLog "Aviso al consultar launchers: $($_.Exception.Message)"
}

Start-Sleep -Milliseconds 500
$rootPrefix = $InstallRoot.TrimEnd("\") + "\"
try {
  $clientProcesses = @(Get-Process electron, java, node -ErrorAction SilentlyContinue | Where-Object {
    try {
      $_.Path -and $_.Path.StartsWith($rootPrefix, [StringComparison]::OrdinalIgnoreCase)
    } catch {
      $false
    }
  })
  foreach ($clientProcess in $clientProcesses) {
    Stop-InstallerTarget -ProcessId ([int]$clientProcess.Id) -Description ([string]$clientProcess.ProcessName)
  }
} catch {
  Write-InstallerLog "Aviso al consultar procesos Electron/Java/Node: $($_.Exception.Message)"
}

for ($attempt = 1; $attempt -le 30; $attempt++) {
  $remainingProcesses = @(Get-InstalledClientProcesses)
  if ($remainingProcesses.Count -eq 0) { break }
  foreach ($remainingProcess in $remainingProcesses) {
    Stop-InstallerTarget -ProcessId ([int]$remainingProcess.ProcessId) -Description ([string]$remainingProcess.Name)
  }
  Start-Sleep -Milliseconds 300
}

$remainingProcesses = @(Get-InstalledClientProcesses)
if ($remainingProcesses.Count -gt 0) {
  $remainingSummary = ($remainingProcesses | ForEach-Object { "$($_.Name) PID $($_.ProcessId)" }) -join ", "
  Write-InstallerLog "Aviso: continuan procesos del cliente: $remainingSummary"
  if ($ResetData) {
    Write-InstallerLog "ERROR: instalar desde cero requiere cerrar todos los procesos del cliente."
    exit 1
  }
}

if (-not $ResetData) {
  Write-InstallerLog "Cierre preventivo completado. Los avisos no bloquean la actualizacion."
  exit 0
}

try {
  Stop-Service MTCotizaPostgres -Force -ErrorAction SilentlyContinue

  for ($attempt = 1; $attempt -le 40; $attempt++) {
    $service = Get-Service MTCotizaPostgres -ErrorAction SilentlyContinue
    if ($null -eq $service -or $service.Status -eq [System.ServiceProcess.ServiceControllerStatus]::Stopped) {
      break
    }
    Start-Sleep -Milliseconds 250
  }

  $service = Get-Service MTCotizaPostgres -ErrorAction SilentlyContinue
  if ($null -ne $service -and $service.Status -ne [System.ServiceProcess.ServiceControllerStatus]::Stopped) {
    throw "No se pudo detener MTCotizaPostgres para eliminar los datos locales."
  }

  Start-Sleep -Milliseconds 750
  for ($attempt = 1; $attempt -le 15 -and (Test-Path -LiteralPath $DataRoot); $attempt++) {
    try {
      Remove-Item -LiteralPath $DataRoot -Recurse -Force -ErrorAction Stop
    } catch {
      if ($attempt -eq 15) { throw }
      Start-Sleep -Milliseconds 500
    }
  }

  if (Test-Path -LiteralPath $DataRoot) {
    throw "No se pudieron eliminar completamente los datos locales: $DataRoot"
  }
  Write-InstallerLog "Datos locales eliminados correctamente."
  exit 0
} catch {
  Write-InstallerLog "ERROR al instalar desde cero: $($_.Exception.Message)"
  Write-Error $_.Exception.Message
  exit 1
}
