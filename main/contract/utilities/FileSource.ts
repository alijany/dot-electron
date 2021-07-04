import DataSource from "./DataSource";

export default abstract class FileSource 
extends DataSource<Promise<Buffer>, string | Buffer> {}