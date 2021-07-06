import Controller from "../Controller";

export default abstract class AuthenticateController<Request,Response>
    extends Controller {

    abstract registration(request: Request): Promise<Response>;

    abstract login(request: Request): Promise<Response>;
}