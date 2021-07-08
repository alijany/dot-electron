import { Request } from "../../../shared/request";
import Middleware from "../Middleware";
import Gate from "./Gate";


export default abstract class GateMiddleware extends Middleware<Request> {

    abstract setGate(guard: Gate): void;
    
}