import { Request } from 'express';
import { validationResult } from 'express-validator';
import ValidationError from '../../errors/ValidationError';

const validateRequest = (req: Request, message?: string) => {
  const errors = validationResult(req).formatWith(({ msg }) => msg);
  if (!errors.isEmpty()) {
    const errorMessage = message || errors.array();
    throw new ValidationError(`${errorMessage}`);
  }
};

export default validateRequest;
