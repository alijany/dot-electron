import Gate from "../contract/Auth/Gate";
import User from "../contract/model/User";
import Privilege from "../Entities/Privilege";

export default class $Gate extends Gate {

    private privileges: Privilege[] = [];


    has(privilege: Privilege) {
        const result = this.privileges.find($privilege =>
            $privilege.name === privilege.name)

        return Boolean(result)
    }


    define(privilege: Privilege) {
        this.privileges.push(privilege)
    }


    async authorize(user: User, ...params: any[]) {
        await user.getPrivileges()
        for (const privilege of this.privileges) {
            if (await !user.has(privilege)) return false;
        }
        return true;
    }


    getPrivileges(): Privilege[] {
       return this.privileges;
    }
    
}