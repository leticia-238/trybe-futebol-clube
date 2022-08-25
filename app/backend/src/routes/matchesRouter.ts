import { Router } from 'express';
import MatchService from '../services/MatchService';
import MatchController from '../controllers/MatchController';

const matchesRouter = Router();

const service = new MatchService();
const controller = new MatchController(service);

matchesRouter.get('/', async (req, res) => { await controller.getAllMatches(req, res); });

export default matchesRouter;
