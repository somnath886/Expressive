import bodyParser from "body-parser";
import express, { Router } from "express";
import "reflect-metadata";
import "dotenv/config";

import { MetadataKeys } from "../constants/metadata.keys";
import container from "../container";
import { IRouter } from "../functions/handler.decorator";
import IExpressiveInterceptor from "../interfaces/interceptor.interface";
import IExpressiveMiddleware from "../interfaces/middleware.interface";
import MiddlewareObject from "../middlewares/middleware.object";
import middlewareTypes from "../middlewares/types";
import ILoggerService from "../services/log/logger.interface";
import { RootModule } from "./root.module";
import helperTypes from "../helpers/types";
import controllerTypes from "../routes/types";
import IDatabaseConnection from "../interfaces/database.connection.interface";

export default class AppBootstrap {
  private _loggerService: ILoggerService;
  private _database: IDatabaseConnection;
  private _interceptor = container.get<IExpressiveInterceptor>(
    helperTypes.APP_INTERCEPTOR
  );
  private _controllerList = RootModule.controllers.map(({ useClass, key }) =>
    container.get<typeof useClass>(controllerTypes[key])
  );
  private _middlewareList = RootModule.middlewares.map(({ key }) =>
    container.get<IExpressiveMiddleware>(middlewareTypes[key])
  );
  private _expressApplication = express();

  constructor(loggerService: ILoggerService, database: IDatabaseConnection) {
    this._loggerService = loggerService;
    this._database = database;
    this._expressApplication.use(bodyParser.urlencoded({ extended: false }));
    this._expressApplication.use(bodyParser.json());
  }

  async startApplication() {
    this._registerRoutes();
    await this._database.connect();
    this._expressApplication.listen(process.env.PORT, () => {
      this._startLogs();
    });
  }

  private _registerRoutes() {
    this._controllerList.forEach((controller) => {
      const findController = RootModule.controllers.find(
        ({ useClass }) => controller instanceof useClass
      );
      const basePath = Reflect.getMetadata(
        MetadataKeys.BASE_PATH,
        findController.useClass
      );
      const instance = controller;
      const routes: Array<IRouter> = Reflect.getMetadata(
        MetadataKeys.ROUTERS,
        findController.useClass
      );
      const router = express.Router();

      this._expressApplication.use(
        basePath,
        this._handleRouteMethods(instance, router, routes)
      );
    });
  }

  private _handleRouteMethods(
    instance: Object,
    router: Router,
    routes: Array<IRouter>
  ) {
    routes.forEach(({ method, path, handlerName }) => {
      console.log(path);
      const middlewares = MiddlewareObject.filter(
        ({ appliedControllers, appliedMethods }) => {
          const matchControllers = appliedControllers.includes(
            instance.constructor.name
          );
          const matchMethods = appliedMethods.includes(method);
          return matchControllers && matchMethods;
        }
      );
      const interfacedMiddlewares = this._middlewareList.filter(
        (middleware) => {
          return (
            middlewares.filter((m) => middleware instanceof m.useClass)
              .length === 1
          );
        }
      );

      const intercepted = this._interceptor.intercept(
        instance,
        String(handlerName)
      );

      router[method](`${path}`, (req, res, next) => {
        interfacedMiddlewares.forEach((m) => m.use(req, res));
        const promise = Promise.resolve(intercepted(req, res, next));
        promise.then((toSend) => res.send(toSend));
      });
    });

    return router;
  }

  private _startLogs() {
    const { orange, fuchsia, info, gold } = this._loggerService.getLogStyle();
    this._loggerService.customLog([
      { text: "[APP_MODULE]", color: orange },
      { text: `[${this.constructor.name}] initialized`, color: orange },
    ]);
    RootModule.services.forEach((service) => {
      this._loggerService.customLog([
        {
          text: `[${service.key}]`,
          color: gold,
        },
        {
          text: `[${service.useClass.name}]`,
          color: gold,
        },
      ]);
    });
    RootModule.controllers.forEach((Controller) => {
      const basePath = Reflect.getMetadata(
        MetadataKeys.BASE_PATH,
        Controller.useClass
      );
      const routes: Array<IRouter> = Reflect.getMetadata(
        MetadataKeys.ROUTERS,
        Controller.useClass
      );
      routes.forEach(({ method, path }) => {
        this._loggerService.customLog([
          {
            text: `[${
              Controller.useClass.name
            }] ${method.toLocaleUpperCase()}/ Mapped to {${basePath + path}}`,
            color: info,
          },
        ]);
      });
    });
    this._loggerService.customLog([
      { text: "Application Has Started", color: fuchsia },
    ]);
    this._loggerService.customLog([
      {
        text: `Server Running on ${process.env.HOST}:${process.env.PORT}`,
        color: info,
      },
    ]);
  }
}
