import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import "reflect-metadata";

import IExpressiveMiddleware from "../interfaces/middleware.interface";
import ILoggerService from "../services/log/logger.interface";
import serviceTypes from "../services/types";

@injectable()
export default class LogMiddleware implements IExpressiveMiddleware {
  private _loggerService: ILoggerService;

  constructor(
    @inject(serviceTypes.LOGGER_SERVICE) loggerService: ILoggerService
  ) {
    this._loggerService = loggerService;
  }

  use(req: Request, res: Response) {
    this._loggerService.debugLog(this.constructor.name, {
      msg: "Log Middleware Called!",
    });
  }
}
