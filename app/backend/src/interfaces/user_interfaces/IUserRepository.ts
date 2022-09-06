import { IUserWithPassword } from './IUser';

export interface IUserRepository {
  findByEmail(email: string): Promise<IUserWithPassword>
}
