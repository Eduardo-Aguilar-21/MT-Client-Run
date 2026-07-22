#define MyAppName "MT Cotiza Client"
#define MyAppVersion "0.7.0"
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
LicenseFile=LICENSE-MT-COTIZA-CLIENT.txt
SetupIconFile=..\electron\assets\run-app-icon.ico
UninstallDisplayIcon={app}\electron\assets\run-app-icon.ico
CloseApplications=yes
RestartApplications=no

[Files]
Source: "stop-client-processes.ps1"; Flags: dontcopy
Source: "..\*"; DestDir: "{app}"; Flags: ignoreversion recursesubdirs createallsubdirs; Excludes: ".git\*,.env,data\*,backups\*,installer\output\*,runtime\_downloads\*,*.tmp,*.log,*.out.log,*.err.log,standalone.pids.json,installer-account.env,installer-profile.mct"

[InstallDelete]
Type: files; Name: "{userdesktop}\MT Cotiza Client.lnk"
Type: files; Name: "{commondesktop}\MT Cotiza Client.lnk"
Type: files; Name: "{userdesktop}\MT-Cotiza.lnk"
Type: files; Name: "{commondesktop}\MT-Cotiza.lnk"

[Icons]
Name: "{autoprograms}\{#MyAppName}"; Filename: "{app}\electron\dist\electron.exe"; Parameters: """{app}\electron"""; WorkingDir: "{app}"; IconFilename: "{app}\electron\assets\run-app-icon.ico"; AppUserModelID: "com.mtcotiza.client"
Name: "{autodesktop}\{#MyAppName}"; Filename: "{app}\electron\dist\electron.exe"; Parameters: """{app}\electron"""; WorkingDir: "{app}"; IconFilename: "{app}\electron\assets\run-app-icon.ico"; AppUserModelID: "com.mtcotiza.client"; Tasks: desktopicon

[Tasks]
Name: "desktopicon"; Description: "Crear acceso directo en el escritorio"; GroupDescription: "Accesos directos:"; Flags: checkedonce

[Run]
Filename: "{app}\install-client-profile-MT-Cotiza-Client.bat"; WorkingDir: "{app}"; StatusMsg: "Configurando perfil empresarial..."; Flags: runhidden waituntilterminated
Filename: "{app}\install-postgres-service-MT-Cotiza-Client.bat"; WorkingDir: "{app}"; StatusMsg: "Instalando PostgreSQL local como servicio de Windows..."; Flags: runhidden waituntilterminated
Filename: "{app}\install-bootstrap-MT-Cotiza-Client.bat"; WorkingDir: "{app}"; StatusMsg: "Preparando base de datos local por primera vez..."; Flags: runhidden waituntilterminated
Filename: "{sys}\wscript.exe"; Parameters: """{app}\start-MT-Cotiza-Client-Services-Silent.vbs"""; WorkingDir: "{app}"; StatusMsg: "Precalentando servicios locales..."; Flags: runhidden nowait
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
  DataModePage: TInputOptionWizardPage;
  ThemePage: TInputOptionWizardPage;
  ProfilePage: TInputFileWizardPage;
  AccountPage: TInputQueryWizardPage;
  PgInfoPage: TWizardPage;
  PgInfoLabel: TNewStaticText;

function SelectedTheme(): String;
begin
  case ThemePage.SelectedValueIndex of
    1: Result := 'light';
    2: Result := 'dark';
  else
    Result := 'system';
  end;
end;

procedure SaveThemePreference();
var
  SettingsDir: String;
  SettingsFile: String;
begin
  SettingsDir := ExpandConstant('{commonappdata}\MT Cotiza Client\data');
  SettingsFile := SettingsDir + '\ui-settings.env';
  ForceDirectories(SettingsDir);
  SaveStringToFile(SettingsFile, 'THEME=' + SelectedTheme() + #13#10, False);
end;

procedure SaveProfileBootstrap();
var
  SelectedFile: String;
  InstallerFile: String;
begin
  ForceDirectories(ExpandConstant('{app}'));
  InstallerFile := ExpandConstant('{app}\installer-profile.mct');
  DeleteFile(InstallerFile);
  SelectedFile := Trim(ProfilePage.Values[0]);
  if SelectedFile = '' then
    exit;
  if not FileCopy(SelectedFile, InstallerFile, False) then
    MsgBox('No se pudo copiar el perfil seleccionado. Se usará el perfil general de Mycont360.', mbError, MB_OK);
end;

function HasConfiguredBaseAccount(): Boolean;
begin
  Result := FileExists(ExpandConstant('{commonappdata}\MT Cotiza Client\data\base-account-v2.done'));
end;

function HasExistingLocalData(): Boolean;
begin
  Result := DirExists(ExpandConstant('{commonappdata}\MT Cotiza Client\data'));
end;

function WantsFreshInstall(): Boolean;
begin
  Result := HasExistingLocalData() and (DataModePage.SelectedValueIndex = 1);
end;

function IsValidUsername(Value: String): Boolean;
var
  I: Integer;
begin
  Result := (Length(Value) >= 3) and (Length(Value) <= 40);
  if not Result then
    exit;

  for I := 1 to Length(Value) do begin
    if Pos(Value[I], 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789._-') = 0 then begin
      Result := False;
      exit;
    end;
  end;
end;

procedure SaveAccountBootstrap();
var
  AccountFile: String;
  AccountContent: String;
  ResultCode: Integer;
begin
  AccountFile := ExpandConstant('{app}\installer-account.env');
  ForceDirectories(ExpandConstant('{app}'));
  DeleteFile(AccountFile);
  if HasConfiguredBaseAccount() then
    exit;

  AccountContent :=
    'MT_COTIZA_BASE_ACCOUNT_FULL_NAME=' + Trim(AccountPage.Values[0]) + #13#10 +
    'MT_COTIZA_BASE_ACCOUNT_USERNAME=' + Lowercase(Trim(AccountPage.Values[1])) + #13#10 +
    'MT_COTIZA_BASE_ACCOUNT_PASSWORD=' + AccountPage.Values[2] + #13#10;
  SaveStringToFile(AccountFile, AccountContent, False);
  Exec(
    ExpandConstant('{cmd}'),
    '/c icacls "' + AccountFile + '" /inheritance:r /grant:r *S-1-5-18:F *S-1-5-32-544:F >nul',
    '',
    SW_HIDE,
    ewWaitUntilTerminated,
    ResultCode
  );
end;

function DetectExistingPostgres(): Boolean;
var
  ResultCode: Integer;
begin
  Result := Exec(ExpandConstant('{cmd}'), '/c sc query state= all | findstr /I "postgresql postgres"', '', SW_HIDE, ewWaitUntilTerminated, ResultCode) and (ResultCode = 0);
end;

function MTCotizaServiceExists(): Boolean;
var
  ResultCode: Integer;
begin
  Result := Exec(ExpandConstant('{cmd}'), '/c sc query MTCotizaPostgres >nul 2>nul', '', SW_HIDE, ewWaitUntilTerminated, ResultCode) and (ResultCode = 0);
end;

function MTCotizaServiceStopped(): Boolean;
var
  ResultCode: Integer;
begin
  if not MTCotizaServiceExists() then begin
    Result := True;
    exit;
  end;

  Result := Exec(ExpandConstant('{cmd}'), '/c sc query MTCotizaPostgres | findstr /I "STOPPED" >nul', '', SW_HIDE, ewWaitUntilTerminated, ResultCode) and (ResultCode = 0);
end;

function PrepareToInstall(var NeedsRestart: Boolean): String;
var
  I: Integer;
  ResultCode: Integer;
  StopArguments: String;
begin
  Result := '';

  ExtractTemporaryFile('stop-client-processes.ps1');
  StopArguments :=
    '-NoProfile -ExecutionPolicy Bypass -File "' + ExpandConstant('{tmp}\stop-client-processes.ps1') +
    '" -InstallRoot "' + ExpandConstant('{app}') + '"';
  if WantsFreshInstall() then
    StopArguments := StopArguments +
      ' -ResetData -DataRoot "' + ExpandConstant('{commonappdata}\MT Cotiza Client\data') + '"';
  if not Exec(
    ExpandConstant('{sys}\WindowsPowerShell\v1.0\powershell.exe'),
    StopArguments,
    '',
    SW_HIDE,
    ewWaitUntilTerminated,
    ResultCode
  ) or (ResultCode <> 0) then begin
    Result := 'No se pudieron detener los procesos anteriores de MT Cotiza. Cierra la aplicacion y vuelve a intentar.';
    exit;
  end;

  if not MTCotizaServiceExists() then
    exit;

  Exec(ExpandConstant('{cmd}'), '/c sc stop MTCotizaPostgres >nul 2>nul', '', SW_HIDE, ewWaitUntilTerminated, ResultCode);
  for I := 1 to 40 do begin
    if MTCotizaServiceStopped() then
      exit;
    Sleep(500);
  end;

  Result := 'No se pudo detener el servicio MTCotizaPostgres. Reinicia Windows y vuelve a ejecutar el instalador.';
end;

procedure InitializeWizard();
begin
  DataModePage := CreateInputOptionPage(
    wpLicense,
    'Datos locales existentes',
    'Elige cómo debe tratar Mycont360 la información de una instalación anterior.',
    'Conservar es la opción segura para actualizar. Instalar desde cero elimina permanentemente la base de datos, cuentas, archivos subidos, logs y perfil empresarial.',
    True,
    False
  );
  DataModePage.Add('Usar y conservar los datos existentes (recomendado)');
  DataModePage.Add('Instalar desde cero y eliminar todos los datos anteriores');
  DataModePage.SelectedValueIndex := 0;

  ThemePage := CreateInputOptionPage(
    DataModePage.ID,
    'Apariencia inicial',
    'Selecciona el modo de color que utilizará MT Cotiza Client.',
    'Esta preferencia se aplicará cuando abras la aplicación. Podrás cambiarla después desde MT Cotiza.',
    True,
    False
  );
  ThemePage.Add('Modo predeterminado (usar la configuración de Windows)');
  ThemePage.Add('Claro');
  ThemePage.Add('Oscuro');
  ThemePage.SelectedValueIndex := 0;

  ProfilePage := CreateInputFilePage(
    ThemePage.ID,
    'Perfil empresarial',
    'Selecciona la personalización de esta empresa.',
    'El archivo .mct es opcional. Sin uno, Mycont360 usará su perfil general. En una actualización, dejarlo vacío conserva el perfil instalado.'
  );
  ProfilePage.Add('Archivo de perfil (.mct):', 'Perfil Mycont360 (*.mct)|*.mct', 'mct');

  AccountPage := CreateInputQueryPage(
    ProfilePage.ID,
    'Cuenta administradora inicial',
    'Crea el usuario principal de esta instalación.',
    'Estas credenciales serán necesarias para ingresar a MT Cotiza. Guárdalas en un lugar seguro.'
  );
  AccountPage.Add('Nombre completo:', False);
  AccountPage.Add('Usuario:', False);
  AccountPage.Add('Contraseña:', True);
  AccountPage.Add('Confirmar contraseña:', True);

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

function ShouldSkipPage(PageID: Integer): Boolean;
begin
  Result :=
    ((PageID = DataModePage.ID) and not HasExistingLocalData()) or
    ((PageID = AccountPage.ID) and HasConfiguredBaseAccount() and not WantsFreshInstall());
end;

function NextButtonClick(CurPageID: Integer): Boolean;
var
  FullName: String;
  Username: String;
  Password: String;
begin
  Result := True;
  if CurPageID = DataModePage.ID then begin
    if DataModePage.SelectedValueIndex = 1 then begin
      Result := MsgBox(
        'Se eliminarán permanentemente la base de datos, todas las cuentas, archivos subidos, logs y el perfil empresarial de esta instalación.'#13#10#13#10 +
        '¿Confirmas que deseas instalar desde cero?',
        mbConfirmation,
        MB_YESNO
      ) = IDYES;
    end;
    exit;
  end;
  if CurPageID = ProfilePage.ID then begin
    if Trim(ProfilePage.Values[0]) = '' then
      exit;
    if not FileExists(ProfilePage.Values[0]) then begin
      MsgBox('No se encuentra el archivo de perfil seleccionado.', mbError, MB_OK);
      Result := False;
      exit;
    end;
    if CompareText(ExtractFileExt(ProfilePage.Values[0]), '.mct') <> 0 then begin
      MsgBox('Selecciona un archivo de perfil Mycont360 con extensión .mct.', mbError, MB_OK);
      Result := False;
      exit;
    end;
    exit;
  end;
  if CurPageID <> AccountPage.ID then
    exit;

  FullName := Trim(AccountPage.Values[0]);
  Username := Trim(AccountPage.Values[1]);
  Password := AccountPage.Values[2];

  if Length(FullName) < 3 then begin
    MsgBox('Ingresa el nombre completo del administrador.', mbError, MB_OK);
    Result := False;
    exit;
  end;

  if not IsValidUsername(Username) then begin
    MsgBox('El usuario debe tener entre 3 y 40 caracteres y usar solo letras, números, punto, guion o guion bajo.', mbError, MB_OK);
    Result := False;
    exit;
  end;

  if (Length(Password) < 8) or (Length(Password) > 64) then begin
    MsgBox('La contraseña debe tener entre 8 y 64 caracteres.', mbError, MB_OK);
    Result := False;
    exit;
  end;

  if Password <> AccountPage.Values[3] then begin
    MsgBox('Las contraseñas no coinciden.', mbError, MB_OK);
    Result := False;
    exit;
  end;
end;

procedure CurStepChanged(CurStep: TSetupStep);
begin
  if CurStep = ssInstall then begin
    SaveThemePreference();
    SaveProfileBootstrap();
    SaveAccountBootstrap();
  end;
end;

procedure DeinitializeSetup();
begin
  { El bootstrap elimina este archivo al consumirlo. Esta limpieza cubre
    cancelaciones o fallos de instalacion para no dejar la clave en disco. }
  DeleteFile(ExpandConstant('{app}\installer-account.env'));
  DeleteFile(ExpandConstant('{app}\installer-profile.mct'));
end;
