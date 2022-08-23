// import * as Joi from 'joi';
import { IUser } from '../interfaces/User';
// import User from '../database/models/User';
import ValidationError from '../errors/ValidationError';
import UnauthorizedError from '../errors/UnauthorizedError';

class UserService {
  // static async findOne(payload: IUser): Promise<IUser> {
  //   const user = await User.findOne({
  //     where: { ...payload },
  //     attributes: { exclude: ['password'] },
  //     raw: true,
  //   });
  //   return user as IUser;
  // }

  static async validateSigninPayload(payload: IUser): Promise<void> {
    const hasKeys = 'email' in payload && 'password' in payload;
    if (!hasKeys) throw new ValidationError('All fields must be filled');

    const { email, password } = payload;
    const isString = typeof email === 'string' && typeof password === 'string';
    // regex copiado da seguinte fonte: https://regexr.com/3e48o
    const validEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
    const validPassword = password.length > 6;

    if (!isString || !validEmail || !validPassword) {
      throw new UnauthorizedError('Incorrect email or password');
    }
  }
}

export default UserService;
