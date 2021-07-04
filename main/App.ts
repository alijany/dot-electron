import { app } from "electron";
import App from "./contract/App";
import $ChannelProvider from "./providers/Channel";
import $ControllerProvider from "./providers/Controller";
import $FileSourceProvider from "./providers/FileSource";
import $JsonFileSourceProvider from "./providers/JsonFileSource";
import $RouteProvider from "./providers/Route";
import $RouterProvider from "./providers/Router";
import $WindowProvider from "./providers/window";

export default class $App extends App {

    protected isBootstrapped = false;

    
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
    ];


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
        this.isBootstrapped = true;
    };
}


