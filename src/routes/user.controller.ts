import { Request } from "express";
import { inject, injectable } from "inversify";
import { HttpStatus } from "../constants/http.status.enum";

import Controller from "../functions/controller.decorator";
import { Get } from "../functions/handler.decorator";
import helperTypes from "../helpers/types";
import IExceptionFilter from "../interfaces/exception.filter.interface";

@injectable()
@Controller("/user")
export default class UserController {
  private _httpException: IExceptionFilter;
  constructor(
    @inject(helperTypes.HTTP_EXCEPTION_FILTER) httpException: IExceptionFilter
  ) {
    this._httpException = httpException;
  }

  @Get("")
  async getUsers() {
    return [{ name: "Somnath Halder" }];
  }

  @Get("/1")
  async getOne() {
    return { msg: "one" };
  }

  @Get("/error")
  async getError(req: Request) {
    try {
      this.throwError();
      return { msg: "Success" };
    } catch (error) {
      return this._httpException.handle(
        req.method,
        HttpStatus.INTERNAL_SERVER_ERROR,
        error,
        { msg: "Server Error" },
        this,
        "error",
        req.path
      );
    }
  }

  private throwError() {
    throw new Error("Server Error!");
  }
}
