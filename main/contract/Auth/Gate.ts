import Privilege from "../../Entities/Privilege";
import User from "../model/User";

export default abstract class Gate {

    // Determine if a given ability has been defined.
    abstract has(privilege: Privilege): boolean;

    // Define a new privilege.
    abstract define(privilege: Privilege): void;

    // Determine if the given privilege should be granted for user.
    abstract authorize(privilege: User, ...params: any[]): Promise<boolean>;

    // Get all of the defined privileges.
    abstract getPrivileges(): Privilege[];
}