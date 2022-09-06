import { RequestHandler } from 'express';
import LeaderBoardService from '../services/LeaderBoardService';

const service = new LeaderBoardService();

class LeaderboardController {
  // constructor(private leaderBoardService) {}
  getAllTeamsRankings: RequestHandler = async (_req, res): Promise<void> => {
    const allTeamsRankings = await service.getTeamsRankings(service.getAllTeamsRankings);
    res.status(200).send(allTeamsRankings);
  };

  getHomeTeamsRankings: RequestHandler = async (_req, res): Promise<void> => {
    const homeTeamsRankings = await service.getTeamsRankings(service.getHomeTeamsRankings);
    res.status(200).send(homeTeamsRankings);
  };

  getAwayTeamsRankings: RequestHandler = async (_req, res): Promise<void> => {
    const awayTeamsRankings = await service.getTeamsRankings(service.getAwayTeamsRankings);
    res.status(200).send(awayTeamsRankings);
  };
}

export default LeaderboardController;
