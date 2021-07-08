import { Inject } from "typescript-ioc";
import { Request } from "../../shared/request";
import Guard from "../contract/Auth/Guard";
import GuardMiddleware from "../contract/Auth/GuardMiddleware";
import Middleware from "../contract/Middleware";

export default class $GuardMiddleware extends GuardMiddleware {

    @Inject
    private guard!: Guard;


    protected nextMiddleware?: Middleware<Request>;


    protected action = (request: Request) => {
        const { token } = request;
        if (token && this.guard.exist(token))
            return request
        else
            throw Error("user is not authenticated");
    }


    public setNext(middleware: Middleware<Request>) {
        this.nextMiddleware = middleware;
        return middleware;
    }


    public handle(request: Request) {
        request = this.action(request);

        if (this.nextMiddleware)
            return this.nextMiddleware.handle(request);
        else return request;
    }
}