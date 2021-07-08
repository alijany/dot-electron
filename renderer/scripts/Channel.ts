import { contextBridge, ipcRenderer } from "electron";
import { IpcRendererEvent } from "electron/main";
import { Request } from "../../shared/request";
import { Response } from "../../shared/response";

contextBridge.exposeInMainWorld("ipcRenderer", ipcRenderer);

export interface Channel<Req> {
    send(
        request: Req,
        onResponse: (event: IpcRendererEvent, response: Response) => void
    ): void;

    sendAsync(request: Req): Promise<[Electron.IpcRendererEvent, Response]>
}

export default class $Channel<Req extends Request> implements Channel<Req> {

    constructor(name: string) {
        this.name = name;
    }


    private name: string;


    ipcRenderer = ipcRenderer;


    static uniqueIdentifier: number = 0;


    send = (
        request: Req,
        onResponse: (event: IpcRendererEvent, response: Response) => void
    ) => {
        if (!request.responseChannel) {
            request.responseChannel = this.name + $Channel.uniqueIdentifier;
            $Channel.uniqueIdentifier++;
        }

        this.ipcRenderer.once(request.responseChannel, onResponse);
        this.ipcRenderer.send(this.name, request);
    };

    sendAsync = async (request: Req) => {
        return new Promise<[IpcRendererEvent, Response]>((resolve, reject) => {
            this.send(request, (e, r) => {
                resolve([e, r])
            })
        })
    };
}


