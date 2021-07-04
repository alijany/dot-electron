import { Container } from "typescript-ioc";
import Controller from "../contract/Controller";
import Middleware from "../contract/Middleware";
import Route from "../contract/Route";
import Router from "../contract/Router";

export default class $Router<Req, Res> extends Router<Req, Res> {

    protected middleware?: Middleware<Req>;


    protected routes: Route<Req, Res>[] = [];

    
    public setMiddleware(middleware: Middleware<Req>) {
        this.middleware = middleware
    }


    // addRoute Overloads 
    addRoute(action: CallableFunction): void;
    addRoute(controller: Controller<Res>, method?: string, params?: any[]): void;
    // addRoute implementation 
    public addRoute(
        action: CallableFunction | Controller<Res>,
        method?: string,
        params?: any[]
    ) {
        let routeAction: CallableFunction;
        debugger;
        if (action instanceof Controller)
            routeAction = () => action.callAction(method, params)
        else
            routeAction = action;

        this.routes.push(this.createRoute(routeAction));
    };


    protected createRoute(action: CallableFunction): Route<Req, Res> {
        const route = Container.get(Route); // TODO pipe 
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


    // TODO async support
    public dispatch(request: Req) {
        if (this.middleware)
            request = this.middleware.handle(request);

        const route = this.findRoute(request);

        if (route) {
            return route.run(request);
        } else {
            throw Error("no route found for the given request")
        }
    };

}