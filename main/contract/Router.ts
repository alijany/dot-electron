import Controller from "./Controller";
import Route from "./Route";

export type RouteConfig  = {
    callback?: CallableFunction,
    controller?: Controller,
    method?: string,
    params?: any[]
}

export default abstract class Router<Request, Response> {

    public abstract addRoute(config: RouteConfig): Route<Request, Response>;

    public abstract dispatch(request: Request): Promise<Response>;

    // Find the route matching a given request.
    protected abstract findRoute(request: Request): Route<Request, Response> | undefined

    public abstract getRoutes(): Route<Request, Response>[];
}