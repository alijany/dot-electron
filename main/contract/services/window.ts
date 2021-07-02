export interface BrowserConfig {
    devTools: boolean,
    nodeIntegration: boolean,
    contextIsolation: boolean,
    enableRemoteModule: boolean,
    preloadEntry: string,
}

export interface Config {
    menuBar: boolean,
    devtools: boolean,
    maximize: boolean,
    entry: string
}

export default abstract class WindowManager {

    protected abstract browserWindow: Electron.BrowserWindow;

    protected abstract browserConfig: BrowserConfig;

    protected abstract config: Config;

    constructor(config: Partial<Config>, browserConfig: Partial<BrowserConfig>) {
        this.mergeConfig(config, browserConfig);
    }

    private mergeConfig(config: Partial<Config>, browserConfig: Partial<BrowserConfig>) {
        this.config = { ...this.config, ...config };
        this.browserConfig = { ...this.browserConfig, ...browserConfig };
    }

    protected abstract createWindow(preloadEntry: string): void;

    protected abstract loadWindow(): void;

    protected abstract registerHandlers(): void;
}