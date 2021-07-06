import { Container } from "typescript-ioc";
import Controller from "../contract/Controller";
import Middleware from "../contract/Middleware";
import Route from "../contract/Route";
import Router, { RouteConfig } from "../contract/Router";

export default class $Router<Req, Res> extends Router<Req, Res> {

    protected middleware?: Middleware<Req>;


    protected routes: Route<Req, Res>[] = [];


    public setMiddleware(middleware: Middleware<Req>) {
        this.middleware = middleware
    }


    public addRoute({ callback, controller, method, params }: RouteConfig) {
        let routeAction: CallableFunction;

        if (controller)
            routeAction = () => controller.callAction(method, params)
        else if (callback)
            routeAction = callback;
        else
            throw new Error("one of the callback or controller must be specified");

        const route = this.createRoute(routeAction)
        this.routes.push(route);
        return route
    };


    protected createRoute(action: CallableFunction): Route<Req, Res> {
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