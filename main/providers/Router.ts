import { Container } from "typescript-ioc";
import { Request } from "../../shared/request";
import Router from "../contract/Router";
import ServiceProvider from "../contract/ServiceProvider";
import $Router from "../services/Router";

function RouteFactory() {
    return new $Router<Request, Response>();
}

export default class $RouterProvider extends ServiceProvider {

    register() {
        Container.bind(Router).factory(RouteFactory);
    };


    boot() {

    };

}