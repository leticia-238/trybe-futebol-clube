// import * as Joi from 'joi';
import { IUser } from '../interfaces/User';
import UnauthorizedError from '../errors/UnauthorizedError';
import User from '../database/models/User';
import { IUserService } from '../interfaces/Service';
import { compareEncryptPassword } from '../utils/encrypt';

class UserService implements IUserService {
  private model = User;

  async findUser(payload: Partial<IUser>): Promise<IUser> {
    const user = await this.model.findOne({
      where: { ...payload },
      raw: true,
    });
    return user as IUser;
  }

  async validateRegisteredUser(email: string, password: string): Promise<IUser> {
    const user = await this.findUser({ email });
    if (!user) throw new UnauthorizedError('Incorrect email or password');
    const dbHashPassword = user.password;
    const isValid = compareEncryptPassword(password, dbHashPassword);
    if (!isValid) throw new UnauthorizedError('Incorrect email or password');
    return user;
  }
}

export default UserService;
