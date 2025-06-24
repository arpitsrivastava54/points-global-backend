import { NextFunction, Request, Response } from "express";

export const asyncWrapper = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
  try {
    return fn(req, res, next);
  } catch (error) {
    next(error);
  }
}