import { Router } from 'express';
import MatchService from '../services/MatchService';
import MatchController from '../controllers/MatchController';
import AuthMiddleware from '../middlewares/AuthMiddleware';

const matchesRouter = Router();

const service = new MatchService();
const controller = new MatchController(service);

matchesRouter.get('/', controller.getMatches);

matchesRouter.post('/', AuthMiddleware.authenticate, controller.saveMatch);

export default matchesRouter;
