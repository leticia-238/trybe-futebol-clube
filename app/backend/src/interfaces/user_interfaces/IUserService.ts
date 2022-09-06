import { Request } from 'express';
import CustomError from '../../errors/CustomError';
import { IUserWithPassword, UserLogin } from './IUser';

export interface IUserService {
  validateRegisteredUser(email: string, password: string): Promise<IUserWithPassword>
  validateIfExists(user: IUserWithPassword, error: CustomError): void
  validateLoginBody(req: Request): UserLogin
}
