import UnauthorizedError from '../errors/UnauthorizedError';
import User from '../database/models/User';
import { compareEncryptPassword } from '../utils/encrypt';
import { GetUser, IUserService } from '../interfaces/IUserService';
import { IUserWithPassword } from '../interfaces/IUserWithPassword';

class UserService implements IUserService {
  private model = User;

  getByEmailAndPassword: GetUser = async (email, password) => {
    const user = await this.model.findOne({
      where: { email, password },
      raw: true,
    });
    return user as IUserWithPassword;
  };

  validateRegisteredUser: GetUser = async (email, password) => {
    const user = await this.getByEmailAndPassword(email, password);
    this.validateIfExists(user);
    const dbHashPassword = user.password;
    this.validateDbPassword(password, dbHashPassword);
    return user;
  };

  validateIfExists = (user: IUserWithPassword): void => {
    if (!user) throw new UnauthorizedError('Incorrect email or password');
  };

  validateDbPassword = (password: string, dbHashPassword: string): void => {
    const isValid = compareEncryptPassword(password, dbHashPassword);
    if (!isValid) throw new UnauthorizedError('Incorrect email or password');
  };
}

export default UserService;
