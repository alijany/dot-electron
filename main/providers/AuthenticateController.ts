import { Container } from "typescript-ioc";
import AuthenticateController from "../contract/Auth/AuthenticateController";
import ServiceProvider from "../contract/ServiceProvider";
import $AuthenticateController from "../Controllers/AuthenticateController";


export default class $AuthenticateControllerProvider extends ServiceProvider {

    register() {
        Container.bind(AuthenticateController).to($AuthenticateController);
    };


    boot() {

    };

}