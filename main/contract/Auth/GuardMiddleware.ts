import { Request } from "../../../shared/request";
import Middleware from "../Middleware";

export default abstract class GuardMiddleware extends Middleware<Request> {}