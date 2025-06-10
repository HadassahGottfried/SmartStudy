import { Request, Response, NextFunction } from 'express';
import { ZodType, ZodTypeAny } from 'zod'; // שים לב לאות קטנה ב-zod

interface ValidateRequestOptions {
  bodySchema?: ZodTypeAny;
  paramsSchema?: ZodTypeAny;
}

export function validateRequest(options: ValidateRequestOptions) {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (options.paramsSchema) {
      const paramsResult = options.paramsSchema.safeParse(req.params);
      if (!paramsResult.success) {
        res.status(400).json({ message: paramsResult.error.errors[0].message });
        return;
      }
      req.params = paramsResult.data;
    }

    if (options.bodySchema) {
      const bodyResult = options.bodySchema.safeParse(req.body);
      if (!bodyResult.success) {
        res.status(400).json({ message: bodyResult.error.errors[0].message });
        return;
      }
      req.body = bodyResult.data;
    }

    next();
  };
}
