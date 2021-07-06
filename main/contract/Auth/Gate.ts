import Privilege from "../../Entities/Privilege";

interface Gate {
    
    // Determine if a given ability has been defined.
    has(privilege: Privilege): Promise<boolean>;

    // Define a new privilege.
    define(privilege: Privilege): Promise<void>;

    // Determine if the given privilege should be granted for the current user.
    authorize(privilege: Privilege, ...params: any[]): Promise<boolean>;

    // Get all of the defined privileges.
    privileges(): Privilege[];
}