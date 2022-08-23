import * as jwt from 'jsonwebtoken';

export type PayloadType = {
  email: string,
  password: string
};

const secret = process.env.JWT_SECRET || 'jwt_secret';

class AuthService {
  static generateToken(payload: PayloadType): string {
    return jwt.sign(payload, secret);
  }

  static verifyToken(token: string): void {
    jwt.verify(token, secret);
  }
}

export default AuthService;
