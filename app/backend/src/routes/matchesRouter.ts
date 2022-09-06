import { Router } from 'express';
import { authController, matchController } from '../controllers';
import { validateMatchBody, validateMatchQuery } from '../middlewares/validationSchemas';

const matchesRouter = Router();

matchesRouter.get('/', validateMatchQuery, matchController.getMatches);

matchesRouter.patch('/:id/finish', matchController.updateMatchProgress);

matchesRouter.post('/', authController.authenticate, validateMatchBody, matchController.saveMatch);

export default matchesRouter;
