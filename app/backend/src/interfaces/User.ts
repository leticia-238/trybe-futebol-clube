export type RoleType = 'admin' | 'user';

export interface IUserLogin {
  email: string,
  password: string
}

export interface IUser extends IUserLogin {
  id: number,
  username: string,
  role: RoleType,
}

export interface IUserService {
  validateRegisteredUser(email: string, password: string): Promise<IUser>
}
