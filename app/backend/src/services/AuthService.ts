import * as jwt from 'jsonwebtoken';
import { Request } from 'express';
import validateRequest from '../utils/validateRequest';
import { IUserWithPassword } from '../interfaces/IUserWithPassword';
import UnauthorizedError from '../errors/UnauthorizedError';
import { IAuthService } from '../interfaces/IAuthService';

const secret = process.env.JWT_SECRET || 'jwt_secret';

class AuthService implements IAuthService {
  generateToken = (payload: IUserWithPassword): string => (
    jwt.sign(payload, secret)
  );

  verifyToken = (token: string) => {
    let data;
    jwt.verify(token, secret, (err, decoded) => {
      if (err) throw new UnauthorizedError('Token must be a valid token');
      data = decoded;
    });
    return data as unknown as IUserWithPassword;
  };

  validateAuthHeader = (req: Request) => {
    validateRequest(req);
    const { authorization } = req.headers;
    return authorization as string;
  };
}

export default AuthService;
