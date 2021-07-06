import { Container } from "typescript-ioc";
import ServiceProvider from "../contract/ServiceProvider";
import PasswordHash from "../contract/utilities/PasswordHash";
import $PasswordHash from "../services/PasswordHash";


export default class $PasswordHashProvider extends ServiceProvider {

    register() {
        Container.bind(PasswordHash).to($PasswordHash);
    };


    boot() {

    };

}