import { Request, Response } from 'express';
// import UserService from '../services/UserService';
import AuthService from '../services/AuthService';

class UserController {
  static async signin(req: Request, res: Response) {
    const payload = req.body;
    // await UserService.validatePayload();
    const token = AuthService.generateToken(payload);
    res.status(200).json({ token });
  }
}

export default UserController;
