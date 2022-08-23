// import * as Joi from 'joi';
import { IUser } from '../interfaces/User';
// import User from '../database/models/User';
import ValidationError from '../errors/ValidationError';

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
  }
}

export default UserService;
