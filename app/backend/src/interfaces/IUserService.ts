import { IUserWithPassword } from './IUserWithPassword';

export type GetterUser<T> = (user: T) => Promise<IUserWithPassword>;

export type IUserLogin = Pick<IUserWithPassword, 'email' | 'password'>;

export interface IUserService {
  getOne: GetterUser<Partial<IUserWithPassword>>,
  validateRegisteredUser: GetterUser<IUserLogin>,
  validateIfExists(user: IUserWithPassword): IUserWithPassword
}
