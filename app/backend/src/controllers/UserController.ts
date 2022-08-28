import { RequestHandler, Response } from 'express';
import { validateSigninPayload } from '../services/validations';
import AuthService from '../services/AuthService';
import { RequestWithDecodedJwt } from '../interfaces/Request';
import { IUserService } from '../interfaces/IUserService';
import { IUser } from '../interfaces/IUser';

class UserController {
  constructor(private service: IUserService) {}

  signin: RequestHandler = async (req, res): Promise<void> => {
    const payload = req.body;
    validateSigninPayload(payload);
    const user = await this.service
      .validateRegisteredUser(payload.email, payload.password);
    const token = AuthService.generateToken(user);
    res.status(200).json({ token });
  };

  getUserRole = (req: RequestWithDecodedJwt, res: Response) => {
    const { role } = req.decodedData as unknown as IUser;
    res.status(200).json({ role });
  };
}

export default UserController;
