import { Inject } from "typescript-ioc";
import { Request } from "../../shared/request";
import Gate from "../contract/Auth/Gate";
import GateMiddleware from "../contract/Auth/GateMiddleware";
import Guard from "../contract/Auth/Guard";
import Middleware from "../contract/Middleware";

export default class $GateMiddleware extends GateMiddleware {

    @Inject
    private gate!: Gate;


    @Inject
    private guard!: Guard;


    protected nextMiddleware?: Middleware<Request>;


    public setGate(gate: Gate) {
        this.gate = gate;
    }


    protected action = (request: Request) => {
        if (!request.token) throw new Error("Invalid Session ID");
        const user = this.guard.get(request.token);

        if (!this.gate.authorize(user, request))
            throw new Error("request not authorized");

        return request;
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