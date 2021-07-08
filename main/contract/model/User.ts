import { BaseEntity } from "typeorm";
import Authenticatable from "../Auth/Authenticatable";
import Authorizable from "../Auth/Authorizable";
import Privilege from "./Privilege";

export default abstract class User extends BaseEntity
    implements Authorizable, Authenticatable {

    abstract id: number;

    abstract password: string;

    abstract firstName: string;

    abstract lastName: string;

    abstract username: string;

    abstract has(privilege: Privilege): Promise<boolean>;

    abstract getPrivileges(): Promise<Privilege[]>

    abstract getToken(): Promise<string>;

    abstract setToken(): User;

}