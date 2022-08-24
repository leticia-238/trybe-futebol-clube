// import * as Joi from 'joi';
import { IUser } from '../interfaces/User';
import User from '../database/models/User';
import ValidationError from '../errors/ValidationError';
import UnauthorizedError from '../errors/UnauthorizedError';
import { compareEncryptPassword } from '../utils/encrypt';

const invalidLoginMessage = 'Incorrect email or password';

class UserService {
  static async findOne(payload: IUser): Promise<IUser> {
    const { password } = payload;
    const userPayload = { email: payload.email };
    const user = await User.findOne({
      where: { ...userPayload },
      raw: true,
    });
    if (!user) throw new UnauthorizedError(invalidLoginMessage);
    if (!compareEncryptPassword(password, user.password)) {
      throw new UnauthorizedError(invalidLoginMessage);
    }
    return user as IUser;
  }

  static async validateSigninPayload(payload: IUser): Promise<void> {
    const hasKeys = 'email' in payload && 'password' in payload;
    if (!hasKeys) throw new ValidationError('All fields must be filled');

    const { email, password } = payload;
    const isEmpty = email.trim().length === 0 || password.trim().length === 0;
    if (isEmpty) throw new ValidationError('All fields must be filled');

    const isString = typeof email === 'string' && typeof password === 'string';
    if (!isString) throw new UnauthorizedError(invalidLoginMessage);

    // regex copiado da seguinte fonte: https://regexr.com/3e48o
    const validEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
    const validPassword = password.length > 6;
    if (!validEmail || !validPassword) {
      throw new UnauthorizedError(invalidLoginMessage);
    }
  }
}

export default UserService;
