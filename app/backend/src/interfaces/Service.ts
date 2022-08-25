import { IUser } from './User';

export interface IUserService {
  validateRegisteredUser(email: string, password: string): Promise<IUser>
}
