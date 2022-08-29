import { Request } from 'express';
import { IUserWithPassword } from './IUserWithPassword';

export type IUserLogin = Pick<IUserWithPassword, 'email' | 'password'>;

export interface IUserService {
  getByEmail(email: string): Promise<IUserWithPassword>
  validateRegisteredUser(email: string, password: string): Promise<IUserWithPassword>
  validateIfExists(user: IUserWithPassword): void
  validateDbPassword(password: string, dbHashPassword: string): void
  validateBody(req: Request): IUserLogin
}
