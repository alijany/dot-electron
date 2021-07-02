import ServiceProvider from "./ServiceProvider";

export default abstract class App {
    protected abstract isBootstrapped: boolean;
    // array of service providers
    protected abstract providers: ServiceProvider[];
    // register IOC container and logger ...
    protected abstract prepare(): void;
    // register server providers
    protected abstract registerProviders(): void;
    //bootstrap service providers
    protected abstract bootServiceProviders(): void;
}