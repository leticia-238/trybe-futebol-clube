import { RequestHandler, Response } from 'express';
import { validateSigninPayload } from '../services/validations';
import { IUserService, RoleType } from '../interfaces/User';
import AuthService from '../services/AuthService';
import { RequestWithDecodedJwt } from '../interfaces/Request';

class UserController {
  constructor(private service: IUserService) {}

  signin: RequestHandler = async (req, res): Promise<void> => {
    const payload = req.body;
    validateSigninPayload(payload);
    const user = await this.service.validateRegisteredUser(payload);
    const token = AuthService.generateToken(user);
    res.status(200).json({ token });
  };

  getUserRole = (req: RequestWithDecodedJwt, res: Response) => {
    const { role } = req.decodedData as unknown as { role: RoleType };
    res.status(200).json({ role });
  };
}

export default UserController;
