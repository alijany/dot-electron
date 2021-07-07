import User from "./model/User";
import Session from "./Session";

export default abstract class UsersSession extends Session<User>{ }