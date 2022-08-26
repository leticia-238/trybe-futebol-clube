import { encryptPassword } from '../../utils/encrypt';
import { IUserDB } from '../../interfaces/User';

export const validEmail = 'email@email.com';
export const validPassword = '123456abc';
export const hashPassword = encryptPassword(validPassword);

export const mockUserLogin: IUserDB = {
  id: 1,
  username: 'user',
  role: 'admin',
  email: validEmail,
  password: hashPassword,
};

export const mockUserToken = 'token123456';
