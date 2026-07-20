const { app, BrowserWindow, shell, session } = require('electron');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const http = require('http');

const runRoot = path.resolve(__dirname, '..');
const logsDir = path.join(runRoot, 'data', 'logs');
const runLog = path.join(logsDir, 'electron-run.log');
const electronProfileDir = path.join(runRoot, 'data', 'electron-profile');
let runner = null;
let mainWindow = null;

app.setPath('userData', electronProfileDir);

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

function waitForAnyUrl(urls, timeoutMs = 0) {
  const started = Date.now();
  let lastError = '';
  return new Promise((resolve, reject) => {
    const tick = () => {
      let pending = urls.length;
      const retry = (message) => {
        if (message) lastError = message;
        pending -= 1;
        if (pending > 0) return;
        if (timeoutMs > 0 && Date.now() - started > timeoutMs) {
          reject(new Error(`No respondio ${urls.join(' ni ')}${lastError ? ` (${lastError})` : ''}`));
          return;
        }
        setTimeout(tick, 1000);
      };

      for (const url of urls) {
        const req = http.get(url, (res) => {
          res.resume();
          if (res.statusCode >= 200 && res.statusCode < 500) resolve(url);
          else retry(`HTTP ${res.statusCode}`);
        });
        req.setTimeout(1500, () => {
          req.destroy();
          retry('timeout');
        });
        req.on('error', (err) => {
          retry(err && err.message ? err.message : 'connection error');
        });
      }
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

function getLogoDataUri() {
  const logoPath = path.join(__dirname, 'assets', 'run-logo.png');
  if (!fs.existsSync(logoPath)) return '';
  const logo = fs.readFileSync(logoPath).toString('base64');
  return `data:image/png;base64,${logo}`;
}

function createWindow() {
  const logoDataUri = getLogoDataUri();

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
          ${logoDataUri ? `<img src="${logoDataUri}" alt="MT Cotiza" style="display:block;width:480px;max-width:86vw;height:auto;margin:0 auto 30px;object-fit:contain" />` : ""}
          <div style="width:54px;height:54px;border:5px solid #e5e7eb;border-top-color:#1f2937;border-radius:50%;margin:0 auto 22px;animation:spin .85s linear infinite"></div>
          <p style="margin:0;font-size:15px">Iniciando servicios locales...</p>
          <style>@keyframes spin{to{transform:rotate(360deg)}}</style>
          <p style="margin-top:16px;font-size:12px;color:#6b7280">Logs: data\\logs\\electron-run.log</p>
        </main>
      </body>
    </html>
  `));
}

app.whenReady().then(async () => {
  await session.defaultSession.clearStorageData().catch(() => {});
  await session.defaultSession.clearCache().catch(() => {});
  createWindow();
  const frontPort = readEnvValue('FRONTEND_PORT', '3000');
  const configuredHost = readEnvValue("FRONTEND_HOST", "127.0.0.1");
  const appHost = configuredHost === 'localhost' ? '127.0.0.1' : configuredHost;
  const loginUrl = `http://${appHost}:${frontPort}/login`;
  const fallbackLoginUrl = appHost === '127.0.0.1' ? `http://localhost:${frontPort}/login` : `http://127.0.0.1:${frontPort}/login`;
  const loginUrls = [loginUrl, fallbackLoginUrl];
  try {
    const readyNow = await waitForAnyUrl(loginUrls, 2000).catch(() => null);
    if (!readyNow) startServices();
    const readyUrl = readyNow || await waitForAnyUrl(loginUrls, 0);
    await mainWindow.loadURL(readyUrl);
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
