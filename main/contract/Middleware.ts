
interface MiddlewareType<Req> {
    setNext(handler: Middleware<Req>): Middleware<Req>;

    handle(request: Req): Req;
}

export default abstract class Middleware<Req> implements MiddlewareType<Req> {

    constructor(action: CallableFunction) {
        this.action = action;
    }

    private nextMiddleware?: Middleware<Req>;

    private action: CallableFunction;


    public setNext(middleware: Middleware<Req>): Middleware<Req> {
        this.nextMiddleware = middleware;
        return middleware;
    }

    public handle(request: Req): Req {
        this.action()
        if (this.nextMiddleware)
            return this.nextMiddleware.handle(request);
        else return request
    }
}