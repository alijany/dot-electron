import User from "../model/User";

export default abstract class Guard {

    // Determine if user is authenticated.
    abstract check(user: User): boolean;

    // Get the currently authenticated users.
    abstract users(): User[];

    // add to authenticated users.
    abstract addUser(user: User): void;

    // remove from authenticated users.
    abstract removeUser(user: User): void;
}
