import { Router } from 'express';
import MatchService from '../services/MatchService';
import MatchController from '../controllers/MatchController';
import AuthMiddleware from '../middlewares/AuthMiddleware';

const matchesRouter = Router();

const service = new MatchService();
const controller = new MatchController(service);

matchesRouter.get('/', async (req, res) => { await controller.getMatches(req, res); });

matchesRouter.post(
  '/',
  AuthMiddleware.authenticate,
  async (req, res) => { await controller.saveMatch(req, res); },
);

export default matchesRouter;
