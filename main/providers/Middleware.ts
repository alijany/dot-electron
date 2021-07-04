import { Container } from "typescript-ioc";
import { Request } from "../../shared/request";
import Middleware from "../contract/Middleware";
import ServiceProvider from "../contract/ServiceProvider";
import $Middleware from "../services/Middleware";

function MiddlewareFactory() {
    return new $Middleware<Request>()
}

export default class $MiddlewareProvider extends ServiceProvider {

    register() {
        Container.bind(Middleware).factory(MiddlewareFactory);
    };


    boot() {

    };

}