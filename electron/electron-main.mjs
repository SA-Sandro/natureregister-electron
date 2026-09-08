import { app, BrowserWindow, dialog, ipcMain } from 'electron';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';
import { runPrismaMigrations } from './run-prisma-migrations.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isDev = process.env.NODE_ENV === 'development';
let backend;
let isQuitting = false;
const applicationRoot = app.isPackaged ? process.resourcesPath : path.join(__dirname, '..');

app.setName('Nature Register');
app.setAppUserModelId('com.natureregister.app');

const startBackend = async () => {
  const databasePath = path.join(app.getPath('userData'), 'observations.db');
  const databaseUrl = `file:${databasePath.replaceAll('\\', '/')}`;
  process.env.DATABASE_URL = databaseUrl;

  const serverEntryPath = path.join(applicationRoot, 'server-dist', 'server-entry.js');
  const schemaPath = path.join(applicationRoot, 'server-dist', 'schema.prisma');
  await runPrismaMigrations({ databaseUrl, schemaPath });
  const { serverPromise } = await import(pathToFileURL(serverEntryPath).href);
  backend = await serverPromise;
};

const createWindow = () => {
  const iconDirectory = isDev ? 'public' : 'dist';

  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    icon: path.join(__dirname, '..', iconDirectory, 'logo_nt.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: false,
    },
  });

  if (isDev) {
    win.loadURL('http://localhost:5173/');
    win.webContents.openDevTools();
  } else {
    win.loadFile(path.join(__dirname, '..', 'dist', 'index.html'));
  }

  win.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
    console.error('Failed to load:', errorCode, errorDescription);
  });
  win.webContents.on('render-process-gone', (event, details) => {
    console.error('Renderer process exited:', details.reason, details.exitCode);
  });
  win.webContents.on('console-message', (event, level, message, line, sourceId) => {
    console.log(`Renderer console [${level}] ${sourceId}:${line} ${message}`);
  });
  win.on('closed', () => {
    console.log('Application window closed');
  });
};

app
  .whenReady()
  .then(async () => {
    if (!isDev) {
      await startBackend();
    }

    createWindow();

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
      }
    });
  })
  .catch((error) => {
    console.error('Failed to start application', error);
    dialog.showErrorBox(
      'Application startup failed',
      error instanceof Error ? error.message : String(error),
    );
    app.quit();
  });

app.on('before-quit', (event) => {
  if (!backend || isQuitting) return;

  event.preventDefault();
  isQuitting = true;
  backend.close().finally(() => app.quit());
});

app.on('window-all-closed', () => {
  console.log('All application windows closed');
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

process.on('SIGINT', () => {
  console.log('Received SIGINT, gracefully shutting down');
  app.quit();
});

process.on('SIGTERM', () => {
  console.log('Received SIGTERM, gracefully shutting down');
  app.quit();
});

ipcMain.handle('select-folder', async () => {
  const result = await dialog.showOpenDialog({ properties: ['openDirectory'] });
  if (result.canceled || result.filePaths.length === 0) return null;
  return result.filePaths[0];
});
