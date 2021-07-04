import Controller from "./Controller";
import Route from "./Route";

export default abstract class Router<Request, Response> {

    abstract addRoute(action: CallableFunction): void;
    abstract addRoute(
        controller: Controller<Response>,
        method?: string,
        params?: any[]
    ): void;// replace params and method
    public abstract addRoute(method: any): void;

    public abstract dispatch(request: Request): Response;

    // Find the route matching a given request.
    protected abstract findRoute(request: Request): Route<Request, Response> | undefined

    public abstract getRoutes(): Route<Request, Response>[];
}