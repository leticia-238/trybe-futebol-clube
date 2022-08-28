import { IUserWithPassword } from './IUserWithPassword';

export type IUserLogin = Pick<IUserWithPassword, 'email' | 'password'>;

export type GetUser = (email: string, password: string) => Promise<IUserWithPassword>;

export interface IUserService {
  getByEmailAndPassword: GetUser
  validateRegisteredUser: GetUser
  validateIfExists(user: IUserWithPassword): void
  validateDbPassword(password: string, dbHashPassword: string): void
}
