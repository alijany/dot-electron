
import User from "../model/User";

export abstract class Authenticate {

    public abstract login(username: string, password: string): Promise<User>;

    public abstract register(user: Partial<User>) : void;
}