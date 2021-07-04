import Router from "./Router";

export default abstract class Channel<Request,Response> {

    public abstract setName(name: string): void;

    public abstract setRouter(router: Router<Request,Response>): void;

    public abstract register(): void;

    public abstract unregister(): void;

    protected abstract handle(event: Event, request: Request): void;
}