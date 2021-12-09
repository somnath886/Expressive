export default interface IExpressiveInterceptor {
  intercept(target: any, propertyKey: string): any;
}
