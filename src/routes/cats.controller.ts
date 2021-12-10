import { inject, injectable } from "inversify";
import ICatsService from "../services/cats/cats.interface";

import Controller from "../functions/controller.decorator";
import { Get } from "../functions/handler.decorator";
import serviceTypes from "../services/types";

@injectable()
@Controller("/cats")
export default class CatsController {
  private _catsService: ICatsService;
  constructor(@inject(serviceTypes.CATS_SERVICE) catsService: ICatsService) {
    this._catsService = catsService;
  }

  @Get("")
  getCats() {
    return this._catsService.sayHello();
  }
}
