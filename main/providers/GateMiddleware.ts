import { Container } from "typescript-ioc";
import GateMiddleware from "../contract/Auth/GateMiddleware";
import ServiceProvider from "../contract/ServiceProvider";
import $GateMiddleware from "../Middleware/GateMiddleware";

export default class $GateMiddlewareProvider extends ServiceProvider {

    register() {
        Container.bind(GateMiddleware).to($GateMiddleware);
    };


    boot() {

    };

}