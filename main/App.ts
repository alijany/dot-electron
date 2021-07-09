import { app } from "electron";
import { Container } from "typescript-ioc";
import App from "./contract/App";
import WindowManager from "./contract/window";
import $AuthenticateProvider from "./providers/Authenticate";
import $AuthenticateControllerProvider from "./providers/AuthenticateController";
import $ChannelProvider from "./providers/Channel";
import $ControllerProvider from "./providers/Controller";
import $FileSourceProvider from "./providers/FileSource";
import $GateProvider from "./providers/Gate";
import $GateMiddlewareProvider from "./providers/GateMiddleware";
import $GuardProvider from "./providers/Guard";
import $GuardMiddlewareProvider from "./providers/GuardMiddleware";
import $JsonFileSourceProvider from "./providers/JsonFileSource";
import $PasswordHashProvider from "./providers/PasswordHash";
import $RouteProvider from "./providers/Route";
import $RouterProvider from "./providers/Router";
import $TypeOrmConnectionProvider from "./providers/TypeOrm";
import $UsersSessionProvider from "./providers/UsersSession";
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
        // ORM
        new $TypeOrmConnectionProvider(),
        // auth
        new $UsersSessionProvider,
        new $GuardProvider(),
        new $GuardMiddlewareProvider(),

        new $GateProvider(),
        new $GateMiddlewareProvider(),
        
        new $PasswordHashProvider(),
        new $AuthenticateProvider(),
        new $AuthenticateControllerProvider(),
        // oder
        new $FileSourceProvider(),
        new $JsonFileSourceProvider(),
    ];


    public onReady(callback: CallableFunction) {
        this.onReadyCallback = callback;
    }


    private async onElectronReady() {
        await this.bootServiceProviders();
        if (this.onReadyCallback)
            this.onReadyCallback();
        Container.get(WindowManager)
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


