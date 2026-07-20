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
DefaultDirName={localappdata}\Programs\MT Cotiza Client
DefaultGroupName={#MyAppName}
DisableDirPage=yes
DisableProgramGroupPage=yes
PrivilegesRequired=lowest
OutputDir=output
OutputBaseFilename=MT-Cotiza-Client-Setup-{#MyAppVersion}
Compression=lzma2
SolidCompression=yes
WizardStyle=modern
UninstallDisplayIcon={app}\electron\dist\electron.exe
CloseApplications=yes
RestartApplications=no

[Files]
Source: "..\*"; DestDir: "{app}"; Flags: ignoreversion recursesubdirs createallsubdirs; Excludes: ".git\*,data\*,backups\*,installer\output\*,runtime\_downloads\*,*.tmp,*.log,*.out.log,*.err.log,standalone.pids.json"

[Icons]
Name: "{autoprograms}\{#MyAppName}"; Filename: "{app}\electron\dist\electron.exe"; Parameters: """{app}\electron"""; WorkingDir: "{app}"; IconFilename: "{app}\electron\dist\electron.exe"
Name: "{autodesktop}\{#MyAppName}"; Filename: "{app}\electron\dist\electron.exe"; Parameters: """{app}\electron"""; WorkingDir: "{app}"; IconFilename: "{app}\electron\dist\electron.exe"; Tasks: desktopicon

[Tasks]
Name: "desktopicon"; Description: "Crear acceso directo en el escritorio"; GroupDescription: "Accesos directos:"; Flags: checkedonce

[Run]
Filename: "{app}\electron\dist\electron.exe"; Parameters: """{app}\electron"""; WorkingDir: "{app}"; Description: "Abrir {#MyAppName}"; Flags: nowait postinstall skipifsilent

[UninstallDelete]
Type: filesandordirs; Name: "{app}\data"
Type: filesandordirs; Name: "{app}\backups"
