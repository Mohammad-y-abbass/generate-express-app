import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationChain } from 'express-validator';
import ValidationError from '../errorHandlers/ValidationError';

export function ValidateBody(validations: ValidationChain[]) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (
      req: Request,
      res: Response,
      next: NextFunction
    ) {
      await Promise.all(validations.map((validation) => validation.run(req)));

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(new ValidationError('Validation failed', errors.array()));
      }

      return originalMethod.apply(this, [req, res, next]);
    };
  };
}
