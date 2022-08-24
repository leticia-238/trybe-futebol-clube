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
    await this.service.validateRegisteredUser(email, password);
    const token = AuthService.generateToken(payload);
    res.status(200).json({ token });
  }
}

export default UserController;
