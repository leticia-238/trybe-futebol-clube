import { RequestHandler } from 'express';
import { validateAuthorizationHeader } from '../services/validations';
import AuthService from '../services/AuthService';
import { RequestWithDecodedJwt } from '../interfaces/Request';

class AuthMiddleware {
  static authenticate: RequestHandler = (req, _res, next): void => {
    const { authorization } = req.headers;
    validateAuthorizationHeader(authorization);
    const decodedData = AuthService.verifyToken(authorization as string);
    Object.defineProperty(req as RequestWithDecodedJwt, 'decodedData', {
      value: decodedData,
    });
    next();
  };
}

export default AuthMiddleware;
