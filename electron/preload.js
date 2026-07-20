const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('mtCotizaLauncher', {
  onStatus(callback) {
    ipcRenderer.on('launcher-status', (_event, message) => callback(message));
  }
});
