import { Request } from 'express';
import { IUserWithPassword } from './IUserWithPassword';

export interface RequestWithDecodedJwt extends Request {
  decodedData?: Pick<IUserWithPassword, 'role'>
}
