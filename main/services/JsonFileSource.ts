import DataSource from "../contract/utilities/DataSource";
import DataSourceDecorator from "../contract/utilities/DataSourceDecorator";



export default class $JsonFileSource extends DataSourceDecorator<Promise<any>, any> {

    private dataSource?: DataSource<Promise<Buffer>, string>;


    public setDataSource(dataSource: DataSource<Promise<Buffer>, string>): void {
        this.dataSource = dataSource;
    }


    public async write(data: any) {
        if (!this.dataSource) throw new Error("no dataSource specified for decorator");

        data = JSON.stringify(data);
        await this.dataSource.write(data);
    }


    public async read() {
        if (!this.dataSource) throw new Error("no dataSource specified for decorator");

        const data = await this.dataSource.read();
        return JSON.parse(data.toString());
    }

}