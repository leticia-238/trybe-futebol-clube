import { Request, Response } from 'express';
import { validateSigninPayload } from '../services/validations';
import { IUserService, RoleType } from '../interfaces/User';
import AuthService from '../services/AuthService';
import { RequestWithDecodedJwt } from '../interfaces/Request';

class UserController {
  constructor(private service: IUserService) {}

  async signin(req: Request, res: Response): Promise<void> {
    const payload = req.body;
    validateSigninPayload(payload);
    const { email, password } = payload;
    const user = await this.service.validateRegisteredUser(email, password);
    const token = AuthService.generateToken(user);
    res.status(200).json({ token });
  }

  // eslint-disable-next-line class-methods-use-this
  async getUserRole(req: RequestWithDecodedJwt, res: Response) {
    const { role } = req.decodedData as unknown as { role: RoleType };
    res.status(200).json({ role });
  }
}

export default UserController;
