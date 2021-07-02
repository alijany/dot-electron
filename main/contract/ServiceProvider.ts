export default abstract class ServiceProvider {
    // register service to IOC container
    protected abstract register(): void;
    // boot service from IOC container
    protected abstract boot(): void;
}