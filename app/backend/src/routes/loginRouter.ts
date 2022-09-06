import { Router } from 'express';
import { authController, userController } from '../controllers';
import { validateAuthHeader, validateLoginBody } from '../middlewares/validationSchemas';

const loginRouter = Router();

loginRouter.post('/', validateLoginBody, userController.login);

loginRouter.get(
  '/validate',
  validateAuthHeader,
  authController.authenticate,
  userController.getAuthenticatedUserRole,
);

export default loginRouter;
