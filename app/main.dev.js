/* eslint global-require: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `yarn build` or `yarn build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 *
 * @flow
 */
import {
  app,
  BrowserWindow,
  globalShortcut
} from 'electron';
import {
  autoUpdater
} from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';
import ioHook from 'iohook';
// const ioHook = require('iohook');

export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

  return Promise.all(
    extensions.map(name => installer.default(installer[name], forceDownload))
  ).catch(console.log);
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', async () => {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    await installExtensions();
  }

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728
  });

  mainWindow.loadURL(`file://${__dirname}/app.html`);

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
      mainWindow.focus();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  let keys = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Z', 'X', 'C', 'V', 'B', 'N', 'M'];
  // Register a 'CommandOrControl+X' shortcut listener.
  const ret = globalShortcut.register('A',
    (e) => {
      console.log('Keystoke');
      console.log(e);
    })

  if (!ret) {
    console.log('registration failed');
  }

  // Check whether a shortcut is registered.
  console.log(globalShortcut.isRegistered('CommandOrControl+X'));



  mainWindow.hookWindowMessage(Number.parseInt('0x0112'), (wParam, lParam) => {
    // Hook WM_SYSCOMMAND
    let eventName = null;
    if (wParam.readUInt32LE(0) == 0xF060) { //SC_CLOSE
      eventName = 'close';
    } else if (wParam.readUInt32LE(0) == 0xF030) { //SC_MAXIMIZE
      eventName = 'maximize'
    } else if (wParam.readUInt32LE(0) == 0xF020) { //SC_MINIMIZE
      eventName = 'minimize'
    } else if (wParam.readUInt32LE(0) == 0xF120) { //SC_RESTORE
      eventName = 'restored'
    }
    if (eventName != null) {
      console.log("WINDOWS " + (eventName));
    }
  });
  mainWindow.hookWindowMessage(Number.parseInt('0x0100'), (wParam, lParam) => {
    // Hook WM_KEYDOWN
    let eventName = null;
    let code = wParam.readUInt32LE(0);
    switch (code) {
      case 0x41:
      case 0x42:
      case 0x43:
      case 0x44:
      case 0x45:
        eventName = 'Keystroke';
        break;
    }
    if (wParam.readUInt32LE(0) == 0x41) { // A
      eventName = 'A';
    } else if (wParam.readUInt32LE(0) == 0xF030) { //SC_MAXIMIZE
      eventName = 'maximize'
    } else if (wParam.readUInt32LE(0) == 0xF020) { //SC_MINIMIZE
      eventName = 'minimize'
    } else if (wParam.readUInt32LE(0) == 0xF120) { //SC_RESTORE
      eventName = 'restored'
    }
    if (eventName != null) {
      console.log("WINDOWS " + (eventName));
    }
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
});

app.on('will-quit', () => {
  // Unregister a shortcut.
  globalShortcut.unregister('CommandOrControl+X');

  // Unregister all shortcuts.
  globalShortcut.unregisterAll();
})




ioHook.on('keydown', event => {
  console.log(event); // { type: 'mousemove', x: 700, y: 400 }
});

// Register and start hook
ioHook.start();

// Alternatively, pass true to start in DEBUG mode.
ioHook.start(true);
1
