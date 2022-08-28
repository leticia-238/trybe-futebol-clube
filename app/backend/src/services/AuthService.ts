import * as jwt from 'jsonwebtoken';
import { IUserWithPassword } from '../interfaces/IUserWithPassword';
import UnauthorizedError from '../errors/UnauthorizedError';

const secret = process.env.JWT_SECRET || 'jwt_secret';

class AuthService {
  static generateToken = (payload: IUserWithPassword): string => (
    jwt.sign(payload, secret)
  );

  static verifyToken = (token: string) => {
    let data;
    jwt.verify(token, secret, (err, decoded) => {
      if (err) throw new UnauthorizedError('Token must be a valid token');
      data = decoded;
    });
    return data;
  };
}

export default AuthService;
