import { app, BrowserWindow } from 'electron';
import path from 'path';
import icon from '../../assets/icon/icon.png';
import WindowManager, { BrowserConfig, Config } from '../contract/services/window';

export default class $WindowManager extends WindowManager {
  protected browserWindow!: Electron.BrowserWindow;

  protected browserConfig = {
    devTools: false,
    nodeIntegration: false,
    contextIsolation: true,
    enableRemoteModule: false,
    preloadEntry: "",
  }

  protected config = {
    menuBar: false,
    devtools: false,
    maximize: true,
    entry: ""
  }

  constructor(
    config: Partial<Config> = {},
    browserConfig: Partial<BrowserConfig> = {}
  ) {
    super(config, browserConfig);   
    this.createWindow();
    this.loadWindow();
    this.registerHandlers();
  }

  createWindow() {
    this.browserWindow = new BrowserWindow({
      icon: path.resolve(__dirname, icon),
      webPreferences: {
        ...this.browserConfig
      }
    })
  }

  loadWindow() {
    this.browserWindow.loadURL(this.config.entry);
    this.browserWindow.menuBarVisible = this.config.menuBar;
    if (this.config.maximize)
      this.browserWindow.maximize();
    if (this.config.devtools)
      this.browserWindow.webContents.openDevTools()
  }

  registerHandlers() {
    // Quit when all windows are closed, except on macOS.
    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        app.quit()
      }
    })
    // This method will be called when Electron has finished initialization
    app.on('ready', this.createWindow);

    app.on('activate', () => {
      // re-create a window on dock icon is clicked On OS X
      if (BrowserWindow.getAllWindows().length === 0) {
        this.createWindow();
      }
    })
  }
}




