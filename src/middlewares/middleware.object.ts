import LogMiddleware from "./log.middleware";
import { Methods } from "../constants/http.methods";

const MiddlewareObject = [
  {
    useClass: LogMiddleware,
    appliedControllers: ["UserController"],
    appliedMethods: [Methods.GET],
  },
];

export default MiddlewareObject;
