import { Request } from 'express';
import { validationResult } from 'express-validator';

const validateRequest = (req: Request) => {
  const errors = validationResult(req).formatWith(({ msg }) => msg);
  return errors;
};

export default validateRequest;
