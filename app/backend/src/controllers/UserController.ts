import { RequestHandler, Response } from 'express';
import AuthService from '../services/AuthService';
import { RequestWithDecodedJwt } from '../interfaces/Request';
import { IUserService } from '../interfaces/IUserService';
import { IUser } from '../interfaces/IUser';

class UserController {
  constructor(private service: IUserService) {}

  signin: RequestHandler = async (req, res): Promise<void> => {
    const { email, password } = this.service.validateBody(req);
    const user = await this.service.validateRegisteredUser(email, password);
    const token = AuthService.generateToken(user);
    res.status(200).json({ token });
  };

  getUserRole = (req: RequestWithDecodedJwt, res: Response) => {
    const { role } = req.decodedData as unknown as IUser;
    res.status(200).json({ role });
  };
}

export default UserController;
