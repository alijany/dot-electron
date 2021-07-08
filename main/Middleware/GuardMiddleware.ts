import { Inject } from "typescript-ioc";
import { Request } from "../../shared/request";
import Guard from "../contract/Auth/Guard";
import GuardMiddleware from "../contract/Auth/GuardMiddleware";
import Middleware from "../contract/Middleware";

export default class $GuardMiddleware extends GuardMiddleware {

    @Inject
    private guard!: Guard;


    protected nextMiddleware?: Middleware<Request>;


    public setGuard(guard: Guard) {
        this.guard = guard;
    }


    protected action = (request: Request) => {
        const { token } = request;
        if (!token || !this.guard.exist(token))
            throw new Error("Invalid Session ID");
        return request
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