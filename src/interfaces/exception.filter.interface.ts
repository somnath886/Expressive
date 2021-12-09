import { HttpStatus } from "../constants/http.status.enum";

export default interface IExceptionFilter {
  handle(
    methodName: string,
    statusCode: HttpStatus,
    error: Error,
    errorMessage: Object | Array<any>,
    instance: Object,
    errorSeverity: "error" | "fatal",
    path: string
  ): Object;
}
