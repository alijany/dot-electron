import { Container } from "typescript-ioc";
import Middleware from "../contract/Middleware";
import Route, { RouteAction } from "../contract/Route";
import Router, { RouteConfig } from "../contract/Router";

export default class $Router<Req, Res> extends Router<Req, Res> {

    protected middleware?: Middleware<Req>;


    protected routes: Route<Req, Res>[] = [];


    public setMiddleware(middleware: Middleware<Req>) {
        return this.middleware = middleware
    }


    public addRoute(
        { callback, controller, method, params = [] }: RouteConfig<Req, Res>
    ) {
        let action: RouteAction<Req, Res>;

        if (controller)
            action = req => controller.callAction(req, method, ...params);
        else if (callback)
            action = req => callback(req, ...params);
        else
            throw new Error("one of the callback or controller must be specified");

        const route = this.createRoute(action)
        this.routes.push(route);
        return route
    };


    protected createRoute(action: RouteAction<Req, Res>): Route<Req, Res> {
        const route = Container.get(Route);
        route.setAction(action);
        return route;
    }


    public getRoutes() {
        return this.routes;
    }


    protected findRoute = (request: Req) => {
        return this.routes.find(route =>
            route.matches(request)
        );
    };


    public async dispatch(request: Req) {
        if (this.middleware)
            request = this.middleware.handle(request);

        const route = this.findRoute(request);

        if (route) {
            return await route.run(request);
        } else {
            throw Error("no route found for the given request")
        }
    };

}