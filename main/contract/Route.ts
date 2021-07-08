import Middleware from "./Middleware";

export type RouteAction<Req, Res> =
    (request: Req, ...params: any[]) => Res | Promise<Res>;


export default abstract class Route<Request, Response> {

    public abstract run(request: Request): Promise<Response>;

    //  Determine if the route matches a given request.
    public abstract matches(request: Request): boolean;

    public abstract setMatches(matches: (request: Request) => boolean): void;

    public abstract setAction(action: RouteAction<Request, Response>): void;

    public abstract setMiddleware(
        middleware: Middleware<Request>
    ): Middleware<Request>

}