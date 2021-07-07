import { Container } from "typescript-ioc";
import Gate from "../contract/Auth/Gate";
import ServiceProvider from "../contract/ServiceProvider";
import $Gate from "../services/Gate";

export default class $GateProvider extends ServiceProvider {

    register() {
        Container.bind(Gate).to($Gate);
    };


    boot() {

    };

}