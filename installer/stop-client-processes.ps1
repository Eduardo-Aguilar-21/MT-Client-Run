param(
  [Parameter(Mandatory = $true)]
  [string]$InstallRoot,

  [switch]$ResetData,

  [string]$DataRoot = (Join-Path (Join-Path $env:ProgramData "MT Cotiza Client") "data")
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$launcherProcessNames = @('powershell.exe', 'pwsh.exe', 'cmd.exe', 'wscript.exe', 'cscript.exe')
$clientScriptNames = @('MT-Cotiza-Client-Run.ps1', 'start-MT-Cotiza-Client-Services-Silent.vbs', 'MT-Cotiza-Client-Run-Start-Silent.vbs')

Get-CimInstance Win32_Process -ErrorAction SilentlyContinue |
  Where-Object {
    if ([int]$_.ProcessId -eq $PID -or $launcherProcessNames -notcontains ([string]$_.Name).ToLowerInvariant()) {
      return $false
    }
    $commandLine = [string]$_.CommandLine
    $referencesRoot = $commandLine.IndexOf($InstallRoot, [StringComparison]::OrdinalIgnoreCase) -ge 0
    $referencesScript = @($clientScriptNames | Where-Object {
      $commandLine.IndexOf($_, [StringComparison]::OrdinalIgnoreCase) -ge 0
    }).Count -gt 0
    $referencesRoot -and $referencesScript
  } |
  ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }

Start-Sleep -Milliseconds 500

$rootPrefix = $InstallRoot.TrimEnd("\") + "\"
Get-Process electron, java, node -ErrorAction SilentlyContinue |
  Where-Object {
    try {
      $_.Path -and $_.Path.StartsWith($rootPrefix, [StringComparison]::OrdinalIgnoreCase)
    } catch {
      $false
    }
  } |
  Stop-Process -Force -ErrorAction SilentlyContinue

if ($ResetData) {
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

  for ($attempt = 1; $attempt -le 10 -and (Test-Path -LiteralPath $DataRoot); $attempt++) {
    try {
      Remove-Item -LiteralPath $DataRoot -Recurse -Force -ErrorAction Stop
    } catch {
      if ($attempt -eq 10) {
        throw
      }
      Start-Sleep -Milliseconds 500
    }
  }

  if (Test-Path -LiteralPath $DataRoot) {
    throw "No se pudieron eliminar completamente los datos locales: $DataRoot"
  }
}

exit 0
