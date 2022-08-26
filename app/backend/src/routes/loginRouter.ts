import { Router } from 'express';
import AuthMiddleware from '../middlewares/AuthMiddleware';
import UserController from '../controllers/UserController';
import UserService from '../services/UserService';

const loginRouter = Router();

const service = new UserService();
const controller = new UserController(service);

loginRouter.post('/', async (req, res) => { await controller.signin(req, res); });

loginRouter.get(
  '/validate',
  AuthMiddleware.authenticate,
  async (req, res) => { await controller.getUserRole(req, res); },
);

export default loginRouter;
