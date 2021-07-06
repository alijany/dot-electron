import Middleware from "../contract/Middleware";

type Action<Req> = (request: Req, ...params: any[]) => Req;


export default class $Middleware<Req> extends Middleware<Req> {

    private nextMiddleware?: Middleware<Req>;


    private action?: Action<Req>;


    setAction(action: Action<Req>) {
        this.action = action;
    }


    public setNext(middleware: Middleware<Req>): Middleware<Req> {
        this.nextMiddleware = middleware;
        return middleware;
    }


    public handle(request: Req, ...params: any[]): Req {
        if (!this.action) throw Error("no action defined for this middleware")

        request = this.action(request, ...params);

        if (this.nextMiddleware)
            return this.nextMiddleware.handle(request);
        else return request;
    }
    
}