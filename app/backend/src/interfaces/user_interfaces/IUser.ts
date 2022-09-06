export type RoleType = 'admin' | 'user';

export interface IUser {
  id: number,
  username: string,
  role: RoleType,
  email: string,
}

export interface IUserWithPassword extends IUser {
  password: string
}

export type UserLogin = Pick<IUserWithPassword, 'email' | 'password'>;
