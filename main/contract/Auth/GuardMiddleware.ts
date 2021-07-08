import { Request } from "../../../shared/request";
import Middleware from "../Middleware";
import Guard from "./Guard";

export default abstract class GuardMiddleware extends Middleware<Request> {

    abstract setGuard(guard:Guard):void;
    
}