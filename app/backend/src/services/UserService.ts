import UnauthorizedError from '../errors/UnauthorizedError';
import User from '../database/models/User';
import { compareEncryptPassword } from '../utils/encrypt';
import { GetterUser, IUserLogin, IUserService } from '../interfaces/IUserService';
import { IUserWithPassword } from '../interfaces/IUserWithPassword';

class UserService implements IUserService {
  private model = User;

  getOne: GetterUser<Partial<IUserWithPassword>> = async (payload) => {
    const user = await this.model.findOne({
      where: { ...payload },
      raw: true,
    });
    this.validateIfExists(user as IUserWithPassword);
    return user as IUserWithPassword;
  };

  validateRegisteredUser: GetterUser<IUserLogin> = async (userLogin) => {
    const user = await this.getOne({ email: userLogin.email });
    const dbHashPassword = user.password;
    const isValid = compareEncryptPassword(userLogin.password, dbHashPassword);
    if (!isValid) throw new UnauthorizedError('Incorrect email or password');
    return user;
  };

  validateIfExists = (user: IUserWithPassword): IUserWithPassword => {
    if (!user) throw new UnauthorizedError('Incorrect email or password');
    return user;
  };
}

export default UserService;
