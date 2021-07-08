
import { Container, Scope } from "typescript-ioc";
import ServiceProvider from "../contract/ServiceProvider";
import UsersSession from "../contract/UsersSession";
import $UsersSession from "../services/UserSession";


export default class $UsersSessionProvider extends ServiceProvider {

    register() {
        Container.bind(UsersSession).to($UsersSession).scope(Scope.Singleton);
    };


    boot() {
        // TODO Container.get(UsersSession).read() 
    };

}