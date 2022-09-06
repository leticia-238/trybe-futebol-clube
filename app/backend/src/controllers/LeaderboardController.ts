import { RequestHandler } from 'express';
import { IMatchService } from '../interfaces/match_interfaces/IMatchService';

class LeaderboardController {
  constructor(private matchesService: IMatchService) {}

  getMatches: RequestHandler = async (req, res): Promise<void> => {
    // const matches = await this.matchesService.getFormatedMatchesData({ inProgress: true });
    const matches = await this.matchesService.getTotalPointsByTeam();
    res.status(200).send(matches);
  };
}

export default LeaderboardController;
