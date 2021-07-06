export default abstract class Controller {

    protected abstract invoke(...params: any[]): any | Promise<any>;

    public abstract callAction(
        request: any,
        method?: string,
        params?: any
    ): Promise<any>;
    
}