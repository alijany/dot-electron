export interface Request {
    responseChannel?: string;
    type: string;
    data: any;
}

/* -------------------------------------------------------------------------- */
/*                                    Auth                                    */
/* -------------------------------------------------------------------------- */
// export interface registerRequest extends IpcRequest {
//     method: "register";
//     payload: {
//         firstName: string;
//         lastName: string;
//         username: string;
//         password: string;
//     }
// }

// export interface loginRequest extends IpcRequest {
//     method: "login";
//     payload: {
//         username: string;
//         password: string
//     }
// }

// export type AuthRequest = registerRequest | loginRequest;