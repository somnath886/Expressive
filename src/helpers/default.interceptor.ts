import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";
import "reflect-metadata";

import IExpressiveInterceptor from "../interfaces/interceptor.interface";
import ILoggerService from "../services/log/logger.interface";
import serviceTypes from "../services/types";

@injectable()
export default class DefaultInterceptor implements IExpressiveInterceptor {
  private _loggerService: ILoggerService;

  constructor(
    @inject(serviceTypes.LOGGER_SERVICE) loggerService: ILoggerService
  ) {
    this._loggerService = loggerService;
  }

  intercept(target: any, propertyKey: string) {
    const originalMethod = target[propertyKey];

    target[propertyKey] = async (
      ...args: [Request, Response, NextFunction]
    ) => {
      const start = Date.now();
      const result = await originalMethod.apply(target, args);
      const end = Date.now();
      this._loggerService.interceptorLog(
        this.constructor.name,
        `Took Time to Execute +${end - start}ms`
      );
      return result;
    };

    return target[propertyKey];
  }
}
