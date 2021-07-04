import { Container } from "typescript-ioc";
import { Request } from "../../shared/request";
import { Response } from "../../shared/response";
import Channel from "../contract/Channel";
import ServiceProvider from "../contract/ServiceProvider";
import { $Channel } from "../services/Channel";

function ChannelFactory() {
    return new $Channel<Request,Response>();
}

export default class $ChannelProvider extends ServiceProvider {

    register() {
        Container.bind(Channel).factory(ChannelFactory);
    };


    boot() {

    };

}