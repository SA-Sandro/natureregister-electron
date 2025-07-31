import { app, BrowserWindow } from 'electron'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const isDev = process.env.NODE_ENV === 'development' || true

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: false,
    },
  })

  if (isDev) {
    win.loadURL('http://localhost:5173/')
    win.webContents.openDevTools()
  } else {
    win.loadFile('dist/index.html')
  }

  win.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
    console.error('Failed to load:', errorCode, errorDescription)
  })
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

process.on('SIGINT', () => {
  console.log('Received SIGINT, gracefully shutting down')
  app.quit()
})

process.on('SIGTERM', () => {
  console.log('Received SIGTERM, gracefully shutting down')
  app.quit()
})
