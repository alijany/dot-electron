import { Request } from "../../shared/request";
import { Response } from "../../shared/response";
import Controller from "../contract/Controller";

type Action<Request, Response> =
    (request: Request, ...params: any[]) => Response | Promise<Response>

export default class $Controller extends Controller {

    protected invoke(request: Request, ...params: any[]) {
        return {
            type: "success",
            data: "welcome"
        }
    }


    protected async asyncInvoke(request: Request, ...params: any[]) {
        await new Promise(f => setTimeout(f, 5000));
        return {
            type: "success",
            data: "async: welcome " + params[0]
        }
    }


    private actionMap: { [K: string]: Action<Request, Response> } = {
        asyncInvoke: this.asyncInvoke
    };


    public async callAction(request: Request, method?: string, ...params: any[]) {
        if (!method)
            return await this.invoke(request, ...params);

        if (this.actionMap[method])
            return await this.actionMap[method](request, ...params);
        else
            throw Error("there is no method by this name at Controller actionMap")
    }

}