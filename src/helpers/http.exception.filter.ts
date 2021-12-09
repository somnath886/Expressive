import { inject, injectable } from "inversify";
import "reflect-metadata";

import IExceptionFilter from "../interfaces/exception.filter.interface";
import ILoggerService from "../services/log/logger.interface";
import serviceTypes from "../services/types";

@injectable()
export default class HttpExceptionFilter implements IExceptionFilter {
  private _loggerService: ILoggerService;

  constructor(
    @inject(serviceTypes.LOGGER_SERVICE) loggerService: ILoggerService
  ) {
    this._loggerService = loggerService;
  }

  handle(
    methodName: string,
    statusCode: number,
    error: Error,
    errorMessage: Object | Array<any>,
    instance: Object,
    errorSeverity: "error" | "fatal",
    path: string
  ) {
    const color =
      errorSeverity === "fatal"
        ? this._loggerService.getLogStyle().fatal
        : this._loggerService.getLogStyle().error;

    this._loggerService.errorLog(
      methodName,
      instance.constructor.name,
      "EXCEPTION_FILTER",
      error,
      color
    );

    return {
      method: methodName.toLocaleUpperCase(),
      path: path,
      severity: errorSeverity,
      statusCode: statusCode,
      error_response: errorMessage,
    };
  }
}
