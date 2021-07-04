import { contextBridge, ipcRenderer } from "electron";
import { IpcRendererEvent } from "electron/main";
import { Request } from "../../shared/request";

contextBridge.exposeInMainWorld("ipcRenderer", ipcRenderer);

export interface Channel<Req> {
    send(
        request: Req,
        onResponse: (event: IpcRendererEvent, response: Response) => void
    ): void;
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
}


