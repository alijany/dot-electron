import Middleware from "../contract/Middleware";
import Route, { RouteAction } from "../contract/Route";



export default class $Route<Req, Res> extends Route<Req, Res> {

    constructor() {
        super();
    }

    protected action?: RouteAction<Req, Res>;


    protected middleware?: Middleware<Req>;


    public setAction(action: RouteAction<Req,Res>): void {
        this.action = action;
    }


    public async run(request: Req) {
        if (this.middleware)
            request = this.middleware.handle(request);

        if (this.action)
            return await this.action(request);
        else {
            throw Error("no action specified for route")
        }
    };


    // TODO rename
    public matches(request: Req) {
        return true;
    };


    public setMatches(matches: (request: Req) => boolean) {
        this.matches = matches
    }

}