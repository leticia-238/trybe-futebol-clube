import { RequestHandler, Response } from 'express';
import { IAuthService } from '../interfaces/IAuthService';
import { RequestWithDecodedJwt } from '../interfaces/Request';
import { IUserService } from '../interfaces/IUserService';
import { IUser } from '../interfaces/IUser';

class UserController {
  constructor(
    private service: IUserService,
    private authService: IAuthService,
  ) {}

  signin: RequestHandler = async (req, res): Promise<void> => {
    const { email, password } = this.service.validateBody(req);
    const user = await this.service.validateRegisteredUser(email, password);
    const token = this.authService.generateToken(user);
    res.status(200).json({ token });
  };

  getUserRole = (req: RequestWithDecodedJwt, res: Response) => {
    const { role } = req.decodedData as unknown as IUser;
    res.status(200).json({ role });
  };
}

export default UserController;
