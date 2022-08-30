export type RoleType = 'admin' | 'user';

export interface IUser {
  id: number,
  username: string,
  role: RoleType,
  email: string,
}
