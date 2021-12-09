import { injectable } from "inversify";

import Controller from "../functions/controller.decorator";
import { Get } from "../functions/handler.decorator";

@injectable()
@Controller("/user")
export default class UserController {
  constructor() {}

  @Get("")
  async getUsers() {
    return [{ name: "Somnath Halder" }];
  }
}
