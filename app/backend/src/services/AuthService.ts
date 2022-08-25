import * as jwt from 'jsonwebtoken';
// import { IUser } from '../interfaces/User';

export type PayloadType = {
  email: string,
  password: string
};

const secret = process.env.JWT_SECRET || 'jwt_secret';

class AuthService {
  static generateToken(payload: PayloadType): string {
    return jwt.sign(payload, secret);
  }

  static verifyToken(token: string) {
    let data;
    jwt.verify(token, secret, (err, decoded) => {
      if (err) throw new Error(err.message);
      data = decoded;
    });
    return data || { role: 'none' };
  }
}

export default AuthService;
