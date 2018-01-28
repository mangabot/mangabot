import { app, BrowserWindow, screen, ipcMain, dialog } from 'electron';
import * as path from 'path';
const { download } = require('electron-dl');

let win, serve;
const args = process.argv.slice(1);
serve = args.some(val => val === '--serve');
import * as url from 'url';

if (serve) {
  require('electron-reload')(__dirname, {
  });
}

require('electron-dl')();

function createWindow() {

  const electronScreen = screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.
  win = new BrowserWindow({
    x: 0,
    y: 0,
    width: size.width - 100,
    height: size.height - 100,
    webPreferences: {
      webSecurity: false
    }
  });

  // and load the index.html of the app.
  win.loadURL(url.format({
    protocol: 'file:',
    pathname: path.join(__dirname, '/index.html'),
    slashes: true
  }));

  // Open the DevTools.
  if (serve) {
    win.webContents.openDevTools();
  }

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });

  // Download
  win.webContents.session.on('will-download', (event, item, webContents) => {
    let savePath = item.getSavePath();
    console.log("Save path: " + savePath);

    // Set the save path, making Electron not to prompt a save dialog.
    item.setSavePath('d:/save.jpg')

    item.on('updated', (event, state) => {
      if (state === 'interrupted') {
        console.log('Download is interrupted but can be resumed')
      } else if (state === 'progressing') {
        if (item.isPaused()) {
          console.log('Download is paused')
        } else {
          console.log(`Received bytes: ${item.getReceivedBytes()}`)
        }
      }
    })
    item.once('done', (event, state) => {
      if (state === 'completed') {
        console.log('Download successfully')
      } else {
        console.log(`Download failed: ${state}`)
      }
    })
  })
}

try {

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', createWindow);

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });

} catch (e) {
  // Catch Error
  // throw e;
}

// Register event listeners
ipcMain.on('download-file-message', (event, args) => {
  console.log(args)  // prints "ping"
  event.sender.send('download-file-reply', 'pong');

  var folderPaths = dialog.showOpenDialog({ properties: ['openDirectory'] });
  console.log(folderPaths);

  if (folderPaths.length > 0) {
    download(BrowserWindow.getFocusedWindow(), args.url, {
      directory: folderPaths[0],
      filename: args.fileName
    })
      .then(dl => console.log(dl.getSavePath()))
      .catch(console.error);
  }
})