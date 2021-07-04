import { Response } from "../../shared/response";
import Controller from "../contract/Controller";

export default class $Controller extends Controller<Response> {

    protected invoke(params?: any[]) { // TODO test param
        return {
            type: "success",
            data: "welcome"
        }
    }


    public callAction(method?: string, params?: any[]) {
        if (!method)
            return this.invoke(params)
        return {
            type: "success",
            data: "welcome"
        }
    }

}