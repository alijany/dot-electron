import { Container } from "typescript-ioc";
import Gate from "../contract/Auth/Gate";
import ServiceProvider from "../contract/ServiceProvider";
import $Gate from "../services/Gate";

export default class $ControllerProvider extends ServiceProvider {

    register() {
        Container.bind(Gate).to($Gate);
    };


    boot() {

    };

}