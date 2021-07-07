import { getManager } from "typeorm";
import { Inject } from "typescript-ioc";
import { registerRequest } from "../../shared/request";
import Authenticate from "../contract/Auth/Authenticate";
import PasswordHash from "../contract/utilities/PasswordHash";
import $User from "../Entities/User";


export class $Authenticate extends Authenticate {

    @Inject
    passwordHash!: PasswordHash;


    public async login(username: string, password: string) {
        const user = await getManager().findOne($User, { username: username });
        if (!user)
            throw new Error("user not found");

        let isMatch = await this.passwordHash.verify(password, user.password);
        if (!isMatch)
            throw new Error("wrong password");

        return user;
    }


    public async register(user: registerRequest["data"]) {
        const manager = getManager();
        if (await manager.findOne($User, { username: user.username }))
            throw new Error("username already exist");

        let hash = await this.passwordHash.hash(user.password);
        user.password = hash;

        const $user = await manager.create($User, user);
        $user.save();
        return $user;
    }

}