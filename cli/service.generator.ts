import fs from "fs";

import serviceTypes from "../src/services/types";

export default function generateService(serviceName: string) {
  if (!checkIfServiceNameTaken(serviceName)) {
    fs.mkdir(`src/services/${serviceName}`, function (err) {
      console.log(err);
    });
    createInterface(serviceName);
    createClass(serviceName);

    let obj = "";
    for (const key in serviceTypes) {
      obj += `${key}: Symbol.for("${key}"),\n`;
    }

    const toAdd = `${serviceName.toUpperCase()}_SERVICE: Symbol.for("${serviceName.toUpperCase()}_SERVICE")`;
    obj += toAdd;

    fs.writeFileSync(
      "src/services/types.ts",
      `const serviceTypes = {${obj}}; export default serviceTypes`,
      "utf-8"
    );
  } else {
    console.log("service name taken!");
  }
}

function createInterface(name: string) {
  const template = `export default interface I${
    name[0].toUpperCase() + name.slice(1)
  }Service {};`;

  fs.writeFileSync(
    `src/services/${name}/${name}.interface.ts`,
    template,
    "utf-8"
  );
}

function createClass(name: string) {
  const template = `import "reflect-metadata";
import { injectable } from "inversify";

import I${
    name[0].toUpperCase() + name.slice(1)
  }Service from "./${name}.interface";

@injectable()
export default class ${
    name[0].toUpperCase() + name.slice(1)
  }Service implements I${name[0].toUpperCase() + name.slice(1)}Service {};
`;

  fs.writeFileSync(
    `src/services/${name}/${name}.service.ts`,
    template,
    "utf-8"
  );
}

function checkIfServiceNameTaken(name: string) {
  for (const key in serviceTypes) {
    if (name.toUpperCase() === key.split("_")[0].toUpperCase()) {
      return true;
    }
  }
  return false;
}
