import { Router } from 'express';
import AuthService from '../services/AuthService';
import { validateAuthHeader, validateLoginBody } from '../middlewares/validationSchemas';
import UserController from '../controllers/UserController';
import UserService from '../services/UserService';
import AuthController from '../controllers/AuthController';

const loginRouter = Router();

const authService = new AuthService();
const authController = new AuthController(authService);
const service = new UserService();
const userController = new UserController(service, authService);

loginRouter.post('/', validateLoginBody, userController.signin);

loginRouter.get(
  '/validate',
  validateAuthHeader,
  authController.authenticate,
  userController.getUserRole,
);

export default loginRouter;
