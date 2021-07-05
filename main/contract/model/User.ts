import { BaseEntity } from "typeorm";
import Authenticatable from "../Auth/Authenticatable";
import Authorizable from "../Auth/Authorizable";

export default abstract class User extends BaseEntity
    implements Authorizable, Authenticatable {

    abstract id: number;

    abstract password: string;

    abstract firstName: string;

    abstract lastName: string;

    abstract username: string;

    abstract can(privilege:any): Promise<boolean>;

    abstract getToken(): Promise<string>;

    abstract setToken(): User;

}