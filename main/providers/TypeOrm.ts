import { Connection, createConnection } from "typeorm";
import { Container } from "typescript-ioc";
import ServiceProvider from "../contract/ServiceProvider";
import $Privilege from "../Entities/Privilege";
import $User from "../Entities/User";


export default class $TypeOrmConnectionProvider extends ServiceProvider {

    async register() {
        // TODO move to config 
        const connection = await createConnection({
            type: "mysql",
            host: "localhost",
            port: 3306,
            username: "alijany",
            password: "Gr33nR0z",
            database: "electron",
            entities: [
                $Privilege,
                $User
            ],
            synchronize: true,
            logging: false
        });

        Container.bind(Connection).factory(() => connection);
    };


    boot() {

    };

}