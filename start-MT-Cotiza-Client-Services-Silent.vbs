Option Explicit

Dim fso, shell, runRoot, dataRoot, logsDir, runLog, command
Set fso = CreateObject("Scripting.FileSystemObject")
Set shell = CreateObject("WScript.Shell")

runRoot = fso.GetParentFolderName(WScript.ScriptFullName)
dataRoot = shell.ExpandEnvironmentStrings("%ProgramData%") & "\MT Cotiza Client\data"
logsDir = dataRoot & "\logs"
runLog = logsDir & "\startup-services.log"

If Not fso.FolderExists(dataRoot) Then fso.CreateFolder(dataRoot)
If Not fso.FolderExists(logsDir) Then fso.CreateFolder(logsDir)

shell.CurrentDirectory = runRoot
command = "cmd.exe /c powershell.exe -NoProfile -ExecutionPolicy Bypass -NoLogo -WindowStyle Hidden -File " & _
  Chr(34) & runRoot & "\MT-Cotiza-Client-Run.ps1" & Chr(34) & " -NoBrowser >> " & _
  Chr(34) & runLog & Chr(34) & " 2>&1"
shell.Run command, 0, False
