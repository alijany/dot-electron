import { Container, Scope } from "typescript-ioc";
import Guard from "../contract/Auth/Guard";
import ServiceProvider from "../contract/ServiceProvider";
import $Guard from "../services/Guard";

export default class $GuardProvider extends ServiceProvider {

    register() {
        Container.bind(Guard).to($Guard)
            .scope(Scope.Singleton);
    };


    boot() {

    };

}