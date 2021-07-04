export interface Success {
    responseChannel?: string;
    type: string;
    data: any;
}

export interface Error {
    responseChannel?: string;
    type: "error";
    data: {
        message: string;
    };
}

export type Response = Success | Error;
