import { RequestHandler } from 'express';
import { RequestWithDecodedJwt } from '../interfaces/Request';
import { IAuthService } from '../interfaces/IAuthService';

class AuthController {
  constructor(private service: IAuthService) {}

  authenticate: RequestHandler = (req, _res, next): void => {
    const authorization = this.service.validateAuthHeader(req);
    const decodedData = this.service.verifyToken(authorization as string);
    Object.defineProperty(req as RequestWithDecodedJwt, 'decodedData', {
      value: decodedData,
    });
    next();
  };
}

export default AuthController;
