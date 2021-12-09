import { TLoggerStyleObject, TRGB } from "../../types/logger";

export default interface ILoggerService {
  customLog(textList: Array<{ text: string; color: TRGB }>): void;
  interceptorLog(interceptorName: string, msg: string): void;
  debugLog(instanceName: string, obj: any): void;
  errorLog(
    methodName: string,
    instanceName: string,
    errorType: string,
    error: Error,
    errorSeverity: TRGB
  ): void;
  getLogStyle(): TLoggerStyleObject;
}
