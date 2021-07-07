import Controller from "../Controller";
import User from "../model/User";

export default abstract class AuthenticateController<Request, Response>
    extends Controller {

    abstract getUser(): User | undefined;

    abstract register(request: Request): Promise<Response>;

    abstract login(request: Request): Promise<Response>;
}