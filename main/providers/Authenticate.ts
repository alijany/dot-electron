import { Container } from "typescript-ioc";
import { Authenticate } from "../contract/Auth/Authenticate";
import ServiceProvider from "../contract/ServiceProvider";
import { $Authenticate } from "../services/Authenticate";


export default class $AuthenticateProvider extends ServiceProvider {

    register() {
        Container.bind(Authenticate).to($Authenticate);
    };


    boot() {

    };

}