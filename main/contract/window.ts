import { WebPreferences } from "electron/main";

export interface Config {
    menuBar: boolean,
    maximize: boolean,
    entry: string
}

export default abstract class WindowManager {

    protected abstract browserWindow: Electron.BrowserWindow;

    protected abstract webPreferences : WebPreferences;

    protected abstract config: Config;

    protected abstract createWindow(preloadEntry: string): void;

    protected abstract loadWindow(): void;

    protected abstract registerHandlers(): void;
}