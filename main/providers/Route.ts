import { Container } from "typescript-ioc";
import { Request } from "../../shared/request";
import { Response } from "../../shared/response";
import Route from "../contract/Route";
import ServiceProvider from "../contract/ServiceProvider";
import $Route from "../services/Route";

function RouteFactory() {
    return new $Route<Request, Response>()
}

export default class $RouteProvider extends ServiceProvider {

    register() {
        Container.bind(Route).factory(RouteFactory);
    };


    boot() {

    };

}