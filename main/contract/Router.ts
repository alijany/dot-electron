import Controller from "./Controller";
import Route from "./Route";

export default abstract class Router<Request, Response> {

    abstract addRoute(action: CallableFunction): Route<Request, Response>;
    abstract addRoute(
        controller: Controller<Response>,
        method?: string,
        params?: any[]
    ): Route<Request, Response>;// replace params and method
    public abstract addRoute(method: any): Route<Request, Response>;

    public abstract dispatch(request: Request): Promise<Response>;

    // Find the route matching a given request.
    protected abstract findRoute(request: Request): Route<Request, Response> | undefined

    public abstract getRoutes(): Route<Request, Response>[];
}