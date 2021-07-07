export interface Request {
    responseChannel?: string;
    token?: string;
    type: string;
    data: any;
}

/* -------------------------------------------------------------------------- */
/*                                    Auth                                    */
/* -------------------------------------------------------------------------- */
export interface registerRequest extends Request {
    type: "register";
    data: {
        firstName: string;
        lastName: string;
        username: string;
        password: string;
    }
}

export interface loginRequest extends Request {
    type: "login";
    data: {
        username: string;
        password: string;
    }
}

export interface logoutRequest extends Request {
    type: "logout";
    token: string;
    data: {
        token: string;
    }
}

export type AuthRequest = registerRequest | loginRequest | logoutRequest;