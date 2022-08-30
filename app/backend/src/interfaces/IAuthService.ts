import { Request } from 'express';
import { IUserWithPassword } from './user_interfaces/IUserWithPassword';

export interface IAuthService {
  generateToken(payload: IUserWithPassword): string
  verifyToken(token: string): IUserWithPassword
  validateAuthHeader(req: Request): string
}
