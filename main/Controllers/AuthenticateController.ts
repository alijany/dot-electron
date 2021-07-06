import { Inject } from "typescript-ioc";
import { AuthRequest } from "../../shared/request";
import { Response } from "../../shared/response";
import AuthenticateController from "../contract/Auth/AuthenticateController";
import { Authenticate } from "../contract/Auth/Authenticate";

type Action<Request, Response> =
    (request: Request, ...params: any[]) => Response | Promise<Response>

export default class $AuthenticateController
    extends AuthenticateController<AuthRequest, Response> {

    @Inject
    authenticate!: Authenticate;


    protected invoke(): never {
        throw new Error("Method not implemented.");
    }


    async registration(request: AuthRequest) {
        if (request.type !== "login")
            throw new Error("wrong request type");
        await this.authenticate.register(request.payload);
        return {
            type: "login-success",
            data: {}
        }
    }


    async login(request: AuthRequest) {
        if (request.type !== "login")
            throw new Error("wrong request type");
        const { username, password } = request.payload;
        await this.authenticate.login(username, password);
        return {
            type: "login-success",
            data: {}
        }
    }


    private actionMap: { [K: string]: Action<AuthRequest, Response> } = {
        registration: this.registration,
        login: this.login
    };


    public async callAction(request: AuthRequest, method: string) {
        if (!method)
            return await this.invoke();

        if (this.actionMap[method])
            return await this.actionMap[method](request);

        else
            throw Error("there is no method by this name at Controller actionMap")
    }

}