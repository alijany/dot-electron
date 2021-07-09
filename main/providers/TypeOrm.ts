import { Connection, createConnection } from "typeorm";
import { Container } from "typescript-ioc";
import ServiceProvider from "../contract/ServiceProvider";
import $Privilege from "../Entities/Privilege";
import $User from "../Entities/User";
const config = require('../../config/typeorm.js') 


export default class $TypeOrmConnectionProvider extends ServiceProvider {

    async register() {
        config.entities = [
            $Privilege,
            $User // TODO use container
        ];
        const connection = await createConnection(config);

        Container.bind(Connection).factory(() => connection);
    };


    boot() {

    };

}