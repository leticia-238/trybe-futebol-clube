import { GetterUser, IUserDB, IUserLogin, IUserService } from '../interfaces/User';
import UnauthorizedError from '../errors/UnauthorizedError';
import User from '../database/models/User';
import { compareEncryptPassword } from '../utils/encrypt';

class UserService implements IUserService {
  private model = User;

  getOne: GetterUser<Partial<IUserDB>> = async (payload) => {
    const user = await this.model.findOne({
      where: { ...payload },
      raw: true,
    });
    this.validateIfExists(user as IUserDB);
    return user as IUserDB;
  };

  validateRegisteredUser: GetterUser<IUserLogin> = async (userLogin) => {
    const user = await this.getOne({ email: userLogin.email });
    const dbHashPassword = user.password;
    const isValid = compareEncryptPassword(userLogin.password, dbHashPassword);
    if (!isValid) throw new UnauthorizedError('Incorrect email or password');
    return user;
  };

  validateIfExists = (user: IUserDB): IUserDB => {
    if (!user) throw new UnauthorizedError('Incorrect email or password');
    return user;
  };
}

export default UserService;
