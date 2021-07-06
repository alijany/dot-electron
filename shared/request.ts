export interface Request {
    responseChannel?: string;
    type: string;
    data: any;
}

/* -------------------------------------------------------------------------- */
/*                                    Auth                                    */
/* -------------------------------------------------------------------------- */
export interface registerRequest extends Request {
    method: "register";
    payload: {
        firstName: string;
        lastName: string;
        username: string;
        password: string;
    }
}

export interface loginRequest extends Request {
    method: "login";
    payload: {
        username: string;
        password: string;
    }
}

export type AuthRequest = registerRequest | loginRequest;