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

export interface IUserService {
  getOne(payload: Partial<IUserDB>): Promise<IUserDB>,
  validateRegisteredUser(email: string, password: string): Promise<IUserDB>
}
