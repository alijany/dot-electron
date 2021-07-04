import FileSource from "./FileSource";

export default abstract class JsonFileSourceDecorator extends FileSource {

    public abstract setDataSource(dataSource: FileSource): void;

    public abstract write(data: any): Promise<void> | void;

    public abstract read(): any
}