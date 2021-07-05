import { app } from "electron";
import App from "./contract/App";
import $ChannelProvider from "./providers/Channel";
import $ControllerProvider from "./providers/Controller";
import $FileSourceProvider from "./providers/FileSource";
import $JsonFileSourceProvider from "./providers/JsonFileSource";
import $RouteProvider from "./providers/Route";
import $RouterProvider from "./providers/Router";
import $TypeOrmConnectionProvider from "./providers/TypeOrm";
import $WindowProvider from "./providers/window";

export default class $App extends App {

    protected isBootstrapped = false;

    protected onReadyCallback?: CallableFunction;


    // TODO use ioc multi resolve
    protected providers = [
        // main
        new $WindowProvider(),
        new $ControllerProvider(),
        new $RouteProvider(),
        new $RouterProvider(),
        new $ChannelProvider(),
        // oder
        new $FileSourceProvider(),
        new $JsonFileSourceProvider(),
        new $TypeOrmConnectionProvider()
    ];

    
    public onReady(callback: CallableFunction) {
        this.onReadyCallback = callback;
    }


    private async onElectronReady() {
        await this.bootServiceProviders();
        if (this.onReadyCallback)
            this.onReadyCallback()
    }


    public async boot() {
        await this.prepare();
        await this.registerProviders();

        if (app.isReady())
            this.onElectronReady();
        else
            app.on('ready', () => this.onElectronReady);
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


    protected async registerProviders() {
        for (const provider of this.providers) {
            await provider.register();
        }
    };


    protected async bootServiceProviders() {
        for (const provider of this.providers) {
            await provider.boot();
        };
        this.isBootstrapped = true;
    };
}


