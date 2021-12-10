import { injectable } from "inversify";

import Controller from "../functions/controller.decorator";
import { Get } from "../functions/handler.decorator";

@injectable()
@Controller("/dogs")
export default class DogsController {
  constructor() {}

  @Get("")
  getDogs() {
    return { msg: "dogs say hello" };
  }
}
