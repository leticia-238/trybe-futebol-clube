import { Request } from 'express';
import { IUserWithPassword } from './user_interfaces/IUserWithPassword';

export interface RequestWithDecodedJwt extends Request {
  decodedData?: Pick<IUserWithPassword, 'role'>
}
