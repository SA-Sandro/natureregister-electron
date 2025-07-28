import { app, BrowserWindow } from 'electron'

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
  })

  win.loadFile('../index.html')
  win.setMenuBarVisibility(false)
  win.setAutoHideMenuBar(true)
  win.webContents.on('before-input-event', (event, input) => {
    if(input.key === 'Alt'){
      event.preventDefault()
    }
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
