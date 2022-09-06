import { Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';
import MatchService from '../services/MatchService';

const leaderboardRouter = Router();

const matchesService = new MatchService();
const leaderboardController = new LeaderboardController(matchesService);

leaderboardRouter.get('/home', leaderboardController.getMatches);

export default leaderboardRouter;
