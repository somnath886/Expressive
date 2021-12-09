import "reflect-metadata";
import { injectable } from "inversify";
import chalk from "chalk";
import dayjs from "dayjs";

import ILoggerService from "./logger.interface";
import styleObject from "./logger.style.object";
import { APPLICATION_NAME } from "../../constants/application.name";
import { TRGB } from "../../types/logger";

@injectable()
export default class LoggerService implements ILoggerService {
  private _styleObject = styleObject;

  customLog(textList: Array<{ text: string; color: TRGB }>) {
    const { chartreuse, beige } = this._styleObject;
    const defaultLogs = this._defaultInfoLogs([chartreuse, beige]);
    const custom = textList.map(({ text, color }) =>
      chalk.rgb(color.red, color.green, color.blue)(text)
    );
    console.log(...defaultLogs, ...custom);
  }

  interceptorLog(interceptorName: string, msg: string) {
    const { intercept } = this._styleObject;
    const defaultLogs = this._defaultInfoLogs([intercept, intercept]);
    const interceptedSection = chalk.rgb(
      intercept.red,
      intercept.green,
      intercept.blue
    )(`[APP_INTERCEPTOR] [${interceptorName}] - ${msg}`);
    console.log(...defaultLogs, interceptedSection);
  }

  debugLog(instanceName: string, obj: any) {
    const { debug } = this._styleObject;
    const defaultLogs = this._defaultInfoLogs([debug, debug]);
    const debugSection = chalk.rgb(
      debug.red,
      debug.green,
      debug.blue
    )(`[DEBUG_INFO] - Called From [${instanceName}]`);
    console.log(...defaultLogs, debugSection);
    console.log(obj);
  }

  errorLog(
    methodName: string,
    instanceName: string,
    errorType: string,
    error: Error,
    errorSeverity: TRGB
  ) {
    const defaultLogs = this._defaultInfoLogs([errorSeverity, errorSeverity]);
    const errorSection = chalk.rgb(
      errorSeverity.red,
      errorSeverity.green,
      errorSeverity.blue
    )(
      `[${errorType.toLocaleUpperCase()}] Called From [${instanceName}] ${methodName.toLocaleUpperCase()}`
    );
    console.log(...defaultLogs, errorSection);
    console.trace(error);
  }

  getLogStyle() {
    return this._styleObject;
  }

  private _defaultInfoLogs([colorOne, colorTwo]: Array<TRGB>) {
    const defaultInfo = [
      chalk.rgb(
        colorOne.red,
        colorOne.green,
        colorOne.blue
      )(`[${APPLICATION_NAME}]`),
      chalk.rgb(colorTwo.red, colorOne.green, colorOne.blue)(process.pid),
      chalk.rgb(
        colorTwo.red,
        colorTwo.green,
        colorTwo.blue
      )(`-- ${dayjs().format("YYYY-MM-DDTHH:mm:ssZ[Z]")} --`),
    ];
    return defaultInfo;
  }
}
