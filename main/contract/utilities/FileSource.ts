import { PathLike } from "original-fs";
import DataSource from "./DataSource";

export default abstract class FileSource
    extends DataSource<Promise<Buffer>, string | Buffer> {

    public abstract setPath(path: PathLike): void;

}