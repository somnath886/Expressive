import { Container } from "inversify";

import { RootModule } from "../app/root.module";
import databaseTypes from "../database/types";
import helperTypes from "../helpers/types";
import middlewareTypes from "../middlewares/types";
import modelTypes from "../models/types";
import { factoryTypes, repositoryTypes } from "../repository/types";
import controllerTypes from "../routes/types";
import serviceTypes from "../services/types";

const container = new Container();

RootModule.controllers.forEach(({ key, useClass }) =>
  container.bind(controllerTypes[key]).to(useClass)
);

RootModule.services.forEach(({ key, useClass }) =>
  container.bind(serviceTypes[key]).to(useClass)
);

RootModule.middlewares.forEach(({ key, useClass }) =>
  container.bind(middlewareTypes[key]).to(useClass)
);

container
  .bind(helperTypes[RootModule.interceptor.key])
  .to(RootModule.interceptor.useClass);

RootModule.exceptionFilters.forEach(({ key, useClass }) =>
  container.bind(helperTypes[key]).to(useClass)
);

container
  .bind(databaseTypes[RootModule.database.key])
  .to(RootModule.database.useClass);

RootModule.repositories.forEach((repository) =>
  container
    .bind(repositoryTypes[repository.key])
    .to(repository.useClass)
    .inRequestScope()
);

RootModule.factories.forEach((factory) =>
  container.bind(factoryTypes[factory.key]).to(factory.useClass)
);

RootModule.models.forEach((model) =>
  container.bind(modelTypes[model.key]).to(model.useClass)
);

export default container;
