import "reflect-metadata";
import { injectable } from "inversify";

import ICatsService from "./cats.interface";

@injectable()
export default class CatsService implements ICatsService {
  sayHello(): object {
    return { msg: "cats say hello" };
  }
}
