export default abstract class DataSource<R,W> {
    public abstract write(data: W): Promise<void> | void;

    public abstract read(): Promise<R> | R;
}