import { ipcMain, IpcMainEvent } from 'electron';
import { Request } from '../../shared/request';
import { Response } from '../../shared/response';
import Channel from '../contract/Channel';
import Middleware from '../contract/Middleware';
import Router from '../contract/Router';

export class $Channel<Req extends Request, Res extends Response> extends Channel<Req, Res> {

    constructor() {
        super();
        this.handle = this.handle.bind(this)
    }

    name!: string;


    router?: Router<Req, Response>;


    public setName(name: string): void {
        this.name = name
    }


    public setRouter(router: Router<Req, Response>): void {
        this.router = router;
    }


    middleware!: Middleware<Req>;


    public register(): void {
        ipcMain.on(this.name, this.handle);
    }

    public unregister(): void {
        ipcMain.off(this.name, this.handle);
    }


    protected async handle(event: IpcMainEvent, request: Req) {
        if (this.middleware)
            request = this.middleware.handle(request)

        if (!request.responseChannel)
            request.responseChannel = this.name;

        try {
            if (!this.router)
                throw new Error("no router specified for channel");
            let response = await this.router?.dispatch(request);
            event.sender.send(request.responseChannel, response);
        } catch (error) {
            event.sender.send(
                request.responseChannel,
                { type: "error", payload: { message: error.message } }
            );
        }
    };
}

