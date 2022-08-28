import { IUserWithPassword } from '../../interfaces/IUserWithPassword';
import { encryptPassword } from '../../utils/encrypt';
import { validEmail, validPassword, validRole } from '../data/login';

export const hashPassword = encryptPassword(validPassword);

export const userDb: IUserWithPassword = {
  id: 1,
  username: 'user',
  role: validRole,
  email: validEmail,
  password: hashPassword,
};

export const userToken = 'token123456';
