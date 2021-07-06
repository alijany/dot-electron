export default abstract class Controller {

    protected abstract invoke(...params: any[]): any | Promise<any>;

    public abstract callAction(
        method?: string,
        params?: any
    ): Promise<any>;
    
}