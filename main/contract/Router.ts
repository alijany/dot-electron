import Controller from "./Controller";
import Middleware from "./Middleware";
import Route, { RouteAction } from "./Route";

export type RouteConfig<Req, Res> = {
    callback?: RouteAction<Req, Res>,
    controller?: Controller,
    method?: string,
    params?: any[]
}

export default abstract class Router<Request, Response> {

    public abstract addRoute(
        config: RouteConfig<Request, Response>
    ): Route<Request, Response>;

    public abstract dispatch(request: Request): Promise<Response>;

    // Find the route matching a given request.
    protected abstract findRoute(
        request: Request
    ): Route<Request, Response> | undefined;

    public abstract setMiddleware(
        middleware: Middleware<Request>
    ): Middleware<Request>

    public abstract getRoutes(): Route<Request, Response>[];
}