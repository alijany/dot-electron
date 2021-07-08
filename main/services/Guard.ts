import { Inject } from "typescript-ioc";
import Guard from "../contract/Auth/Guard";
import User from "../contract/model/User";
import UsersSession from "../contract/UsersSession";

export default class $Guard extends Guard {

    @Inject
    session!: UsersSession;


    exist(token: string) {
        return this.session.has(token)
    }


    get(token: string) {
        return this.session.get(token, undefined)
    }


    getUsers(): User[] {
        return Object.values(this.session.all())
    }


    addUser(user: User) {
        return this.session.add(user)
    }


    removeUser(token: string) {
        this.session.remove(token)
    }

}