import { Inject } from "typescript-ioc";
import { AuthRequest } from "../../shared/request";
import { Response } from "../../shared/response";
import Authenticate from "../contract/Auth/Authenticate";
import AuthenticateController from "../contract/Auth/AuthenticateController";
import Guard from "../contract/Auth/Guard";

type Action<Request, Response> =
    (request: Request, ...params: any[]) => Response | Promise<Response>

export default class $AuthenticateController
    extends AuthenticateController<AuthRequest, Response> {

    @Inject
    authenticate!: Authenticate;

    @Inject
    guard!: Guard;


    protected invoke(): never {
        throw new Error("Method not implemented.");
    }


    async register(request: AuthRequest) {
        if (request.type !== "register")
            throw new Error("wrong request type");
        const user = await this.authenticate.register(request.data);
        const token = this.guard.addUser(user);
        return {
            type: "register-done",
            data: { token }
        }
    }


    async login(request: AuthRequest) {
        if (request.type !== "login")
            throw new Error("wrong request type");
        const { username, password } = request.data;
        const user = await this.authenticate.login(username, password);
        const token = this.guard.addUser(user);
        return {
            type: "login-done",
            data: { token }
        }
    }

    async logout(request: AuthRequest) {
        this.guard.removeUser(request.token!)
        return {
            type: "logout-done",
            data: {}
        }
    }


    private actionMap: { [K: string]: Action<AuthRequest, Response> } = {
        register: this.register,
        login: this.login,
        logout: this.logout
    };


    public async callAction(request: AuthRequest, method: string) {
        if (!method)
            return await this.invoke();

        if (this.actionMap[method])
            return await this.actionMap[method].call(this, request);

        else
            throw Error("there is no method by this name at Controller actionMap")
    }

}