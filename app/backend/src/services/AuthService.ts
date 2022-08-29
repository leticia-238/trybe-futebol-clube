import * as jwt from 'jsonwebtoken';
import { Request } from 'express';
import validateRequest from '../utils/validateRequest';
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

  static validateAuthHeader = (req: Request) => {
    validateRequest(req);
    const { authorization } = req.headers;
    return authorization;
  };
}

export default AuthService;
