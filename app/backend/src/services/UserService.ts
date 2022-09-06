import { Request } from 'express';
import validateRequest from './utils/validateRequest';
import { compareEncryptPassword } from './utils/encrypt';
import { IUserRepository, IUserService, IUserWithPassword,
  UserLogin } from '../interfaces/user_interfaces';
import { CustomError, UnauthorizedError, ValidationError } from '../errors';

class UserService implements IUserService {
  constructor(private userRepository: IUserRepository) {}

  validateRegisteredUser = async (email: string, password: string) => {
    const user = await this.userRepository.findByEmail(email);
    const error = new UnauthorizedError('Incorrect email or password');
    this.validateIfExists(user, error);
    const dbHashPassword = user.password;
    this.validateDbPassword(password, dbHashPassword, error);
    return user;
  };

  validateIfExists = (user: IUserWithPassword, error: CustomError): void => {
    if (!user) throw error;
  };

  private validateDbPassword = (
    password: string,
    dbHashPassword: string,
    error: CustomError,
  ): void => {
    const isValid = compareEncryptPassword(password, dbHashPassword);
    if (!isValid) throw error;
  };

  validateLoginBody = (req: Request): UserLogin => {
    const errors = validateRequest(req);
    const errorMessage = `${errors.array()}`;
    if (!errors.isEmpty()) {
      if (errorMessage === 'Incorrect email or password') {
        throw new UnauthorizedError(errorMessage);
      }
      throw new ValidationError(errorMessage);
    }
    const { email, password } = req.body;
    return { email, password };
  };
}

export default UserService;
