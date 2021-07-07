import Guard from "../contract/Auth/Guard";
import User from "../contract/model/User";

export default class $Guard extends Guard {

    private users: User[] = []


    check(user: User) {
        return Boolean(this.users.find($user => $user.id === user.id))
    }


    getUsers(): User[] {
        return this.users
    }


    addUser(user: User): void {
        if (!this.check(user))
            this.users.push(user)
    }


    removeUser(user: User): void {
        this.users = this.users.filter($user => $user.id !== user.id)
    }

}