export default abstract class Controller<Response> {
    protected abstract invoke(params?: any[]): Response;
    public abstract callAction(
        method?: string,
        params?: any[]
    ): Response;
}