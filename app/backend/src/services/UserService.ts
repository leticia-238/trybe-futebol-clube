import { IUserDB, IUserService } from '../interfaces/User';
import UnauthorizedError from '../errors/UnauthorizedError';
import User from '../database/models/User';
import { compareEncryptPassword } from '../utils/encrypt';

class UserService implements IUserService {
  private model = User;

  async getOne(payload: Partial<IUserDB>): Promise<IUserDB> {
    const user = await this.model.findOne({
      where: { ...payload },
      raw: true,
    });
    this.validateIfExists(user as IUserDB);
    return user as IUserDB;
  }

  // eslint-disable-next-line class-methods-use-this
  private validateIfExists(user: IUserDB): IUserDB {
    if (!user) throw new UnauthorizedError('Incorrect email or password');
    return user;
  }

  async validateRegisteredUser(email: string, password: string): Promise<IUserDB> {
    const user = await this.getOne({ email });
    const dbHashPassword = user.password;
    const isValid = compareEncryptPassword(password, dbHashPassword);
    if (!isValid) throw new UnauthorizedError('Incorrect email or password');
    return user;
  }
}

export default UserService;
