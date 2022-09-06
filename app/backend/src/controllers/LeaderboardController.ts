import { RequestHandler } from 'express';
import { ILeaderboardService } from '../interfaces/ILeaderboardService';

class LeaderboardController {
  constructor(private leaderboardService: ILeaderboardService) {}

  getAllTeamsRankings: RequestHandler = async (_req, res): Promise<void> => {
    const allTeamsRankings = await this.leaderboardService
      .getTeamRankings(this.leaderboardService.getAllTeamRankings);
    res.status(200).send(allTeamsRankings);
  };

  getHomeTeamsRankings: RequestHandler = async (_req, res): Promise<void> => {
    const homeTeamsRankings = await this.leaderboardService
      .getTeamRankings(this.leaderboardService.getHomeTeamRankings);
    res.status(200).send(homeTeamsRankings);
  };

  getAwayTeamsRankings: RequestHandler = async (_req, res): Promise<void> => {
    const awayTeamsRankings = await this.leaderboardService
      .getTeamRankings(this.leaderboardService.getAwayTeamRankings);
    res.status(200).send(awayTeamsRankings);
  };
}

export default LeaderboardController;
