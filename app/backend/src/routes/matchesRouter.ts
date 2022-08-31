import { Router } from 'express';
// import { query, oneOf } from 'express-validator';
import MatchService from '../services/MatchService';
import MatchController from '../controllers/MatchController';
import { validateMatchBody, validateMatchQuery } from '../middlewares/validationSchemas';
import AuthController from '../controllers/AuthController';
import AuthService from '../services/AuthService';

const matchesRouter = Router();

const authService = new AuthService();
const authController = new AuthController(authService);
const service = new MatchService();
const controller = new MatchController(service);

const path = '/';

matchesRouter.get(path, validateMatchQuery, controller.getMatches);

matchesRouter.post(path, authController.authenticate, validateMatchBody, controller.saveMatch);

export default matchesRouter;
