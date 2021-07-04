export default abstract class Controller<Response> {
    protected abstract invoke(...params: any[]): Response | Promise<Response>;
    public abstract callAction(
        method?: string,
        params?: any[]
    ): Promise<Response>;
}