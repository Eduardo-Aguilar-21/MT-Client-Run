param(
  [Parameter(Mandatory = $true)]
  [string]$InstallRoot
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

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
