import { app } from "electron";
import App from "./contract/App";
import $WindowProvider from "./providers/window";

export default class $App extends App {

    protected isBootstrapped = false;

    // TODO use ioc
    protected providers = [new $WindowProvider()];

    constructor() {
        super();
        this.prepare();
        this.registerProviders();

        if (app.isReady())
            this.bootServiceProviders();
        else
            app.on('ready', () => this.bootServiceProviders())
    }

    private prepareElectron() {
        // Handle creating/removing shortcuts on Windows when installing/uninstalling.
        if (require('electron-squirrel-startup')) {
            app.quit()
        }
    };

    prepare() {
        this.prepareElectron();
    }

    protected registerProviders() {
        this.providers.forEach(provider => {
            provider.register();
        });
    };

    protected bootServiceProviders() {
        this.providers.forEach(provider => {
            provider.boot();
        });
    };
}


