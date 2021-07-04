import { Container } from "typescript-ioc";
import ServiceProvider from "../contract/ServiceProvider";
import FileSource from "../contract/utilities/FileSource";
import $FileSource from "../services/FileSource";


export default class $FileSourceProvider extends ServiceProvider {

    register() {
        Container.bind(FileSource).to($FileSource);
    };


    boot() {

    };

}