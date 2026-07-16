Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$runRoot = $PSScriptRoot
$repoRoot = Split-Path -Path $runRoot -Parent
$envFile = Join-Path $runRoot ".env"
$envExampleFile = Join-Path $runRoot ".env.example"
$composeFile = Join-Path $runRoot "docker-compose.yml"

$apiDir = Join-Path $repoRoot "MT-Cotiza-Client-API"
$frontDir = Join-Path $repoRoot "MT-Cotiza-Client-Front"
$buildRoot = Join-Path $runRoot "build"
$dataRoot = Join-Path $runRoot "data"
$apiBuild = Join-Path $buildRoot "api"
$frontBuild = Join-Path $buildRoot "front"
$pidFile = Join-Path $runRoot "standalone.pids.json"
$portablePostgresBin = Join-Path $runRoot "runtime\postgres\bin"

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
  if (Test-Path -Path $envFile) { return }
  if (-not (Test-Path -Path $envExampleFile)) {
    throw "No existe .env ni .env.example en $runRoot. Crea .env antes de iniciar."
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

function Import-EnvFile {
  if (-not (Test-Path -Path $envFile)) { return }
  Get-Content -Path $envFile | ForEach-Object {
    $line = $_.Trim()
    if ([string]::IsNullOrWhiteSpace($line) -or $line.StartsWith("#")) { return }
    $parts = $line -split "=", 2
    if ($parts.Count -lt 2) { return }
    $key = $parts[0].Trim()
    $value = $parts[1].Trim()
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
  $cmd = Get-Command $commandName -ErrorAction SilentlyContinue
  if ($cmd) { return $cmd.Source }
  foreach ($path in $candidates) {
    if ($path -and (Test-Path -Path $path)) { return $path }
  }
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

function Start-PortablePostgres([string]$Port, [string]$DbName, [string]$DbUser) {
  Write-Host "[4/6] Base de datos local Run: iniciando PostgreSQL portable..."
  $pgData = Join-Path $dataRoot "db"
  $pgOutLog = Join-Path $dataRoot "logs\postgres.out.log"
  $pgErrLog = Join-Path $dataRoot "logs\postgres.err.log"
  Ensure-Folder $pgData
  Ensure-Folder (Join-Path $dataRoot "logs")

  Resolve-PortablePostgresExecutable "initdb.exe" | Out-Null
  Resolve-PortablePostgresExecutable "pg_ctl.exe" | Out-Null
  Resolve-PortablePostgresExecutable "pg_isready.exe" | Out-Null
  Resolve-PortablePostgresExecutable "createdb.exe" | Out-Null

  if (-not (Test-Path -Path (Join-Path $pgData "PG_VERSION"))) {
    Write-Host "   - Inicializando data/db..."
    Invoke-PortablePostgres -ExeName "initdb.exe" -PgArgs @("-D", $pgData, "-U", $DbUser, "-A", "trust", "-E", "UTF8") | Out-Null
  }

  $postgresExe = Resolve-PortablePostgresExecutable "postgres.exe"
  $postgresArgs = @("-D", $pgData, "-p", $Port, "-h", "127.0.0.1")
  Write-Host "   - Ejecutando: postgres.exe $($postgresArgs -join ' ')"
  $postgresProc = Start-Process -FilePath $postgresExe -ArgumentList $postgresArgs -WorkingDirectory $portablePostgresBin -RedirectStandardOutput $pgOutLog -RedirectStandardError $pgErrLog -PassThru -WindowStyle Hidden
  Write-Host "   - PostgreSQL iniciado (PID $($postgresProc.Id))"

  Start-Sleep -Seconds 1
  $postgresProc.Refresh()
  if ($postgresProc.HasExited) {
    $postgresErr = ""
    if (Test-Path -Path $pgErrLog) { $postgresErr = Get-Content -Path $pgErrLog -Raw -ErrorAction SilentlyContinue }
    if ($postgresErr -like "*privilegios administrativos*") {
      Write-Host "   - PostgreSQL rechazo privilegios administrativos. Reintentando con token restringido..."
      $cmdFile = Join-Path $dataRoot "run-postgres.cmd"
      $cmd = "cd /d ""$portablePostgresBin"" && ""$postgresExe"" -D ""$pgData"" -p $Port -h 127.0.0.1 >> ""$pgOutLog"" 2>> ""$pgErrLog"""
      Set-Content -Path $cmdFile -Value $cmd -Encoding ASCII
      Start-Process -FilePath "runas.exe" -ArgumentList @("/trustlevel:0x20000", "`"$cmdFile`"") -WorkingDirectory $runRoot -WindowStyle Hidden | Out-Null
      $postgresProc = $null
    } else {
      throw "PostgreSQL portable se detuvo antes de quedar listo (codigo $($postgresProc.ExitCode)). Revisa data\logs\postgres.err.log."
    }
  }

  $ready = $false
  for ($i = 0; $i -lt 60; $i++) {
    if ($postgresProc -ne $null) {
      $postgresProc.Refresh()
      if ($postgresProc.HasExited) {
        throw "PostgreSQL portable se detuvo antes de quedar listo (codigo $($postgresProc.ExitCode)). Revisa data\logs\postgres.err.log."
      }
    }
    $readyCode = Invoke-PortablePostgres -ExeName "pg_isready.exe" -PgArgs @("-h", "127.0.0.1", "-p", $Port) -IgnoreFailure $true -Quiet $true
    if ($readyCode -eq 0) {
      $ready = $true
      break
    }
    Start-Sleep -Seconds 2
  }
  if (-not $ready) {
    throw "PostgreSQL portable no quedo listo a tiempo. Revisa data\logs\postgres.err.log y confirma que el puerto $Port no este ocupado."
  }

  Invoke-PortablePostgres -ExeName "createdb.exe" -PgArgs @("-h", "127.0.0.1", "-p", $Port, "-U", $DbUser, $DbName) -IgnoreFailure $true | Out-Null
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

function Start-Standalone([string]$ApiUrl, [string]$FrontPort, [string]$ApiProfile, [string]$ApiPort, [int]$PostgresPid = 0) {
  $javaExe = Resolve-Executable "java" $javaCandidatePaths
  $nodeExe = Resolve-Executable "node" $nodeCandidatePaths
  if (-not $javaExe) {
    throw "No se encontro java para modo sin Docker. Coloca runtime\\java\\bin\\java.exe en MT-Client-Run\\runtime o instala Java."
  }
  if (-not $nodeExe) {
    throw "No se encontro node para modo sin Docker. Coloca runtime\\node\\node.exe en MT-Client-Run\\runtime o instala Node.js."
  }

  $servers = Get-StandaloneServer
  Write-Host "[4/6] Modo sin Docker: iniciando procesos locales..."

  Import-EnvFile
  $uploadDir = Join-Path $dataRoot "uploads"
  $apiAppLog = Join-Path $dataRoot "logs\cotiflow.log"
  $envSet = @{
    "SPRING_PROFILES_ACTIVE" = $ApiProfile
    "SERVER_PORT" = $ApiPort
    "NEXT_PUBLIC_API_URL" = $ApiUrl
    "PORT" = $FrontPort
    "UPLOAD_DIR" = $uploadDir
    "LOG_FILE_NAME" = $apiAppLog
  }
  foreach ($k in $envSet.Keys) {
    [Environment]::SetEnvironmentVariable($k, $envSet[$k], "Process")
  }

  $apiOutLog = Join-Path $dataRoot "logs\api.out.log"
  $apiErrLog = Join-Path $dataRoot "logs\api.err.log"
  $frontOutLog = Join-Path $dataRoot "logs\front.out.log"
  $frontErrLog = Join-Path $dataRoot "logs\front.err.log"

  $apiProc = Start-Process -FilePath $javaExe -ArgumentList @("-jar", $servers.ApiJar) -WorkingDirectory $apiBuild -RedirectStandardOutput $apiOutLog -RedirectStandardError $apiErrLog -PassThru -WindowStyle Minimized
  Write-Host "   - API iniciada (PID $($apiProc.Id))"
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

  $frontUrl = "http://localhost:$FrontPort"
  $ready = $false
  for ($i = 0; $i -lt 60; $i++) {
    try {
      $resp = Invoke-WebRequest -UseBasicParsing -Uri $frontUrl -Method Head -TimeoutSec 2
      if ($resp.StatusCode -ge 200 -and $resp.StatusCode -lt 500) { $ready = $true; break }
    } catch {}
    Start-Sleep -Seconds 2
  }
  if (-not $ready) {
    Write-Host "No pude abrir $frontUrl aun. Revisa logs y procesos de java/node."
  } else {
    Start-Process $frontUrl
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
  $frontUrl = "http://localhost:$frontPort"
  $ready = $false
  for ($i = 0; $i -lt 60; $i++) {
    try {
      $response = Invoke-WebRequest -UseBasicParsing -Uri $frontUrl -Method Head -TimeoutSec 2
      if ($response.StatusCode -ge 200 -and $response.StatusCode -lt 500) {
        $ready = $true
        break
      }
    } catch {
      Start-Sleep -Seconds 2
    }
  }
  if (-not $ready) { throw "No pude abrir $frontUrl. Revisa logs: docker compose logs -f" }
  Start-Process $frontUrl
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
$dbPort = Get-EnvValue "POSTGRES_PORT" "5434"
$dbName = Get-EnvValue "POSTGRES_DB" "cotiflow"
$dbUser = Get-EnvValue "POSTGRES_USER" "cotiflow_user"

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
  if ($runDbMode -eq "portable") {
    $postgresPid = Start-PortablePostgres -Port $dbPort -DbName $dbName -DbUser $dbUser
  } elseif ($runDbMode -eq "docker") {
    Start-RunPostgres
  } elseif ($runDbMode -ne "external") {
    throw "RUN_DB_MODE invalido: $runDbMode. Usa portable, docker o external."
  }
  Start-Standalone -ApiUrl $apiUrl -FrontPort $frontPort -ApiProfile $apiProfile -ApiPort $apiPort -PostgresPid $postgresPid
  exit 0
}

Write-Host "[4/6] Verificando rutas de proyecto para modo build/Docker..."
if (-not (Test-Path -Path $apiDir)) { throw "No existe $apiDir" }
if (-not (Test-Path -Path $frontDir)) { throw "No existe $frontDir" }

$useDocker = Ensure-DockerRunning
if (-not $useDocker) {
  if ((Test-Path (Join-Path $apiBuild "*.jar")) -and (Test-Path (Join-Path $frontBuild "server.js"))) {
    Start-Standalone -ApiUrl $apiUrl -FrontPort $frontPort -ApiProfile $apiProfile -ApiPort $apiPort
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
