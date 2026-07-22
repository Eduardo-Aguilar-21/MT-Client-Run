param(
  [Parameter(Mandatory = $true)]
  [string]$InstallRoot
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

exit 0
