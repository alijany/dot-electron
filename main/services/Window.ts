import { app, BrowserWindow } from 'electron';
import { WebPreferences } from 'electron/main';
import path from 'path';
import icon from '../../assets/icon/icon.png';
import WindowManager, { Config } from '../contract/window';

export default class $WindowManager extends WindowManager {
  protected browserWindow!: BrowserWindow;

  protected webPreferences = {
    devTools: true,
    nodeIntegration: false,
    contextIsolation: true,
    enableRemoteModule: false,
    preload: "",
  };

  protected config = {
    menuBar: true,
    maximize: true,
    entry: ""
  }

  constructor(
    config: Partial<Config> = {},
    webPreferences: Partial<WebPreferences> = {}
  ) {
    super();
    this.mergeConfig(config, webPreferences);
    this.createWindow();
    this.loadWindow();
    this.registerHandlers();
  }


  private mergeConfig(
    config: Partial<Config> = {},
    webPreferences: WebPreferences = {}
  ) {
    this.config = { ...this.config, ...config };
    this.webPreferences = { ...this.webPreferences, ...webPreferences };
  }

  createWindow() {
    this.browserWindow = new BrowserWindow({
      icon: path.resolve(__dirname, icon),
      webPreferences: {
        ...this.webPreferences
      }
    })
  }

  loadWindow() {
    this.browserWindow.loadURL(this.config.entry);
    this.browserWindow.menuBarVisible = this.config.menuBar;
    if (this.config.maximize)
      this.browserWindow.maximize();
    if (this.webPreferences.devTools)
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




