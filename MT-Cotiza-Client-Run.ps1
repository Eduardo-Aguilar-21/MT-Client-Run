param(
  [switch]$NoBrowser,
  [switch]$BootstrapOnly,
  [switch]$KeepServicesRunning
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

trap {
  Write-Host ("ERROR: " + $_.Exception.Message)
  exit 1
}

$runRoot = $PSScriptRoot
$repoRoot = Split-Path -Path $runRoot -Parent
$envFile = Join-Path $runRoot ".env"
$envExampleFile = Join-Path $runRoot ".env.example"
$composeFile = Join-Path $runRoot "docker-compose.yml"

$apiDir = Join-Path $repoRoot "MT-Cotiza-Client-API"
$frontDir = Join-Path $repoRoot "MT-Cotiza-Client-Front"
$buildRoot = Join-Path $runRoot "build"
$dataRoot = $env:MT_COTIZA_DATA_ROOT
if ([string]::IsNullOrWhiteSpace($dataRoot)) {
  $dataRoot = Join-Path $env:ProgramData "MT Cotiza Client\data"
}
$apiBuild = Join-Path $buildRoot "api"
$frontBuild = Join-Path $buildRoot "front"
$pidFile = Join-Path $runRoot "standalone.pids.json"
$portablePostgresBin = Join-Path $runRoot "runtime\postgres\bin"
$script:StartupMutex = New-Object System.Threading.Mutex($false, "Local\MTCotizaClientServices")
if (-not $script:StartupMutex.WaitOne(0)) {
  Write-Host "Otro arranque de servicios MT Cotiza ya esta en curso."
  exit 0
}

$javaCandidatePaths = @(
  (Join-Path $runRoot "runtime\java\bin\java.exe"),
  (Join-Path $runRoot "runtime\jre\bin\java.exe"),
  (Join-Path $env:ProgramFiles "Eclipse Adoptium\jdk-17.0.12+7\bin\java.exe"),
  (Join-Path $env:ProgramFiles "Microsoft\jdk-17.0.12+7\bin\java.exe")
)

$nodeCandidatePaths = @(
  (Join-Path $runRoot "runtime\node\node.exe"),
  (Join-Path $runRoot "runtime\nodejs\node.exe"),
  (Join-Path $env:ProgramFiles "nodejs\node.exe")
)

$script:DockerExe = $null

function Test-IsProcessElevated {
  $identity = [Security.Principal.WindowsIdentity]::GetCurrent()
  $principal = New-Object Security.Principal.WindowsPrincipal($identity)
  return $principal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
}

function Ensure-Folder([string]$Path) {
  if (-not (Test-Path -Path $Path)) {
    New-Item -ItemType Directory -Path $Path | Out-Null
  }
}

function New-TreeClean([string]$Path) {
  if (Test-Path -Path $Path) {
    Remove-Item -LiteralPath $Path -Recurse -Force
  }
  New-Item -ItemType Directory -Path $Path | Out-Null
}

function Ensure-EnvFile {
  if (-not (Test-Path -Path $envExampleFile)) {
    throw "No existe .env ni .env.example en $runRoot. Crea .env antes de iniciar."
  }
  if (Test-Path -Path $envFile) {
    $existingKeys = @{}
    Get-Content -Path $envFile | ForEach-Object {
      $line = $_.Trim()
      if ([string]::IsNullOrWhiteSpace($line) -or $line.StartsWith("#")) { return }
      $parts = $line -split "=", 2
      if ($parts.Count -ge 2) { $existingKeys[$parts[0].Trim()] = $true }
    }

    $missingLines = @()
    Get-Content -Path $envExampleFile | ForEach-Object {
      $line = $_.Trim()
      if ([string]::IsNullOrWhiteSpace($line) -or $line.StartsWith("#")) { return }
      $parts = $line -split "=", 2
      if ($parts.Count -ge 2 -and -not $existingKeys.ContainsKey($parts[0].Trim())) {
        $missingLines += $_
      }
    }

    if ($missingLines.Count -gt 0) {
      Add-Content -Path $envFile -Value ""
      Add-Content -Path $envFile -Value "# Valores agregados automaticamente desde .env.example"
      Add-Content -Path $envFile -Value $missingLines
      Write-Host "Se actualizaron variables faltantes en .env desde .env.example."
    }

    $envContent = Get-Content -Path $envFile
    $updatedEnvContent = @()
    $migratedPort = $false
    foreach ($line in $envContent) {
      if ($line -match '^\s*POSTGRES_PORT\s*=\s*5434\s*$') {
        $updatedEnvContent += "POSTGRES_PORT=15434"
        $migratedPort = $true
      } else {
        $updatedEnvContent += $line
      }
    }
    if ($migratedPort) {
      Set-Content -Path $envFile -Value $updatedEnvContent -Encoding UTF8
      Write-Host "Se migro POSTGRES_PORT de 5434 a 15434 para evitar conflictos con PostgreSQL instalado."
    }

    $envContent = Get-Content -Path $envFile
    $updatedEnvContent = @()
    $migratedPassword = $false
    foreach ($line in $envContent) {
      if ($line -match '^\s*POSTGRES_PASSWORD\s*=\s*changeme\s*$') {
        $updatedEnvContent += "POSTGRES_PASSWORD=cotiflow_password"
        $migratedPassword = $true
      } else {
        $updatedEnvContent += $line
      }
    }
    if ($migratedPassword) {
      Set-Content -Path $envFile -Value $updatedEnvContent -Encoding UTF8
      Write-Host "Se migro POSTGRES_PASSWORD al valor administrado por MT Cotiza."
    }
    return
  }
  Copy-Item -Path $envExampleFile -Destination $envFile -Force
  Write-Host "Se creo .env desde .env.example. Revisa credenciales y secrets antes de produccion."
}

function Get-EnvValue([string]$Key, [string]$Default = "") {
  if (-not (Test-Path -Path $envFile)) {
    return $Default
  }
  $line = Get-Content -Path $envFile |
    Where-Object { -not [string]::IsNullOrWhiteSpace($_) -and $_.TrimStart() -notlike "#*" } |
    ForEach-Object {
      $parts = $_ -split "=", 2
      if ($parts.Count -ge 2 -and $parts[0].Trim() -eq $Key) { $_ }
    } |
    Select-Object -First 1
  if (-not $line) { return $Default }
  return ($line -replace "^[^=]*=", "").Trim()
}

function Resolve-DatabaseCredentials([string]$RunDbMode, [string]$DbPort, [string]$DbName, [string]$DefaultDbUser, [string]$DefaultDbPassword) {
  $mode = if ([string]::IsNullOrWhiteSpace($RunDbMode)) { "external" } else { $RunDbMode.ToLowerInvariant().Trim() }
  $resultUrl = "jdbc:postgresql://127.0.0.1:$DbPort/${DbName}?sslmode=disable"
  $resultUser = Get-EnvValue "POSTGRES_USER" $DefaultDbUser
  $resultPassword = Get-EnvValue "POSTGRES_PASSWORD" $DefaultDbPassword

  if ($mode -ne "external") {
    if ($mode -eq "portable" -or $mode -eq "docker") {
      Write-Host "   - Ejecutando en modo ${mode}: usando credenciales administradas por Run (POSTGRES_*)."
      return @{ Url = $resultUrl; User = $resultUser; Password = $resultPassword; }
    }
    throw "RUN_DB_MODE invalido: $RunDbMode. Usa portable, docker o external."
  }

  $externalUrl = Get-EnvValue "SPRING_DATASOURCE_URL" ""
  $externalUser = Get-EnvValue "SPRING_DATASOURCE_USERNAME" ""
  $externalPassword = Get-EnvValue "SPRING_DATASOURCE_PASSWORD" ""

  Write-Host "   - Ejecutando en modo external: respetando datasource del .env (SPRING_DATASOURCE_*)."
  if (-not [string]::IsNullOrWhiteSpace($externalUrl)) { $resultUrl = $externalUrl.Trim() }
  if (-not [string]::IsNullOrWhiteSpace($externalUser)) { $resultUser = $externalUser.Trim() }
  if (-not [string]::IsNullOrWhiteSpace($externalPassword)) { $resultPassword = $externalPassword.Trim() }

  return @{ Url = $resultUrl; User = $resultUser; Password = $resultPassword; }
}
function Import-EnvFile {
  if (-not (Test-Path -Path $envFile)) { return }
  Get-Content -Path $envFile | ForEach-Object {
    $line = $_.Trim()
    if ([string]::IsNullOrWhiteSpace($line) -or $line.StartsWith("#")) { return }
    $parts = $line -split "=", 2
    if ($parts.Count -lt 2) { return }
    $key = $parts[0].Trim()
    $value = $parts[1].Trim()
    if ($key -in @("SPRING_DATASOURCE_URL", "SPRING_DATASOURCE_USERNAME", "SPRING_DATASOURCE_PASSWORD")) {
      return
    }
    if (-not [string]::IsNullOrWhiteSpace($key)) {
      [Environment]::SetEnvironmentVariable($key, $value, "Process")
    }
  }
}

function To-Bool([string]$Value, [bool]$Default = $false) {
  if ([string]::IsNullOrWhiteSpace($Value)) { return $Default }
  $v = $Value.Trim().ToLowerInvariant()
  return ($v -eq "1" -or $v -eq "true" -or $v -eq "yes" -or $v -eq "si" -or $v -eq "sí")
}

function Get-LatestSourceWrite([string]$Path, [string[]]$SkipSegments) {
  $files = Get-ChildItem -Path $Path -Recurse -File -ErrorAction SilentlyContinue |
    Where-Object {
      $full = $_.FullName.Replace("/", "\")
      foreach ($segment in $SkipSegments) {
        if ($full -like "*\$segment\*") { return $false }
      }
      return $true
    }

  if (-not $files) {
    return [datetime]::MinValue
  }

  $last = $files | Measure-Object -Property LastWriteTime -Maximum
  return $last.Maximum
}

function Resolve-Executable([string]$commandName, [string[]]$candidates) {
  foreach ($path in $candidates) {
    if ($path -and (Test-Path -Path $path)) { return $path }
  }
  $cmd = Get-Command $commandName -ErrorAction SilentlyContinue
  if ($cmd) { return $cmd.Source }
  return $null
}

function Resolve-PortablePostgresExecutable([string]$Name) {
  $exe = Join-Path $portablePostgresBin $Name
  if (Test-Path -Path $exe) { return $exe }
  throw "No se encontro PostgreSQL portable: $exe. Coloca PostgreSQL para Windows en runtime\postgres\bin."
}

function Invoke-PortablePostgres([string]$ExeName, [string[]]$PgArgs = @(), [bool]$IgnoreFailure = $false, [bool]$Quiet = $false) {
  $exe = Resolve-PortablePostgresExecutable $ExeName
  $argsText = $PgArgs -join " "
  if (-not $Quiet) { Write-Host "   - Ejecutando: $ExeName $argsText" }
  & $exe @PgArgs
  if ($LASTEXITCODE -ne 0 -and -not $IgnoreFailure) {
    throw "Fallo comando $ExeName $argsText (codigo $LASTEXITCODE)"
  }
  return $LASTEXITCODE
}


function ConvertTo-WindowsCommandLineArgument([string]$Value) {
  if ($null -eq $Value -or $Value.Length -eq 0) { return '""' }
  $escaped = $Value -replace '(\\*)"', '$1$1\"'
  $escaped = $escaped -replace '(\\+)$', '$1$1'
  return '"' + $escaped + '"'
}

function Invoke-PortablePostgresOutput([string]$ExeName, [string[]]$PgArgs, [int]$TimeoutSeconds = 8) {
  $exe = Resolve-PortablePostgresExecutable $ExeName
  $outFile = Join-Path $dataRoot "logs\pg-command.out.tmp"
  $errFile = Join-Path $dataRoot "logs\pg-command.err.tmp"
  Remove-Item -Path $outFile, $errFile -Force -ErrorAction SilentlyContinue
  $argumentText = (($PgArgs | ForEach-Object { ConvertTo-WindowsCommandLineArgument $_ }) -join " ")
  $proc = Start-Process -FilePath $exe -ArgumentList $argumentText -WorkingDirectory $portablePostgresBin -RedirectStandardOutput $outFile -RedirectStandardError $errFile -PassThru -WindowStyle Hidden
  if (-not $proc.WaitForExit($TimeoutSeconds * 1000)) {
    Stop-Process -Id $proc.Id -Force -ErrorAction SilentlyContinue
    return @{ ExitCode = 124; Output = ""; Error = "timeout"; }
  }
  $output = ""
  $errorOutput = ""
  if (Test-Path -Path $outFile) { $output = Get-Content -Path $outFile -Raw -ErrorAction SilentlyContinue }
  if (Test-Path -Path $errFile) { $errorOutput = Get-Content -Path $errFile -Raw -ErrorAction SilentlyContinue }
  return @{ ExitCode = $proc.ExitCode; Output = $output; Error = $errorOutput; }
}

function Wait-PortableAppDatabase([string]$Port, [string]$DbName, [string]$DbUser, [string]$DbPassword, [int]$TimeoutSeconds = 120) {
  Write-Host "   - Verificando conexion de aplicacion a PostgreSQL..."
  [Environment]::SetEnvironmentVariable("PGCONNECT_TIMEOUT", "3", "Process")
  [Environment]::SetEnvironmentVariable("PGSSLMODE", "disable", "Process")
  [Environment]::SetEnvironmentVariable("PGPASSWORD", $DbPassword, "Process")
  $deadline = (Get-Date).AddSeconds($TimeoutSeconds)
  try {
    while ((Get-Date) -lt $deadline) {
      $check = Invoke-PortablePostgresOutput -ExeName "psql.exe" -PgArgs @("-w", "-h", "127.0.0.1", "-p", $Port, "-U", $DbUser, "-d", $DbName, "-tAc", "SELECT 1") -TimeoutSeconds 5
      $checkOutput = ""
      if ($null -ne $check.Output) { $checkOutput = $check.Output.Trim() }
      if ($check.ExitCode -eq 0 -and $checkOutput -eq "1") {
        Write-Host "   - DB de aplicacion lista para $DbUser@$DbName."
        return
      }
      Start-Sleep -Seconds 2
    }
  } finally {
    [Environment]::SetEnvironmentVariable("PGPASSWORD", $null, "Process")
  }
  throw "PostgreSQL esta iniciado, pero la app no puede conectar como $DbUser a $DbName. Revisa $dataRoot\logs\pg-command.err.tmp."
}

function Repair-PortableAppDatabase([string]$Port, [string]$DbName, [string]$DbUser, [string]$DbPassword) {
  Write-Host "   - Reparando rol/base de datos de aplicacion..."
  if ($DbUser -notmatch '^[A-Za-z_][A-Za-z0-9_]*$') { throw "POSTGRES_USER contiene caracteres no admitidos: $DbUser" }
  if ($DbName -notmatch '^[A-Za-z_][A-Za-z0-9_]*$') { throw "POSTGRES_DB contiene caracteres no admitidos: $DbName" }
  [Environment]::SetEnvironmentVariable("PGCONNECT_TIMEOUT", "3", "Process")
  [Environment]::SetEnvironmentVariable("PGSSLMODE", "disable", "Process")
  [Environment]::SetEnvironmentVariable("PGPASSWORD", $null, "Process")
  $adminUser = "postgres"
  $adminCheck = Invoke-PortablePostgresOutput -ExeName "psql.exe" -PgArgs @("-w", "-h", "127.0.0.1", "-p", $Port, "-U", $adminUser, "-d", "postgres", "-tAc", "SELECT 1") -TimeoutSeconds 5
  if ($adminCheck.ExitCode -ne 0 -or (($adminCheck.Output -join "").Trim()) -ne "1") {
    throw "PostgreSQL responde, pero no permite reparar con usuario postgres. Revisa data\logs\pg-command.err.tmp."
  }
  $escapedUser = $DbUser.Replace("'", "''")
  $escapedPassword = $DbPassword.Replace("'", "''")
  $roleExists = Invoke-PortablePostgresOutput -ExeName "psql.exe" -PgArgs @("-w", "-h", "127.0.0.1", "-p", $Port, "-U", $adminUser, "-d", "postgres", "-tAc", "SELECT 1 FROM pg_roles WHERE rolname = '$escapedUser'") -TimeoutSeconds 5
  if (($roleExists.Output -join "").Trim() -eq "1") {
    Invoke-PortablePostgres -ExeName "psql.exe" -PgArgs @("-h", "127.0.0.1", "-p", $Port, "-U", $adminUser, "-d", "postgres", "-c", "ALTER ROLE `"$escapedUser`" WITH PASSWORD '$escapedPassword'") -IgnoreFailure $false | Out-Null
  } else {
    Invoke-PortablePostgres -ExeName "psql.exe" -PgArgs @("-h", "127.0.0.1", "-p", $Port, "-U", $adminUser, "-d", "postgres", "-c", "CREATE ROLE `"$escapedUser`" LOGIN PASSWORD '$escapedPassword'") -IgnoreFailure $false | Out-Null
  }
  Invoke-PortablePostgres -ExeName "createdb.exe" -PgArgs @("-h", "127.0.0.1", "-p", $Port, "-U", $adminUser, "-O", $DbUser, $DbName) -IgnoreFailure $true -Quiet $true | Out-Null
  Invoke-PortablePostgres -ExeName "psql.exe" -PgArgs @("-w", "-h", "127.0.0.1", "-p", $Port, "-U", $adminUser, "-d", "postgres", "-c", "ALTER DATABASE `"$DbName`" OWNER TO `"$DbUser`"") -IgnoreFailure $false -Quiet $true | Out-Null
  Invoke-PortablePostgres -ExeName "psql.exe" -PgArgs @("-w", "-h", "127.0.0.1", "-p", $Port, "-U", $adminUser, "-d", $DbName, "-c", "ALTER SCHEMA public OWNER TO `"$DbUser`"; GRANT ALL ON SCHEMA public TO `"$DbUser`";") -IgnoreFailure $false -Quiet $true | Out-Null
}

function Start-PortablePostgres([string]$Port, [string]$DbName, [string]$DbUser, [string]$DbPassword) {
  Write-Host "[4/6] Base de datos local Run: iniciando PostgreSQL portable..."
  $pgData = Join-Path $dataRoot "db"
  $serviceName = "MTCotizaPostgres"
  $service = Get-Service -Name $serviceName -ErrorAction SilentlyContinue
  if ($service) {
    Write-Host "   - Usando servicio PostgreSQL instalado: $serviceName"
    if ($service.Status -ne "Running") { Start-Service -Name $serviceName }
    $serviceReady = $false
    for ($i = 0; $i -lt 60; $i++) {
      & (Resolve-PortablePostgresExecutable "pg_isready.exe") @("-h", "127.0.0.1", "-p", $Port) >$null 2>$null
      if ($LASTEXITCODE -eq 0) { $serviceReady = $true; break }
      Start-Sleep -Seconds 1
    }
    if (-not $serviceReady) { throw "El servicio $serviceName no respondio en 127.0.0.1:$Port." }
    try {
      Wait-PortableAppDatabase -Port $Port -DbName $DbName -DbUser $DbUser -DbPassword $DbPassword -TimeoutSeconds 8
    } catch {
      Repair-PortableAppDatabase -Port $Port -DbName $DbName -DbUser $DbUser -DbPassword $DbPassword
      Wait-PortableAppDatabase -Port $Port -DbName $DbName -DbUser $DbUser -DbPassword $DbPassword -TimeoutSeconds 20
    }
    Write-Host "   - PostgreSQL servicio listo en 127.0.0.1:$Port, datos en $pgData."
    return 0
  }
  if (Test-IsProcessElevated) {
    throw "MT Cotiza Client esta elevado y PostgreSQL aun no esta instalado como servicio. Ejecuta el instalador completo o abre la app sin privilegios elevados."
  }
  $pgOutLog = Join-Path $dataRoot "logs\postgres.out.log"
  $pgErrLog = Join-Path $dataRoot "logs\postgres.err.log"
  Ensure-Folder $pgData
  Ensure-Folder (Join-Path $dataRoot "logs")

  Resolve-PortablePostgresExecutable "initdb.exe" | Out-Null
  Resolve-PortablePostgresExecutable "pg_ctl.exe" | Out-Null
  Resolve-PortablePostgresExecutable "pg_isready.exe" | Out-Null
  Resolve-PortablePostgresExecutable "createdb.exe" | Out-Null
  Resolve-PortablePostgresExecutable "psql.exe" | Out-Null


  if (-not (Test-Path -Path (Join-Path $pgData "PG_VERSION"))) {
    Write-Host "   - Inicializando data/db..."
    Invoke-PortablePostgres -ExeName "initdb.exe" -PgArgs @("-D", $pgData, "-U", "postgres", "-A", "trust", "-E", "UTF8") | Out-Null
  }

  & (Resolve-PortablePostgresExecutable "pg_isready.exe") @("-h", "127.0.0.1", "-p", $Port) >$null 2>$null
  if ($LASTEXITCODE -eq 0) {
    Write-Host "   - PostgreSQL portable ya estaba listo en 127.0.0.1:$Port."
    try {
      Wait-PortableAppDatabase -Port $Port -DbName $DbName -DbUser $DbUser -DbPassword $DbPassword -TimeoutSeconds 8
    } catch {
      Repair-PortableAppDatabase -Port $Port -DbName $DbName -DbUser $DbUser -DbPassword $DbPassword
      Wait-PortableAppDatabase -Port $Port -DbName $DbName -DbUser $DbUser -DbPassword $DbPassword -TimeoutSeconds 20
    }
    return 0
  }

  $postgresExe = Resolve-PortablePostgresExecutable "postgres.exe"
  $postgresArgs = @("-D", $pgData, "-p", $Port, "-h", "127.0.0.1")
  Write-Host "   - Ejecutando: postgres.exe $($postgresArgs -join ' ')"
  $postgresProc = Start-Process -FilePath $postgresExe -ArgumentList $postgresArgs -WorkingDirectory $portablePostgresBin -RedirectStandardOutput $pgOutLog -RedirectStandardError $pgErrLog -PassThru -WindowStyle Hidden
  Write-Host "   - PostgreSQL iniciado (PID $($postgresProc.Id))"

  $isReady = $false
  for ($i = 0; $i -lt 40; $i++) {
    & (Resolve-PortablePostgresExecutable "pg_isready.exe") @("-h", "127.0.0.1", "-p", $Port) >$null 2>$null
    if ($LASTEXITCODE -eq 0) {
      $isReady = $true
      break
    }
    $postgresProc.Refresh()
    if ($postgresProc.HasExited) {
      break
    }
    Start-Sleep -Seconds 1
  }

  if (-not $isReady) {
    $postgresErr = ""
    if (Test-Path -Path $pgErrLog) { $postgresErr = Get-Content -Path $pgErrLog -Raw -ErrorAction SilentlyContinue }
    if ($postgresErr -like "*privilegios administrativos*") {
      throw "PostgreSQL portable rechazo privilegios administrativos. Abre MT Cotiza Client con doble click normal, no como administrador."
    }
  }

  if (-not $isReady) {
    throw "PostgreSQL portable no quedo listo a tiempo. Revisa data\logs\postgres.err.log y confirma que el puerto $Port no este ocupado."
  }

  [Environment]::SetEnvironmentVariable("PGCONNECT_TIMEOUT", "2", "Process")
  [Environment]::SetEnvironmentVariable("PGSSLMODE", "disable", "Process")
  $adminUser = "postgres"
  $adminReady = $false
  for ($i = 0; $i -lt 10; $i++) {
    $adminCheck = Invoke-PortablePostgresOutput -ExeName "psql.exe" -PgArgs @("-h", "127.0.0.1", "-p", $Port, "-U", $adminUser, "-d", "postgres", "-tAc", "SELECT 1")
    if ($adminCheck.ExitCode -eq 0 -and (($adminCheck.Output -join "").Trim()) -eq "1") {
      $adminReady = $true
      break
    }
    Start-Sleep -Seconds 1
  }

  if ($adminReady) {
    $escapedUser = $DbUser.Replace("'", "''")
    $escapedPassword = $DbPassword.Replace("'", "''")
    $roleExistsResult = Invoke-PortablePostgresOutput -ExeName "psql.exe" -PgArgs @("-h", "127.0.0.1", "-p", $Port, "-U", $adminUser, "-d", "postgres", "-tAc", "SELECT 1 FROM pg_roles WHERE rolname = '$escapedUser'")
    if (($roleExistsResult.Output -join "").Trim() -ne "1") {
      Invoke-PortablePostgres -ExeName "psql.exe" -PgArgs @("-h", "127.0.0.1", "-p", $Port, "-U", $adminUser, "-d", "postgres", "-c", "CREATE ROLE `"$escapedUser`" LOGIN PASSWORD '$escapedPassword'") -IgnoreFailure $true | Out-Null
    }
    Invoke-PortablePostgres -ExeName "createdb.exe" -PgArgs @("-h", "127.0.0.1", "-p", $Port, "-U", $adminUser, "-O", $DbUser, $DbName) -IgnoreFailure $true | Out-Null
  } else {
    Write-Host "   - PostgreSQL esta aceptando conexiones, pero no se pudo usar postgres para bootstrap. Continuando con DB existente."
  }
  Wait-PortableAppDatabase -Port $Port -DbName $DbName -DbUser $DbUser -DbPassword $DbPassword
  Write-Host "   - PostgreSQL portable listo en 127.0.0.1:$Port, datos en data\db."
  if ($postgresProc -ne $null) { return $postgresProc.Id }
  return 0
}

function Invoke-Docker([string[]]$Args) {
  $argsText = $Args -join " "
  Write-Host "   - Ejecutando: docker $argsText"
  & $script:DockerExe @Args
  if ($LASTEXITCODE -ne 0) {
    throw "Fallo comando docker $argsText (codigo $LASTEXITCODE)"
  }
}

function Resolve-DockerExecutable {
  $cmd = Get-Command docker -ErrorAction SilentlyContinue
  if ($cmd) { return $cmd.Source }

  $candidates = @(
    (Join-Path $env:ProgramFiles "Docker\Docker\resources\bin\docker.exe"),
    (Join-Path ${env:ProgramFiles(x86)} "Docker\Docker\resources\bin\docker.exe"),
    (Join-Path $env:LOCALAPPDATA "Programs\Docker\Docker\resources\bin\docker.exe"),
    (Join-Path $env:LOCALAPPDATA "Docker\Docker\resources\bin\docker.exe")
  )
  foreach ($path in $candidates) {
    if (Test-Path -Path $path) { return $path }
  }
  return $null
}

function Find-DockerDesktop {
  $candidates = @(
    (Join-Path $env:ProgramFiles "Docker\Docker\Docker Desktop.exe"),
    (Join-Path ${env:ProgramFiles(x86)} "Docker\Docker\Docker Desktop.exe"),
    (Join-Path $env:LOCALAPPDATA "Programs\Docker\Docker\Docker Desktop.exe"),
    (Join-Path $env:LOCALAPPDATA "Docker\Docker Desktop.exe")
  )
  return $candidates | Where-Object { Test-Path $_ } | Select-Object -First 1
}

function Test-DockerHealthy {
  if (-not $script:DockerExe) { return $false }
  $previousErrorAction = $ErrorActionPreference
  try {
    $ErrorActionPreference = "Continue"
    $psi = New-Object System.Diagnostics.ProcessStartInfo
    $psi.FileName = $script:DockerExe
    $psi.Arguments = "info"
    $psi.RedirectStandardOutput = $true
    $psi.RedirectStandardError = $true
    $psi.UseShellExecute = $false
    $psi.CreateNoWindow = $true
    $proc = [System.Diagnostics.Process]::Start($psi)
    $proc.WaitForExit()
    return ($proc.ExitCode -eq 0)
  } catch {
    return $false
  } finally {
    $ErrorActionPreference = $previousErrorAction
  }
}

function Ensure-DockerRunning {
  $script:DockerExe = Resolve-DockerExecutable
  if (-not $script:DockerExe) { return $false }
  if (Test-DockerHealthy) { return $true }

  $desktop = Find-DockerDesktop
  if ($desktop) {
    Write-Host "Docker no esta activo. Iniciando Docker Desktop y esperando el engine..."
    Start-Process -FilePath $desktop | Out-Null
  }

  $waited = 0
  while ($waited -lt 180) {
    Start-Sleep -Seconds 2
    $waited += 2
    if (Test-DockerHealthy) { return $true }
  }
  return $false
}

function Ensure-DockerImage([string]$Image) {
  cmd.exe /c ('"{0}" image inspect {1} >nul 2>nul' -f $script:DockerExe, $Image)
  return ($LASTEXITCODE -eq 0)
}

function Build-ApiWithDocker([string]$SourcePath, [string]$OutputPath) {
  Write-Host "   - Backend: construyendo JAR con Docker..."
  if (-not (Ensure-DockerImage "maven:3.9-eclipse-temurin-17")) {
    throw "No se encontro la imagen Docker maven:3.9-eclipse-temurin-17. Activa MT_ARTIFACT_ONLY=1 o descarga la imagen manualmente (docker pull maven:3.9-eclipse-temurin-17)."
  }
  Invoke-Docker @("run", "--rm", "-v", "${SourcePath}:/workspace", "-w", "/workspace", "maven:3.9-eclipse-temurin-17", "mvn", "package")

  $targetPath = Join-Path $SourcePath "target"
  if (-not (Test-Path -Path $targetPath)) {
    throw "No se creo la carpeta target en $SourcePath."
  }
  $jar = Get-ChildItem -Path $targetPath -Filter "*.jar" |
    Where-Object { $_.Name -notlike "*-sources.jar" -and $_.Name -notlike "*-javadoc.jar" } |
    Sort-Object LastWriteTime -Descending |
    Select-Object -First 1
  if ($null -eq $jar) {
    throw "No se genero ningun JAR en $SourcePath\target."
  }
  Copy-Item -Path $jar.FullName -Destination $OutputPath -Force
}

function Build-FrontWithDocker([string]$SourcePath, [string]$OutputPath, [string]$ApiUrl) {
  Write-Host "   - Frontend: construyendo con Docker..."
  if (-not (Ensure-DockerImage "node:20-alpine")) {
    throw "No se encontro la imagen Docker node:20-alpine. Activa MT_ARTIFACT_ONLY=1 o descarga la imagen manualmente (docker pull node:20-alpine)."
  }
  Invoke-Docker @("run", "--rm", "-v", "${SourcePath}:/workspace", "-w", "/workspace", "-e", "NEXT_PUBLIC_API_URL=$ApiUrl", "-e", "NODE_OPTIONS=--max-old-space-size=4096", "node:20-alpine", "sh", "-lc", "npm ci && npm run build")

  $sourceStandalone = Join-Path $SourcePath ".next\standalone"
  if (-not (Test-Path -Path $sourceStandalone)) {
    throw "No se encontro .next/standalone en $SourcePath"
  }

  if (Test-Path -Path $OutputPath) { Remove-Item -Recurse -Force $OutputPath }
  New-Item -ItemType Directory -Path $OutputPath | Out-Null
  Copy-Item -Path $sourceStandalone -Destination $OutputPath -Recurse -Force
  Ensure-Folder (Join-Path $OutputPath ".next")

  $staticPath = Join-Path $SourcePath ".next\static"
  if (Test-Path -Path $staticPath) {
    Copy-Item -Path $staticPath -Destination (Join-Path $OutputPath ".next\static") -Recurse -Force
  }
  $publicPath = Join-Path $SourcePath "public"
  if (Test-Path -Path $publicPath) {
    Copy-Item -Path $publicPath -Destination (Join-Path $OutputPath "public") -Recurse -Force
  }
}

function Get-LatestFile([string]$Path, [string[]]$Patterns) {
  $all = @()
  foreach ($p in $Patterns) {
    $all += Get-ChildItem -Path $Path -Recurse -File -Filter $p -ErrorAction SilentlyContinue
  }
  if (-not $all) { return [datetime]::MinValue }
  return ($all | Measure-Object -Property LastWriteTime -Maximum).Maximum
}

function Should-RebuildBackend([bool]$Force) {
  if ($Force) { return $true }
  $apiJar = Get-ChildItem -Path $apiBuild -Filter "*.jar" -ErrorAction SilentlyContinue | Sort-Object LastWriteTime -Descending | Select-Object -First 1
  if (-not $apiJar) { return $true }
  $srcTime = Get-LatestSourceWrite $apiDir @("target", ".git", ".idea", ".vscode")
  return ($srcTime -gt $apiJar.LastWriteTime)
}

function Should-RebuildFront([bool]$Force) {
  if ($Force) { return $true }
  $frontServer = Join-Path $frontBuild "server.js"
  if (-not (Test-Path -Path $frontServer)) { return $true }
  $server = Get-Item -Path $frontServer
  $srcTime = Get-LatestSourceWrite $frontDir @("node_modules", ".next", ".git", ".idea", ".vscode")
  return ($srcTime -gt $server.LastWriteTime)
}

function Get-StandaloneServer {
  $apiJar = Get-ChildItem -Path $apiBuild -Filter "*.jar" -ErrorAction SilentlyContinue | Sort-Object LastWriteTime -Descending | Select-Object -First 1
  if (-not $apiJar) {
    throw "No se encontro JAR en $apiBuild. Ejecuta una vez con Docker o copia aqui un JAR valido."
  }
  $frontServer = Join-Path $frontBuild "server.js"
  if (-not (Test-Path -Path $frontServer)) {
    throw "No se encontro front standalone en $frontBuild. Ejecuta con Docker o copia output standalone."
  }
  return @{
    ApiJar = $apiJar.FullName
    FrontServer = $frontServer
  }
}

function Start-Standalone([string]$ApiUrl, [string]$FrontPort, [string]$ApiProfile, [string]$ApiPort, [string]$DbUrl, [string]$DbUser, [string]$DbPassword, [int]$PostgresPid = 0) {
  $javaExe = Resolve-Executable "java" $javaCandidatePaths
  $nodeExe = Resolve-Executable "node" $nodeCandidatePaths
  if (-not $javaExe) {
    throw "No se encontro Java para modo sin Docker. Ejecuta prepare-MT-Cotiza-Client-Run-Runtime.bat antes de entregar el Run o coloca runtime\java\bin\java.exe."
  }
  if (-not $nodeExe) {
    throw "No se encontro Node para modo sin Docker. Ejecuta prepare-MT-Cotiza-Client-Run-Runtime.bat antes de entregar el Run o coloca runtime\node\node.exe."
  }

  $servers = Get-StandaloneServer
  Write-Host "[4/6] Modo sin Docker: iniciando procesos locales..."

  Import-EnvFile
  $uploadDir = Join-Path $dataRoot "uploads"
  Ensure-Folder $uploadDir
  $apiAppLog = Join-Path $dataRoot "logs\cotiflow.log"
  $envSet = @{
    "SPRING_PROFILES_ACTIVE" = $ApiProfile
    "SERVER_PORT" = $ApiPort
    "NEXT_PUBLIC_API_URL" = $ApiUrl
    "PORT" = $FrontPort
    "UPLOAD_DIR" = $uploadDir
    "LOG_FILE_NAME" = $apiAppLog
    "SPRING_DATASOURCE_URL" = $DbUrl
    "SPRING_DATASOURCE_USERNAME" = $DbUser
    "SPRING_DATASOURCE_PASSWORD" = $DbPassword
    "PGSSLMODE" = "disable"
  }
  foreach ($k in $envSet.Keys) {
    [Environment]::SetEnvironmentVariable($k, $envSet[$k], "Process")
  }

  $apiOutLog = Join-Path $dataRoot "logs\api.out.log"
  $apiErrLog = Join-Path $dataRoot "logs\api.err.log"
  $frontOutLog = Join-Path $dataRoot "logs\front.out.log"
  $frontErrLog = Join-Path $dataRoot "logs\front.err.log"

  $apiArgs = @(
    "-Dspring.datasource.url=$DbUrl"
    "-Dspring.datasource.username=$DbUser"
    "-Dspring.datasource.password=$DbPassword"
    "-Dapp.upload.dir=$uploadDir"
    "-Dlogging.file.name=$apiAppLog"
    "-Dspring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect"
    "-Dspring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect"
    "-Dspring.datasource.hikari.initialization-fail-timeout=60000"
    "-Dspring.datasource.hikari.connection-timeout=30000"
    "-Dspring.datasource.hikari.validation-timeout=5000"
    "-Dserver-sync.secret="
    "-Dserver-sync.users-url="
    "-Dserver-sync.user-update-url="
    "-Dserver-sync.tasks-url="
    "-Dserver-sync.tasks-page-url="
    "-Dserver-sync.quotation-requests-url="
    "-Dserver-sync.technical-reports-url="
    "-jar",
    $servers.ApiJar
  )
  $apiProc = Start-Process -FilePath $javaExe -ArgumentList $apiArgs -WorkingDirectory $apiBuild -RedirectStandardOutput $apiOutLog -RedirectStandardError $apiErrLog -PassThru -WindowStyle Minimized
  Write-Host "   - API iniciada (PID $($apiProc.Id))"

  $apiReadyUrl = "http://127.0.0.1:$ApiPort/api/auth/me"
  $apiReady = $false
  for ($i = 0; $i -lt 120; $i++) {
    if ($apiProc.HasExited) {
      throw "La API termino antes de quedar lista. Revisa data\logs\api.out.log."
    }
    try {
      $response = Invoke-WebRequest -UseBasicParsing -Uri $apiReadyUrl -TimeoutSec 2
      if ($response.StatusCode -ge 200 -and $response.StatusCode -lt 500) {
        $apiReady = $true
        break
      }
    } catch {
      $statusCode = 0
      if ($_.Exception.Response) { $statusCode = [int]$_.Exception.Response.StatusCode }
      if ($statusCode -eq 401 -or $statusCode -eq 403) {
        $apiReady = $true
        break
      }
    }
    Start-Sleep -Seconds 1
  }
  if (-not $apiReady) {
    throw "La API no respondio en $apiReadyUrl. Revisa data\logs\api.out.log."
  }
  Write-Host "   - API lista en http://127.0.0.1:$ApiPort."

  $frontProc = Start-Process -FilePath $nodeExe -ArgumentList "server.js" -WorkingDirectory $frontBuild -RedirectStandardOutput $frontOutLog -RedirectStandardError $frontErrLog -PassThru -WindowStyle Minimized
  Write-Host "   - Front iniciado (PID $($frontProc.Id))"

  $pidState = @{
    mode = "standalone"
    api = $apiProc.Id
    front = $frontProc.Id
    started = (Get-Date).ToString("o")
  }
  if ($PostgresPid -gt 0) { $pidState.postgres = $PostgresPid }
  $pidState | ConvertTo-Json | Set-Content -Path $pidFile -Encoding UTF8

  $frontUrl = "http://localhost:$FrontPort/login"
  $ready = $false
  for ($i = 0; $i -lt 30; $i++) {
    try {
      $resp = Invoke-WebRequest -UseBasicParsing -Uri $frontUrl -Method Get -TimeoutSec 1
      if ($resp.StatusCode -ge 200 -and $resp.StatusCode -lt 500) { $ready = $true; break }
    } catch {}
    Start-Sleep -Seconds 1
  }
  if (-not $ready) {
    Write-Host "No pude confirmar $frontUrl aun, pero intentare abrirlo igualmente."
  }
  if ($BootstrapOnly -and -not $KeepServicesRunning) {
    Write-Host "Bootstrap completo: API y Front respondieron. Cerrando servicios temporales..."
    Stop-Process -Id $frontProc.Id -Force -ErrorAction SilentlyContinue
    Stop-Process -Id $apiProc.Id -Force -ErrorAction SilentlyContinue
    $pgData = Join-Path $dataRoot "db"
    $pgCtl = Join-Path $portablePostgresBin "pg_ctl.exe"
    if (Test-Path -Path $pgCtl) {
      & $pgCtl @("-D", $pgData, "stop", "-m", "fast") >$null 2>$null
    } elseif ($PostgresPid -gt 0) {
      Stop-Process -Id $PostgresPid -Force -ErrorAction SilentlyContinue
    }
    if (Test-Path -Path $pidFile) { Remove-Item -Path $pidFile -Force -ErrorAction SilentlyContinue }
    return
  }
  if ($BootstrapOnly) {
    Write-Host "Bootstrap completo: API y Front quedan precalentados para el primer acceso."
    return
  }
  if (-not $NoBrowser) {
    Start-Process -FilePath "explorer.exe" -ArgumentList $frontUrl
  }
  Write-Host "Modo standalone activo. Ejecutando API y Front con java/node locales."
  Write-Host "Logs API: $apiOutLog | $apiErrLog"
  Write-Host "Logs Front: $frontOutLog | $frontErrLog"
  Write-Host "Nota: la base de datos debe estar disponible por URL definida en .env."
}

function Start-RunPostgres {
  Write-Host "[4/6] Base de datos local Run: levantando PostgreSQL..."
  if (-not (Ensure-DockerRunning)) {
    throw "Run requiere Docker para RUN_DB_MODE=docker. Para no depender de Docker usa RUN_DB_MODE=portable con runtime\postgres\bin."
  }

  Push-Location $runRoot
  try {
    Invoke-Docker @("compose", "--env-file", ".env", "-f", $composeFile, "up", "-d", "postgres")

    $dbUser = Get-EnvValue "POSTGRES_USER" "cotiflow_user"
    $dbName = Get-EnvValue "POSTGRES_DB" "cotiflow"
    $ready = $false
    for ($i = 0; $i -lt 60; $i++) {
      & $script:DockerExe @("compose", "--env-file", ".env", "-f", $composeFile, "exec", "-T", "postgres", "pg_isready", "-U", $dbUser, "-d", $dbName) >$null 2>$null
      if ($LASTEXITCODE -eq 0) {
        $ready = $true
        break
      }
      Start-Sleep -Seconds 2
    }
    if (-not $ready) {
      throw "PostgreSQL local no quedo listo a tiempo. Revisa Docker y data\db."
    }
  } finally {
    Pop-Location
  }
}

function Start-Docker([string]$frontPort) {
  Write-Host "[5/6] Levantando servicios con Docker..."
  Push-Location $runRoot
  Invoke-Docker @("compose", "--env-file", ".env", "-f", $composeFile, "down", "--remove-orphans")
  try {
    Invoke-Docker @("compose", "--env-file", ".env", "-f", $composeFile, "up", "-d")
  } catch {
    Write-Host "   - Up simple no encontro imagen construida. Reintentando con --build."
    Invoke-Docker @("compose", "--env-file", ".env", "-f", $composeFile, "up", "--build", "-d")
  }
  Pop-Location

  Write-Host "[6/6] Esperando front listo..."
  $frontUrl = "http://localhost:$frontPort/login"
  $ready = $false
  for ($i = 0; $i -lt 60; $i++) {
    try {
      $response = Invoke-WebRequest -UseBasicParsing -Uri $frontUrl -Method Get -TimeoutSec 2
      if ($response.StatusCode -ge 200 -and $response.StatusCode -lt 500) {
        $ready = $true
        break
      }
    } catch {
      Start-Sleep -Seconds 2
    }
  }
  if (-not $ready) { throw "No pude abrir $frontUrl. Revisa logs: docker compose logs -f" }
  if (-not $NoBrowser) {
    Start-Process -FilePath "explorer.exe" -ArgumentList $frontUrl
  }
  Write-Host "Listo. Servicio API: http://localhost:8080 | UI: $frontUrl"
  Write-Host "Para detener: docker compose --env-file .env -f $composeFile down"
  Write-Host "Logs: docker compose --env-file .env -f $composeFile logs -f"
}

Write-Host "[1/6] Preparando estructura de ejecucion..."
Ensure-EnvFile
$fastStart = To-Bool (Get-EnvValue "MT_FAST_START" "1") $true
$forceRebuild = To-Bool (Get-EnvValue "MT_FORCE_REBUILD" "0") $false
$cleanData = To-Bool (Get-EnvValue "MT_CLEAN_DATA" "0") $false

if ($forceRebuild) {
  New-TreeClean $buildRoot
} else {
  Ensure-Folder $buildRoot
}
Ensure-Folder $apiBuild
Ensure-Folder $frontBuild

if ($cleanData) {
  New-TreeClean $dataRoot
} else {
  Ensure-Folder $dataRoot
}
Ensure-Folder (Join-Path $dataRoot "db")
Ensure-Folder (Join-Path $dataRoot "uploads")
Ensure-Folder (Join-Path $dataRoot "logs")

Write-Host "[2/6] Leyendo configuracion..."
$apiUrl = Get-EnvValue "NEXT_PUBLIC_API_URL" "http://localhost:8080/api"
$frontPort = Get-EnvValue "FRONTEND_PORT" "3000"
$apiProfile = Get-EnvValue "API_PROFILE" "prod"
$apiPort = Get-EnvValue "API_PORT" "8080"
$artifactOnly = To-Bool (Get-EnvValue "MT_ARTIFACT_ONLY" "1") $true
$runDbMode = (Get-EnvValue "RUN_DB_MODE" "portable").Trim().ToLowerInvariant()
$dbPort = Get-EnvValue "POSTGRES_PORT" "15434"
$dbName = Get-EnvValue "POSTGRES_DB" "cotiflow"
$dbUser = Get-EnvValue "POSTGRES_USER" "cotiflow_user"
$dbPassword = Get-EnvValue "POSTGRES_PASSWORD" "cotiflow_password"

Write-Host "[3/6] Verificando modo de ejecucion..."

if ($artifactOnly) {
  Write-Host "[4/6] Verificando artefactos listos (modo MT_ARTIFACT_ONLY)..."
  if (-not (Get-ChildItem -Path $apiBuild -Filter "*.jar" -ErrorAction SilentlyContinue)) {
    throw "Falta build/api (*.jar). Copia aqui el ultimo JAR compilado de la API."
  }
  if (-not (Test-Path -Path (Join-Path $frontBuild "server.js"))) {
    throw "Falta build/front/server.js. Copia aqui el output standalone del frontend."
  }
  $postgresPid = $null
  $resolvedDbConfig = Resolve-DatabaseCredentials -RunDbMode $runDbMode -DbPort $dbPort -DbName $dbName -DefaultDbUser $dbUser -DefaultDbPassword $dbPassword

  if ($runDbMode -eq "portable") {
    $postgresPid = Start-PortablePostgres -Port $dbPort -DbName $dbName -DbUser $resolvedDbConfig.User -DbPassword $resolvedDbConfig.Password
  } elseif ($runDbMode -eq "docker") {
    Start-RunPostgres
  } elseif ($runDbMode -ne "external") {
    throw "RUN_DB_MODE invalido: $runDbMode. Usa portable, docker o external."
  }

  Start-Standalone -ApiUrl $apiUrl -FrontPort $frontPort -ApiProfile $apiProfile -ApiPort $apiPort -DbUrl $resolvedDbConfig.Url -DbUser $resolvedDbConfig.User -DbPassword $resolvedDbConfig.Password -PostgresPid $postgresPid
  exit 0
}

Write-Host "[4/6] Verificando rutas de proyecto para modo build/Docker..."
if (-not (Test-Path -Path $apiDir)) { throw "No existe $apiDir" }
if (-not (Test-Path -Path $frontDir)) { throw "No existe $frontDir" }

$useDocker = Ensure-DockerRunning
if (-not $useDocker) {
  $fallbackDbConfig = Resolve-DatabaseCredentials -RunDbMode $runDbMode -DbPort $dbPort -DbName $dbName -DefaultDbUser $dbUser -DefaultDbPassword $dbPassword
  if ($runDbMode -eq "portable") {
    $fallbackPid = Start-PortablePostgres -Port $dbPort -DbName $dbName -DbUser $fallbackDbConfig.User -DbPassword $fallbackDbConfig.Password
    Start-Standalone -ApiUrl $apiUrl -FrontPort $frontPort -ApiProfile $apiProfile -ApiPort $apiPort -DbUrl $fallbackDbConfig.Url -DbUser $fallbackDbConfig.User -DbPassword $fallbackDbConfig.Password -PostgresPid $fallbackPid
    exit 0
  }
  if ($runDbMode -eq "docker") {
    throw "Docker no esta disponible y RUN_DB_MODE esta en docker. Cambia a portable o external para iniciar sin Docker."
  }

  if ((Test-Path (Join-Path $apiBuild "*.jar")) -and (Test-Path (Join-Path $frontBuild "server.js"))) {
    Start-Standalone -ApiUrl $apiUrl -FrontPort $frontPort -ApiProfile $apiProfile -ApiPort $apiPort -DbUrl $fallbackDbConfig.Url -DbUser $fallbackDbConfig.User -DbPassword $fallbackDbConfig.Password
    exit 0
  }
  throw "Docker no esta disponible y no hay build standalone completo. Ejecuta esta carpeta en una maquina con Docker o copia build/api y build/front ya compilados y coloca runtime java/node."
}

Write-Host "[4/6] Validando/compilando backend y frontend..."
$needApiBuild = if ($fastStart) { Should-RebuildBackend $forceRebuild } else { $true }
if ($needApiBuild) {
  Build-ApiWithDocker -SourcePath $apiDir -OutputPath $apiBuild
} else {
  Write-Host "   - Backend: reutilizando JAR existente."
}

$needFrontBuild = if ($fastStart) { Should-RebuildFront $forceRebuild } else { $true }
if ($needFrontBuild) {
  Build-FrontWithDocker -SourcePath $frontDir -OutputPath $frontBuild -ApiUrl $apiUrl
} else {
  Write-Host "   - Frontend: reutilizando standalone existente."
}

Start-Docker -frontPort $frontPort
