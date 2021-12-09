import AppBootstrap from "./app/app.bootstrap";
import container from "./container";
import databaseTypes from "./database/types";
import IDatabaseConnection from "./interfaces/database.connection.interface";
import ILoggerService from "./services/log/logger.interface";
import serviceTypes from "./services/types";

const loggerService = container.get<ILoggerService>(
  serviceTypes.LOGGER_SERVICE
);
const database = container.get<IDatabaseConnection>(
  databaseTypes.MONGODB_DATABASE
);

new AppBootstrap(loggerService, database).startApplication();
