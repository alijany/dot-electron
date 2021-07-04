import Middleware from "../contract/Middleware";
import Route from "../contract/Route";

type ActionType<Res> = (...params: any[]) => Res;

export default class $Route<Req, Res> extends Route<Req, Res> {

    constructor() {
        super();
    }

    protected action?: ActionType<Res>;


    protected middleware?: Middleware<Req>;


    public setAction(action: ActionType<Res>): void {
        this.action = action;
    }


    public run(request: Req) {
        if (this.middleware)
            request = this.middleware.handle(request);

        if (this.action)
            return this.action();
        else {
            throw Error("no action specified for route")
        }
    };


    public matches() {
        return true;
    };

}