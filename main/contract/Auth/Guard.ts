import User from "../model/User";

type sessionId = string;

export default abstract class Guard {

    // Determine if user is authenticated.
    abstract exist(token: sessionId): boolean;

    // return user if is authenticated.
    abstract get(token: sessionId): User | undefined;

    // Get the currently authenticated users.
    abstract getUsers(): User[];

    // add to authenticated users.
    abstract addUser(user: User): sessionId;

    // remove from authenticated users.
    abstract removeUser(token: sessionId): void;
}
