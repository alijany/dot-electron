import { Inject } from "typescript-ioc";
import { AuthRequest } from "../../shared/request";
import { Response } from "../../shared/response";
import Authenticate from "../contract/Auth/Authenticate";
import AuthenticateController from "../contract/Auth/AuthenticateController";
import User from "../contract/model/User";

type Action<Request, Response> =
    (request: Request, ...params: any[]) => Response | Promise<Response>

export default class $AuthenticateController
    extends AuthenticateController<AuthRequest, Response> {

    @Inject
    authenticate!: Authenticate;

    private user?: User;


    getUser() {
        return this.user;
    }


    protected invoke(): never {
        throw new Error("Method not implemented.");
    }


    async register(request: AuthRequest) {
        if (request.type !== "register")
            throw new Error("wrong request type");

        this.user = await this.authenticate.register(request.data);
        return {
            type: "register-done",
            data: {}
        }
    }


    async login(request: AuthRequest) {
        if (request.type !== "login")
            throw new Error("wrong request type");
        const { username, password } = request.data;
        this.user = await this.authenticate.login(username, password);
        return {
            type: "login-done",
            data: {}
        }
    }

    async logout(request: AuthRequest) {
        if (request.type !== "logout")
            throw new Error("wrong request type");
        // TODO use token
        this.user = undefined;
        return {
            type: "logout-done",
            data: {}
        }
    }


    private actionMap: { [K: string]: Action<AuthRequest, Response> } = {
        register: this.register,
        login: this.login
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