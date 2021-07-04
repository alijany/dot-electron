import { PathLike, promises as fs } from "fs";
import FileSource from "../contract/utilities/FileSource";



export default class $FileSource extends FileSource {

    private path?: PathLike;


    public setPath(path: PathLike) {
        this.path = path;
    }


    public async read() {
        if (this.path)
            return await fs.readFile(this.path)
        else throw Error('no path specified to read file')
    }


    public async write(data: string | Buffer) {
        if (this.path)
            await fs.writeFile(this.path, data)
        else throw Error('no path specified to write file')
    }

}