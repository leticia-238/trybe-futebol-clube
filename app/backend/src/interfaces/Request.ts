import { Request } from 'express';
import { RoleType } from './User';

export interface RequestWithDecodedJwt extends Request {
  decodedData?: { role: RoleType }
}
