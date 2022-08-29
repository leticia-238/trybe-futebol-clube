import { Request } from 'express';
import validateRequest from '../utils/validations';
import UnauthorizedError from '../errors/UnauthorizedError';
import User from '../database/models/User';
import { compareEncryptPassword } from '../utils/encrypt';
import { IUserLogin, IUserService } from '../interfaces/IUserService';
import { IUserWithPassword } from '../interfaces/IUserWithPassword';

class UserService implements IUserService {
  private model = User;
  private unauthorizedErrorMsg = 'Incorrect email or password';

  getByEmail = async (email: string) => {
    const user = await this.model.findOne({
      where: { email },
      raw: true,
    });
    return user as IUserWithPassword;
  };

  validateRegisteredUser = async (email: string, password: string) => {
    const user = await this.getByEmail(email);
    this.validateIfExists(user);
    const dbHashPassword = user.password;
    this.validateDbPassword(password, dbHashPassword);
    return user;
  };

  validateIfExists = (user: IUserWithPassword): void => {
    if (!user) throw new UnauthorizedError(this.unauthorizedErrorMsg);
  };

  validateDbPassword = (password: string, dbHashPassword: string): void => {
    const isValid = compareEncryptPassword(password, dbHashPassword);
    if (!isValid) throw new UnauthorizedError(this.unauthorizedErrorMsg);
  };

  validateBody = (req: Request): IUserLogin => {
    try {
      validateRequest(req);
    } catch (error) {
      const err = error as Error;
      if (err.message === this.unauthorizedErrorMsg) {
        throw new UnauthorizedError(err.message);
      }
      throw error;
    }
    const { email, password } = req.body;
    return { email, password };
  };
}

export default UserService;
