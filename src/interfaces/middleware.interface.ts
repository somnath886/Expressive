import { Request, Response } from "express";

export default interface IExpressiveMiddleware {
  use(req: Request, res: Response): void;
}
