const { app, BrowserWindow, shell, session } = require('electron');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const http = require('http');

const runRoot = path.resolve(__dirname, '..');
const defaultDataRoot = path.join(process.env.ProgramData || runRoot, 'MT Cotiza Client', 'data');
const dataRoot = process.env.MT_COTIZA_DATA_ROOT || defaultDataRoot;
process.env.MT_COTIZA_DATA_ROOT = dataRoot;
const logsDir = path.join(dataRoot, 'logs');
const runLog = path.join(logsDir, 'electron-run.log');
const uiSettingsFile = path.join(dataRoot, 'ui-settings.env');
const activeProfileDir = path.join(dataRoot, 'profile', 'active');
const activeProfileManifest = path.join(activeProfileDir, 'profile.json');
const electronProfileDir = path.join(dataRoot, 'electron-profile');
const defaultAppIcon = path.join(__dirname, 'assets', 'run-app-icon.png');
const defaultSplashLogo = path.join(__dirname, 'assets', 'run-logo.png');
const appUserModelId = 'com.mtcotiza.client';
let runner = null;
let mainWindow = null;

const hasSingleInstanceLock = app.requestSingleInstanceLock();
if (!hasSingleInstanceLock) {
  app.quit();
}

app.setAppUserModelId(appUserModelId);
app.setPath('userData', electronProfileDir);

function readFileValue(filePath, key, fallback) {
  if (!fs.existsSync(filePath)) return fallback;
  const lines = fs.readFileSync(filePath, 'utf8').split(/\r?\n/);
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

function readEnvValue(key, fallback) {
  return readFileValue(path.join(runRoot, '.env'), key, fallback);
}

function readPreferredTheme() {
  const theme = readFileValue(uiSettingsFile, 'THEME', 'system').toLowerCase();
  return ['system', 'light', 'dark'].includes(theme) ? theme : 'system';
}

function resolveProfileAsset(fileName) {
  if (typeof fileName !== 'string' || !fileName || path.basename(fileName) !== fileName) return null;
  const profileBase = path.resolve(activeProfileDir);
  const resolved = path.resolve(activeProfileDir, fileName);
  if (!resolved.startsWith(profileBase + path.sep)) return null;
  return fs.existsSync(resolved) ? resolved : null;
}

function readActiveProfile() {
  try {
    const manifest = JSON.parse(fs.readFileSync(activeProfileManifest, 'utf8'));
    if (manifest?.schemaVersion !== 1 || manifest?.format !== 'mycont360-profile') return null;
    return {
      appIcon: resolveProfileAsset(manifest?.assets?.appIcon),
      splashLogo: resolveProfileAsset(manifest?.assets?.splashLogo)
    };
  } catch {
    return null;
  }
}

function withInitialTheme(url, theme) {
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}initialTheme=${encodeURIComponent(theme)}`;
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

function getLastRunLogLine() {
  if (!fs.existsSync(runLog)) return 'Preparando arranque...';
  const content = fs.readFileSync(runLog, 'utf8');
  const lines = content
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .filter((line) =>
      /^ERROR:\s+/i.test(line) ||
      /^\[\d+\/\d+\]\s+/.test(line) ||
      /^-\s+/.test(line) ||
      /^Bootstrap\s+/i.test(line)
    );
  return lines.length ? lines[lines.length - 1].slice(0, 180) : 'Preparando arranque...';
}

function getLogoDataUri(logoPath) {
  if (!fs.existsSync(logoPath)) return '';
  const mimeTypes = {
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
    '.png': 'image/png'
  };
  const mimeType = mimeTypes[path.extname(logoPath).toLowerCase()] || 'image/png';
  const logo = fs.readFileSync(logoPath).toString('base64');
  return `data:${mimeType};base64,${logo}`;
}

function isNavigationAborted(error) {
  const message = String(error && (error.message || error));
  return error?.errno === -3 || error?.code === 'ERR_ABORTED' || message.includes('(-3)');
}

async function loadApplicationUrl(url) {
  try {
    await mainWindow.loadURL(url);
  } catch (error) {
    if (!isNavigationAborted(error)) throw error;
    await new Promise((resolve) => setTimeout(resolve, 150));
    await mainWindow.loadURL(url);
  }
}

async function createWindow() {
  const activeProfile = readActiveProfile();
  const windowIcon = activeProfile?.appIcon || defaultAppIcon;
  const splashLogo = activeProfile?.splashLogo || defaultSplashLogo;
  const logoDataUri = getLogoDataUri(splashLogo);
  const logPathText = runLog.replace(/\\/g, '\\\\');

  mainWindow = new BrowserWindow({
    width: 1280,
    height: 820,
    minWidth: 1024,
    minHeight: 680,
    title: 'MT Cotiza Client',
    icon: windowIcon,
    autoHideMenuBar: true,
    backgroundColor: '#f5f1e8',
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  await mainWindow.loadURL('data:text/html;charset=utf-8,' + encodeURIComponent(`
    <html>
      <head><title>MT Cotiza Client</title></head>
      <body style="font-family:Segoe UI,Arial,sans-serif;background:#ffffff;margin:0;display:grid;place-items:center;height:100vh;color:#1f2933">
        <main style="text-align:center">
          ${logoDataUri ? `<img src="${logoDataUri}" alt="MT Cotiza" style="display:block;width:480px;max-width:86vw;height:auto;margin:0 auto 30px;object-fit:contain" />` : ""}
          <div style="width:54px;height:54px;border:5px solid #e5e7eb;border-top-color:#1f2937;border-radius:50%;margin:0 auto 22px;animation:spin .85s linear infinite"></div>
          <p style="margin:0;font-size:15px">Iniciando servicios locales...</p>
          <p id="status" style="margin:12px auto 0;max-width:720px;font-size:12px;line-height:1.45;color:#6b7280">Preparando arranque...</p>
          <style>@keyframes spin{to{transform:rotate(360deg)}}</style>
          <p style="margin-top:16px;font-size:12px;color:#9ca3af">Logs: ${logPathText}</p>
          <script>
            window.mtCotizaLauncher.onStatus((message) => {
              const el = document.getElementById('status');
              if (el) el.textContent = message;
            });
          </script>
        </main>
      </body>
    </html>
  `));
}

app.on('second-instance', () => {
  if (!mainWindow) return;
  if (mainWindow.isMinimized()) mainWindow.restore();
  mainWindow.focus();
});

app.whenReady().then(async () => {
  if (!hasSingleInstanceLock) return;
  await session.defaultSession.clearStorageData().catch(() => {});
  await session.defaultSession.clearCache().catch(() => {});
  await createWindow();
  const statusTimer = setInterval(() => {
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.webContents.send('launcher-status', getLastRunLogLine());
    }
  }, 1000);
  const frontPort = readEnvValue('FRONTEND_PORT', '3000');
  const configuredHost = readEnvValue("FRONTEND_HOST", "127.0.0.1");
  const appHost = configuredHost;
  const preferredTheme = readPreferredTheme();
  const loginUrl = withInitialTheme(`http://${appHost}:${frontPort}/login`, preferredTheme);
  const fallbackLoginUrl = withInitialTheme(appHost === '127.0.0.1' ? `http://localhost:${frontPort}/login` : `http://127.0.0.1:${frontPort}/login`, preferredTheme);
  const loginUrls = [loginUrl, fallbackLoginUrl];
  try {
    const readyNow = await waitForAnyUrl(loginUrls, 2000).catch(() => null);
    if (!readyNow) startServices();
    const readyUrl = readyNow || await waitForAnyUrl(loginUrls, 0);
    clearInterval(statusTimer);
    await loadApplicationUrl(readyUrl);
  } catch (err) {
    clearInterval(statusTimer);
    await mainWindow.loadURL('data:text/html;charset=utf-8,' + encodeURIComponent(`
      <html><body style="font-family:Segoe UI,Arial,sans-serif;padding:32px">
        <h1>No se pudo iniciar MT Cotiza Client</h1>
        <p>${String(err.message || err)}</p>
        <p>Revisa <code>%ProgramData%\\MT Cotiza Client\\data\\logs\\electron-run.log</code>.</p>
      </body></html>
    `));
  }
});


app.on('window-all-closed', () => {
  app.quit();
});
