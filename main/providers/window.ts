import { Container, Scope } from "typescript-ioc";
import ServiceProvider from "../contract/ServiceProvider";
import WindowManager from "../contract/window";
import $WindowManager from "../services/Window";

function WindowManagerFactory() {
    return new $WindowManager(
        { entry: MAIN_WINDOW_WEBPACK_ENTRY },
        { preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY }
    )
}

export default class $WindowProvider extends ServiceProvider {

    register() {
        Container.bind(WindowManager).factory(WindowManagerFactory)
            .scope(Scope.Singleton);
    };

    boot() {
        // Container.get(WindowManager)
    };
}