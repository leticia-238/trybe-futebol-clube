import { Router } from 'express';
import { leaderboardController } from '../controllers';

const leaderboardRouter = Router();

leaderboardRouter.get('/', leaderboardController.getAllTeamsRankings);

leaderboardRouter.get('/home', leaderboardController.getHomeTeamsRankings);

leaderboardRouter.get('/away', leaderboardController.getAwayTeamsRankings);

export default leaderboardRouter;
