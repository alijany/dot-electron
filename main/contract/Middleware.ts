export default abstract class Middleware<Req> {

    public abstract setNext(middleware: Middleware<Req>): Middleware<Req>;

    public abstract handle(request: Req): Req;

}