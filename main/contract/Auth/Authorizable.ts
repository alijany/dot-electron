import Privilege from "../model/Privilege";

export default interface Authorizable {

    has(...params: any[]): Promise<boolean>;

    getPrivileges(): Promise<Privilege[]>

}