import { Container } from "typescript-ioc";
import ServiceProvider from "../contract/ServiceProvider";
import JsonFileSourceDecorator from "../contract/utilities/JsonFileSourceDecorator";
import $JsonFileSource from "../services/JsonFileSource";


export default class $JsonFileSourceProvider extends ServiceProvider {

    register() {
        Container.bind(JsonFileSourceDecorator).to($JsonFileSource);
    };


    boot() {

    };

}