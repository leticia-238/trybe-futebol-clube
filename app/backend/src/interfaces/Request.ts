import { Request } from 'express';
import { IUserWithPassword } from './user_interfaces';

export interface RequestWithDecodedJwt extends Request {
  decodedData?: Pick<IUserWithPassword, 'role'>
}
