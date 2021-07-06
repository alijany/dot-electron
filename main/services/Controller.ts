import { Response } from "../../shared/response";
import Controller from "../contract/Controller";

type Action<Response> = (...params: any[]) => Response | Promise<Response>

export default class $Controller extends Controller {

    protected invoke(...params: any[]) {
        return {
            type: "success",
            data: "welcome"
        }
    }


    protected async asyncInvoke(...params: any[]) {
        await new Promise(f => setTimeout(f, 5000));
        return {
            type: "success",
            data: "async: welcome " + params[0]
        }
    }


    private actionMap: { [K: string]: Action<Response> } = {
        asyncInvoke: this.asyncInvoke
    };


    public async callAction(method?: string, params: any[] = []) {
        if (!method)
            return await this.invoke(...params);

        if (this.actionMap[method])
            return await this.actionMap[method](...params);
        else
            throw Error("there is no method by this name at Controller actionMap")
    }

}