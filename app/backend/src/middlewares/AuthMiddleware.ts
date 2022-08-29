import { RequestHandler } from 'express';
import AuthService from '../services/AuthService';
import { RequestWithDecodedJwt } from '../interfaces/Request';

class AuthMiddleware {
  static authenticate: RequestHandler = (req, _res, next): void => {
    const authorization = AuthService.validateAuthHeader(req);
    const decodedData = AuthService.verifyToken(authorization as string);
    Object.defineProperty(req as RequestWithDecodedJwt, 'decodedData', {
      value: decodedData,
    });
    next();
  };
}

export default AuthMiddleware;
