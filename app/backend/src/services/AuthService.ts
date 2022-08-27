import * as jwt from 'jsonwebtoken';
import { IUserLogin } from '../interfaces/User';
import UnauthorizedError from '../errors/UnauthorizedError';

const secret = process.env.JWT_SECRET || 'jwt_secret';

class AuthService {
  static generateToken = (payload: IUserLogin): string => (
    jwt.sign(payload, secret)
  );

  static verifyToken = (token: string) => {
    let data;
    jwt.verify(token, secret, (err, decoded) => {
      if (err) throw new UnauthorizedError('invalid token');
      data = decoded;
    });
    return data;
  };
}

export default AuthService;
