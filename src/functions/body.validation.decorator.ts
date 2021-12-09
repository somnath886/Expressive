import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../constants/http.status.enum";

import HttpExceptionFilter from "../helpers/http.exception.filter";
import LoggerService from "../services/log/logger.service";

const BodyValidation = (to: any) => {
  const httpException = new HttpExceptionFilter(new LoggerService());
  return (
    target: Object,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) => {
    const originalMethod = descriptor.value;

    descriptor.value = async function (
      ...args: [Request, Response, NextFunction]
    ) {
      const obj = plainToInstance(to, args[0].body);
      try {
        const res = await validate(obj as object);
        if (res.length > 0) {
          return httpException.handle(
            args[0].method,
            HttpStatus.BAD_REQUEST,
            new Error(JSON.stringify(res)),
            { msg: res },
            target,
            "error",
            args[0].path
          );
        } else {
          const newArgs = [args[0].body, ...args];
          return originalMethod.apply(this, newArgs);
        }
      } catch (error) {
        httpException.handle(
          args[0].method,
          HttpStatus.INTERNAL_SERVER_ERROR,
          error,
          { msg: "Server Error" },
          target,
          "error",
          args[0].path
        );
      }
    };
    return descriptor;
  };
};

export default BodyValidation;
