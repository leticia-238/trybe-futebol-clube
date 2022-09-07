import { RequestHandler, Response } from 'express';
import { IUser, IUserService } from '../interfaces/user_interfaces';
import { IAuthService } from '../interfaces/IAuthService';
import { RequestWithDecodedJwt } from '../interfaces/Request';

class UserController {
  constructor(
    private service: IUserService,
    private authService: IAuthService,
  ) {}

  login: RequestHandler = async (req, res): Promise<void> => {
    const { email, password } = this.service.validateLoginBody(req);
    const user = await this.service.validateRegisteredUser(email, password);
    const token = this.authService.generateToken(user);
    res.status(200).json({ token });
  };

  getAuthenticatedUserRole = (req: RequestWithDecodedJwt, res: Response) => {
    const { role } = req.decodedData as unknown as IUser;
    res.status(200).json({ role });
  };
}

export default UserController;
