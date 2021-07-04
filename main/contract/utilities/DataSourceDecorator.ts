import DataSource from "./DataSource";

export default abstract class DataSourceDecorator<R,W> extends DataSource<R,W> {

    public abstract setDataSource(dataSource: DataSource<R,W>): void;

    public abstract write(data: W): Promise<void> | void;

    public abstract read(): R
}