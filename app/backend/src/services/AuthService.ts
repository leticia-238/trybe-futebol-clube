import * as jwt from 'jsonwebtoken';
import { Request } from 'express';
import validateRequest from './utils/validateRequest';
import { IAuthService } from '../interfaces/IAuthService';
import { IUserWithPassword } from '../interfaces/user_interfaces';
import { UnauthorizedError, ValidationError } from '../errors';

const secret = process.env.JWT_SECRET || 'jwt_secret';

class AuthService implements IAuthService {
  private unauthorizedErrorMsg = 'Token must be a valid token';

  generateToken = (payload: IUserWithPassword): string => (
    jwt.sign(payload, secret)
  );

  verifyToken = (token: string) => {
    let data;
    jwt.verify(token, secret, (err, decoded) => {
      if (err) throw new UnauthorizedError(this.unauthorizedErrorMsg);
      data = decoded;
    });
    return data as unknown as IUserWithPassword;
  };

  validateAuthHeader = (req: Request) => {
    const errors = validateRequest(req);
    const errorMessage = `${errors.array()}`;
    if (!errors.isEmpty()) {
      if (errorMessage === this.unauthorizedErrorMsg) {
        throw new UnauthorizedError(errorMessage);
      }
      throw new ValidationError(errorMessage);
    }
    const { authorization } = req.headers;
    return authorization as string;
  };
}

export default AuthService;
