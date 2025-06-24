import { NextFunction, Request, Response } from "express";
import { ZodError, ZodType } from "zod";

export const zodMiddleware = (schema: ZodType<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (err: any) {
      if (err instanceof ZodError) {
        res.status(400).json({
          message: "Validation failed",
          errors: err.errors,
        });
      } else {
        res.status(400).json({
          message: "An error occurred during validation",
          error: err.message,
        });
      }
    }
  };
};
