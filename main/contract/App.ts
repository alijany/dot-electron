import ServiceProvider from "./ServiceProvider";

export default abstract class App {
    // array of service providers
    protected abstract providers: ServiceProvider[];
    // bootstrap app
    public abstract boot(): void | Promise<void>;
    // register IOC container and logger ...
    protected abstract prepare(): void | Promise<void>;
    // register server providers
    protected abstract registerProviders(): void | Promise<void>;
    // bootstrap service providers
    protected abstract bootServiceProviders(): void | Promise<void>;
    // run after all services booted
    public abstract onReady(callback: CallableFunction): void | Promise<void>;
}