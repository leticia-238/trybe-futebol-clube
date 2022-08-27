export type RoleType = 'admin' | 'user';

export interface IUser {
  id: number,
  username: string,
  role: RoleType,
  email: string,
}

export interface IUserDB extends IUser {
  password: string
}

export type IUserLogin = Pick<IUserDB, 'email' | 'password'>;

export type GetterUser<T> = (user: T) => Promise<IUserDB>;

export interface IUserService {
  getOne: GetterUser<Partial<IUserDB>>,
  validateRegisteredUser: GetterUser<IUserLogin>,
  validateIfExists(user: IUserDB): IUserDB
}
