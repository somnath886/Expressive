import fs from "fs";
import controllerTypes from "../src/routes/types";

const generateTemplate = (name: string) => {
  return `
import { injectable } from "inversify";

import Controller from "../functions/controller.decorator";

@injectable()
@Controller("/${name.toLowerCase()}")
export default class ${name[0].toUpperCase() + name.slice(1)}Controller {
  constructor() {}
}
	`;
};

export default function generateController(controllerName: string) {
  if (!checkIfControllerNameTaken(controllerName)) {
    fs.writeFile(
      `src/routes/${controllerName.toLowerCase()}.controller.ts`,
      generateTemplate(controllerName),
      (err) => console.log(err)
    );

    let obj = "";
    for (const key in controllerTypes) {
      obj += `${key}: Symbol.for("${key}"),\n`;
    }

    obj += `${controllerName.toUpperCase()}_CONTROLLER: Symbol.for("${controllerName.toUpperCase()}_CONTROLLER")`;

    fs.writeFileSync(
      "src/routes/types.ts",
      `const controllerTypes = {\n${obj}};\n export default controllerTypes`,
      "utf-8"
    );
  } else {
    console.log("controller name taken!");
  }
}

function checkIfControllerNameTaken(name: string) {
  for (const key in controllerTypes) {
    if (name.toUpperCase() === key.split("_")[0].toUpperCase()) {
      return true;
    }
  }
  return false;
}
