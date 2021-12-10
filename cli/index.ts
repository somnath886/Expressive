import * as yargs from "yargs";

import generateController from "./controller.generate";
import generateService from "./service.generator";

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
  generateController(args["controller"]);
} else if (args["service"]) {
  generateService(args["service"]);
}
