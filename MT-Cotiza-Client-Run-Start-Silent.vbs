Option Explicit

Dim fso, scriptDir, shell, frontPort, frontUrl, runProcess, i, req, statusCode, logsDir, runLog

Set fso = CreateObject("Scripting.FileSystemObject")
Set shell = CreateObject("WScript.Shell")

' Carpeta donde vive este launcher
scriptDir = fso.GetParentFolderName(WScript.ScriptFullName)
shell.CurrentDirectory = scriptDir

' Lee el puerto del front desde .env (si existe) para abrir la URL correcta
frontPort = ReadEnvValue("FRONTEND_PORT", "3000")
frontUrl = "http://localhost:" & frontPort

' Prepara logs del launcher silencioso
logsDir = scriptDir & "\data\logs"
If Not fso.FolderExists(scriptDir & "\data") Then fso.CreateFolder(scriptDir & "\data")
If Not fso.FolderExists(logsDir) Then fso.CreateFolder(logsDir)
runLog = logsDir & "\run.log"

' Arranca el runner sin consola y sin esperar. stdout/stderr quedan en data\logs\run.log
runProcess = "cmd.exe /c powershell.exe -NoProfile -ExecutionPolicy Bypass -NoLogo -WindowStyle Hidden -File " & Chr(34) & scriptDir & "\MT-Cotiza-Client-Run.ps1" & Chr(34) & " > " & Chr(34) & runLog & Chr(34) & " 2>&1"
shell.Run runProcess, 0, False

' Espera a que el frontend responda y abre navegador
For i = 1 To 180
    statusCode = GetHttpStatus(frontUrl)
    If statusCode >= 200 And statusCode < 500 Then
        shell.Run "cmd /c start """" """ & frontUrl & """", 0, False
        WScript.Quit 0
    End If
    WScript.Sleep 1000
Next

Function ReadEnvValue(ByVal key, ByVal defaultValue)
  Dim envFile, line, eqPos, name, value
  Dim ts
  ReadEnvValue = defaultValue

  On Error Resume Next
  envFile = scriptDir & "\.env"
  If Not fso.FileExists(envFile) Then
    ReadEnvValue = defaultValue
    Exit Function
  End If

  Set ts = fso.OpenTextFile(envFile, 1)
  Do Until ts.AtEndOfStream
    line = Trim(ts.ReadLine)
    If Len(line) > 0 And Left(line, 1) <> "#" Then
      eqPos = InStr(line, "=")
      If eqPos > 0 Then
        name = Trim(Left(line, eqPos - 1))
        value = Trim(Mid(line, eqPos + 1))
        If LCase(name) = LCase(key) Then
          If Len(value) > 0 Then
            ReadEnvValue = value
          End If
          ts.Close
          Exit Do
        End If
      End If
    End If
  Loop
  ts.Close
End Function

Function GetHttpStatus(ByVal url)
  On Error Resume Next
  Set req = CreateObject("WinHttp.WinHttpRequest.5.1")
  req.Open "GET", url, False
  req.Send
  GetHttpStatus = req.Status
End Function
