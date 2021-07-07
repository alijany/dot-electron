
import { registerRequest } from "../../../shared/request";
import User from "../model/User";

export default abstract class Authenticate {

    public abstract login(username: string, password: string): Promise<User>;

    public abstract register(user: registerRequest["data"]): Promise<User>;
}