import { Router } from 'express';
import { validateAuthHeader, validateLoginBody } from '../middlewares/validationSchemas';
import AuthMiddleware from '../middlewares/AuthMiddleware';
import UserController from '../controllers/UserController';
import UserService from '../services/UserService';

const loginRouter = Router();

const service = new UserService();
const controller = new UserController(service);

loginRouter.post('/', validateLoginBody, controller.signin);

loginRouter.get(
  '/validate',
  validateAuthHeader,
  AuthMiddleware.authenticate,
  controller.getUserRole,
);

export default loginRouter;
