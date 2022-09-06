import { Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const leaderboardRouter = Router();

const leaderboardController = new LeaderboardController();

leaderboardRouter.get('/', leaderboardController.getAllTeamsRankings);

leaderboardRouter.get('/home', leaderboardController.getHomeTeamsRankings);

leaderboardRouter.get('/away', leaderboardController.getAwayTeamsRankings);

export default leaderboardRouter;
