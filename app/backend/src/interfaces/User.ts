export type RoleType = 'admin' | 'user';

export interface IUser {
  username: string,
  role: RoleType,
  email: string,
  password: string
}
