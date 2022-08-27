import { Router } from 'express';
import AuthMiddleware from '../middlewares/AuthMiddleware';
import UserController from '../controllers/UserController';
import UserService from '../services/UserService';

const loginRouter = Router();

const service = new UserService();
const controller = new UserController(service);

loginRouter.post('/', controller.signin);

loginRouter.get('/validate', AuthMiddleware.authenticate, controller.getUserRole);

export default loginRouter;
