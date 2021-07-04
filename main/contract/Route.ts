export default abstract class Route<Request, Response> {

    public abstract run(request: Request): Promise<Response>;

    //  Determine if the route matches a given request.
    public abstract matches(request: Request): boolean;

    public abstract setMatches(matches: (request: Request) => boolean): void;

    public abstract setAction(action: CallableFunction): void;

}