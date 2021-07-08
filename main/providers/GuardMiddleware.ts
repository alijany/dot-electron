import { Container, Scope } from "typescript-ioc";
import GuardMiddleware from "../contract/Auth/GuardMiddleware";
import ServiceProvider from "../contract/ServiceProvider";
import $GuardMiddleware from "../Middleware/GuardMiddleware";

export default class $GuardMiddlewareProvider extends ServiceProvider {

    register() {
        Container.bind(GuardMiddleware).to($GuardMiddleware);
    };


    boot() {

    };

}