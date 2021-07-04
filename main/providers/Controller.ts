import { Container } from "typescript-ioc";
import Controller from "../contract/Controller";
import ServiceProvider from "../contract/ServiceProvider";
import $Controller from "../services/Controller";

export default class $ControllerProvider extends ServiceProvider {

    register() {
        Container.bind(Controller).to($Controller);
    };


    boot() {

    };

}