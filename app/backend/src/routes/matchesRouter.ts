import { Router } from 'express';
// import { query, oneOf } from 'express-validator';
import MatchService from '../services/MatchService';
import MatchController from '../controllers/MatchController';
import AuthMiddleware from '../middlewares/AuthMiddleware';
import { validateMatchBody, validateMatchQuery } from '../middlewares/validationSchemas';

const matchesRouter = Router();

const service = new MatchService();
const controller = new MatchController(service);

const path = '/';

matchesRouter.get(path, validateMatchQuery, controller.getMatches);

matchesRouter.post(path, validateMatchBody, AuthMiddleware.authenticate, controller.saveMatch);

export default matchesRouter;
