#define MyAppName "MT Cotiza Client"
#define MyAppVersion "0.1.0"
#define MyAppPublisher "MT Cotiza"
#define MyAppExeName "electron.exe"
#define MyAppId "{{7A45B986-1A83-49B1-9A8A-7C0A36A53A60}}"

[Setup]
AppId={#MyAppId}
AppName={#MyAppName}
AppVersion={#MyAppVersion}
AppPublisher={#MyAppPublisher}
DefaultDirName={autopf}\MT Cotiza Client
DefaultGroupName={#MyAppName}
DisableDirPage=no
DisableProgramGroupPage=no
PrivilegesRequired=admin
OutputDir=output
OutputBaseFilename=MT-Cotiza-Client-Setup-{#MyAppVersion}
Compression=lzma2
SolidCompression=yes
WizardStyle=modern
UninstallDisplayIcon={app}\electron\dist\electron.exe
CloseApplications=yes
RestartApplications=no

[Files]
Source: "..\*"; DestDir: "{app}"; Flags: ignoreversion recursesubdirs createallsubdirs; Excludes: ".git\*,.env,data\*,backups\*,installer\output\*,runtime\_downloads\*,*.tmp,*.log,*.out.log,*.err.log,standalone.pids.json"

[Icons]
Name: "{autoprograms}\{#MyAppName}"; Filename: "{app}\electron\dist\electron.exe"; Parameters: """{app}\electron"""; WorkingDir: "{app}"; IconFilename: "{app}\electron\dist\electron.exe"
Name: "{autodesktop}\{#MyAppName}"; Filename: "{app}\electron\dist\electron.exe"; Parameters: """{app}\electron"""; WorkingDir: "{app}"; IconFilename: "{app}\electron\dist\electron.exe"; Tasks: desktopicon

[Tasks]
Name: "desktopicon"; Description: "Crear acceso directo en el escritorio"; GroupDescription: "Accesos directos:"; Flags: checkedonce

[Run]
Filename: "{app}\install-postgres-service-MT-Cotiza-Client.bat"; WorkingDir: "{app}"; StatusMsg: "Instalando PostgreSQL local como servicio de Windows..."; Flags: runhidden waituntilterminated
Filename: "{app}\install-bootstrap-MT-Cotiza-Client.bat"; WorkingDir: "{app}"; StatusMsg: "Preparando base de datos local por primera vez..."; Flags: runhidden waituntilterminated
Filename: "{app}\electron\dist\electron.exe"; Parameters: """{app}\electron"""; WorkingDir: "{app}"; Description: "Abrir {#MyAppName}"; Flags: nowait postinstall skipifsilent

[Registry]
Root: HKLM; Subkey: "Software\Microsoft\Windows\CurrentVersion\Run"; ValueType: string; ValueName: "MTCotizaClientServices"; ValueData: """{app}\start-MT-Cotiza-Client-Services-Silent.vbs"""; Flags: uninsdeletevalue

[UninstallRun]
Filename: "{cmd}"; Parameters: "/c sc stop MTCotizaPostgres & sc delete MTCotizaPostgres"; Flags: runhidden

[UninstallDelete]
Type: filesandordirs; Name: "{app}\data"
Type: filesandordirs; Name: "{app}\backups"

[Code]
var
  PgInfoPage: TWizardPage;
  PgInfoLabel: TNewStaticText;

function DetectExistingPostgres(): Boolean;
var
  ResultCode: Integer;
begin
  Result := Exec(ExpandConstant('{cmd}'), '/c sc query state= all | findstr /I "postgresql postgres"', '', SW_HIDE, ewWaitUntilTerminated, ResultCode) and (ResultCode = 0);
end;

procedure InitializeWizard();
begin
  PgInfoPage := CreateCustomPage(
    wpSelectDir,
    'Configuración de PostgreSQL',
    'MT Cotiza instalará sus componentes locales de base de datos.'
  );

  PgInfoLabel := TNewStaticText.Create(PgInfoPage);
  PgInfoLabel.Parent := PgInfoPage.Surface;
  PgInfoLabel.Left := 0;
  PgInfoLabel.Top := 0;
  PgInfoLabel.Width := PgInfoPage.SurfaceWidth;
  PgInfoLabel.Height := PgInfoPage.SurfaceHeight;
  PgInfoLabel.WordWrap := True;

  if DetectExistingPostgres() then begin
    PgInfoLabel.Caption :=
      'Se detectó PostgreSQL instalado en esta máquina.'#13#10#13#10 +
      'Para no tocar ni depender de esa instalación, MT Cotiza instalará un servicio propio llamado MTCotizaPostgres en el puerto 15434.'#13#10#13#10 +
      'Los datos quedarán en C:\ProgramData\MT Cotiza Client\data.'#13#10#13#10 +
      'Esto evita conflictos con PostgreSQL existente y permite que la aplicación arranque sin el problema de privilegios elevados.';
  end else begin
    PgInfoLabel.Caption :=
      'No se detectó una instalación PostgreSQL preparada para MT Cotiza.'#13#10#13#10 +
      'El instalador instalará PostgreSQL local como servicio de Windows:'#13#10 +
      '- Servicio: MTCotizaPostgres'#13#10 +
      '- Puerto: 15434'#13#10 +
      '- Datos: C:\ProgramData\MT Cotiza Client\data'#13#10#13#10 +
      'Este PostgreSQL queda aislado para MT Cotiza y no modifica otras instalaciones.';
  end;
end;
