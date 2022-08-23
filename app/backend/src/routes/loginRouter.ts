import { Router } from 'express';
import UserController from '../controllers/UserController';
// import UserService from '../services/UserService';

const loginRouter = Router();

loginRouter.post('/', UserController.signin);

export default loginRouter;
