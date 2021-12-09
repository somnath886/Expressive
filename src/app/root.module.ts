import MongoDBConnection from "../database/mongodb.connection";
import DefaultInterceptor from "../helpers/default.interceptor";
import HttpExceptionFilter from "../helpers/http.exception.filter";
import LogMiddleware from "../middlewares/log.middleware";
import PostSchema from "../models/post/post.schema";
import PostRepository from "../repository/post/post.repository";
import PostSchemaFactory from "../repository/post/post.schema.factory";
import PostController from "../routes/post.controller";
import UserController from "../routes/user.controller";
import LoggerService from "../services/log/logger.service";

const RootModule = {
  controllers: [
    { key: "USER_CONTROLLER", useClass: UserController },
    { key: "POST_CONTROLLER", useClass: PostController },
  ],
  services: [{ key: "LOGGER_SERVICE", useClass: LoggerService }],
  middlewares: [{ key: "LOG_MIDDLEWARE", useClass: LogMiddleware }],
  interceptor: { key: "APP_INTERCEPTOR", useClass: DefaultInterceptor },
  exceptionFilters: [
    { key: "HTTP_EXCEPTION_FILTER", useClass: HttpExceptionFilter },
  ],
  database: { key: "MONGODB_DATABASE", useClass: MongoDBConnection },
  repositories: [{ key: "POST_REPOSITORY", useClass: PostRepository }],
  factories: [{ key: "POST_FACTORY", useClass: PostSchemaFactory }],
  models: [{ key: "POST_MODEL", useClass: PostSchema }],
};

export { RootModule };
