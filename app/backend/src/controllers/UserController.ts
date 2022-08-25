import { Request, Response } from 'express';
import validateSigninPayload from '../services/validations';
import { IUserService } from '../interfaces/Service';
import AuthService from '../services/AuthService';

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

  static async authenticate(req:Request, res:Response) {
    const { authorization } = req.headers;
    const { role } = AuthService.verifyToken(authorization as string);
    res.status(200).json({ role });
  }
}

export default UserController;
