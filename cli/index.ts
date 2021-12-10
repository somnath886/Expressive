import * as yargs from "yargs";

import generateController from "./controller.generate";
import generateService from "./service.generator";
import stringCheck from "./utils/stringcheck";

const args = yargs
  .option("controller", {
    alias: "c",
    demand: false,
  })
  .option("service", {
    alias: "s",
    demand: false,
  }).argv;

if (args["controller"]) {
  if (stringCheck(args["controller"])) generateController(args["controller"]);
} else if (args["service"]) {
  if (stringCheck(args["service"])) generateService(args["service"]);
}
