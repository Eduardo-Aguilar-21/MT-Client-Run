const { app, BrowserWindow, shell } = require('electron');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const http = require('http');

const runRoot = path.resolve(__dirname, '..');
const logsDir = path.join(runRoot, 'data', 'logs');
const runLog = path.join(logsDir, 'electron-run.log');
let runner = null;
let mainWindow = null;

function readEnvValue(key, fallback) {
  const envFile = path.join(runRoot, '.env');
  if (!fs.existsSync(envFile)) return fallback;
  const lines = fs.readFileSync(envFile, 'utf8').split(/\r?\n/);
  for (const raw of lines) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;
    const eq = line.indexOf('=');
    if (eq < 0) continue;
    const name = line.slice(0, eq).trim().toLowerCase();
    const value = line.slice(eq + 1).trim();
    if (name === key.toLowerCase() && value) return value;
  }
  return fallback;
}

function waitForUrl(url, timeoutMs = 90000) {
  const started = Date.now();
  return new Promise((resolve, reject) => {
    const tick = () => {
      const req = http.get(url, (res) => {
        res.resume();
        if (res.statusCode >= 200 && res.statusCode < 500) resolve(true);
        else retry();
      });
      req.setTimeout(1500, () => {
        req.destroy();
        retry();
      });
      req.on('error', retry);
    };
    const retry = () => {
      if (Date.now() - started > timeoutMs) reject(new Error(`No respondio ${url}`));
      else setTimeout(tick, 1000);
    };
    tick();
  });
}

function startServices() {
  fs.mkdirSync(logsDir, { recursive: true });
  const ps1 = path.join(runRoot, 'MT-Cotiza-Client-Run.ps1');
  const out = fs.openSync(runLog, 'a');
  runner = spawn('powershell.exe', [
    '-NoProfile',
    '-ExecutionPolicy', 'Bypass',
    '-WindowStyle', 'Hidden',
    '-File', ps1,
    '-NoBrowser'
  ], {
    cwd: runRoot,
    detached: false,
    windowsHide: true,
    stdio: ['ignore', out, out]
  });
  runner.on('exit', (code) => {
    if (code && mainWindow) {
      mainWindow.webContents.send('launcher-status', `El launcher termino con codigo ${code}. Revisa data/logs/electron-run.log`);
    }
  });
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 820,
    minWidth: 1024,
    minHeight: 680,
    title: 'MT Cotiza Client',
    autoHideMenuBar: true,
    backgroundColor: '#f5f1e8',
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  mainWindow.loadURL('data:text/html;charset=utf-8,' + encodeURIComponent(`
    <html>
      <head><title>MT Cotiza Client</title></head>
      <body style="font-family:Segoe UI,Arial,sans-serif;background:#ffffff;margin:0;display:grid;place-items:center;height:100vh;color:#1f2933">
        <main style="text-align:center">
          <div style="width:54px;height:54px;border:5px solid #e5e7eb;border-top-color:#1f2937;border-radius:50%;margin:0 auto 22px;animation:spin .85s linear infinite"></div>
          <h1 style="margin:0 0 10px;font-size:28px">MT Cotiza Client</h1>
          <p style="margin:0;font-size:15px">Iniciando servicios locales...</p>
          <style>@keyframes spin{to{transform:rotate(360deg)}}</style>
          <p style="margin-top:16px;font-size:12px;color:#6b7280">Logs: data\\logs\\electron-run.log</p>
        </main>
      </body>
    </html>
  `));
}

app.whenReady().then(async () => {
  createWindow();
  const frontPort = readEnvValue('FRONTEND_PORT', '3000');
  const appHost = readEnvValue("FRONTEND_HOST", "localhost");
  const loginUrl = `http://${appHost}:${frontPort}/login`;
  try {
    await waitForUrl(loginUrl, 2000).catch(() => {
      startServices();
      return waitForUrl(loginUrl, 120000);
    });
    await mainWindow.loadURL(loginUrl);
  } catch (err) {
    await mainWindow.loadURL('data:text/html;charset=utf-8,' + encodeURIComponent(`
      <html><body style="font-family:Segoe UI,Arial,sans-serif;padding:32px">
        <h1>No se pudo iniciar MT Cotiza Client</h1>
        <p>${String(err.message || err)}</p>
        <p>Revisa <code>data\\logs\\electron-run.log</code>.</p>
      </body></html>
    `));
  }
});

app.on('window-all-closed', () => {
  app.quit();
});
