import { NextFunction, Request, Response } from 'express';
import { validateAuthorizationHeader } from '../services/validations';
import AuthService from '../services/AuthService';
import { RequestWithDecodedJwt } from '../interfaces/Request';

class AuthMiddleware {
  static async authenticate(req: Request, _res:Response, next: NextFunction) {
    const { authorization } = req.headers;
    validateAuthorizationHeader(authorization);
    const decodedData = AuthService.verifyToken(authorization as string);
    Object.defineProperty(req as RequestWithDecodedJwt, 'decodedData', { value: decodedData });
    next();
  }
}

export default AuthMiddleware;
