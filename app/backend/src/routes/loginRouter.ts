import { Router } from 'express';
import { authController, userController } from '../controllers';
import { validateAuthHeader, validateLoginBody } from '../middlewares/validationSchemas';

const loginRouter = Router();

loginRouter.post('/', validateLoginBody, userController.signin);

loginRouter.get(
  '/validate',
  validateAuthHeader,
  authController.authenticate,
  userController.getUserRole,
);

export default loginRouter;
