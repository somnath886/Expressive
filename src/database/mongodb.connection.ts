import mongoose from "mongoose";
import { inject, injectable } from "inversify";
import "reflect-metadata";

import IDatabaseConnection from "../interfaces/database.connection.interface";
import serviceTypes from "../services/types";
import ILoggerService from "../services/log/logger.interface";

@injectable()
export default class MongoDBConnection implements IDatabaseConnection {
  private _loggerService: ILoggerService;

  constructor(
    @inject(serviceTypes.LOGGER_SERVICE) loggerService: ILoggerService
  ) {
    this._loggerService = loggerService;
  }

  async connect() {
    await mongoose.connect(
      `${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DATABASE}`
    );
    const colors = this._loggerService.getLogStyle();
    this._loggerService.customLog([
      { text: `[${this.constructor.name}]`, color: colors.chartreuse },
      {
        text: `connected to mongodb database (${process.env.MONGODB_DATABASE})`,
        color: colors.chartreuse,
      },
    ]);
  }
}
