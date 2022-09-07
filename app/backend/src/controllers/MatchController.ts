import { RequestHandler } from 'express';
import { IMatchService } from '../interfaces/match_interfaces/IMatchService';

class MatchController {
  constructor(
    private matchService: IMatchService,
  ) {}

  getMatches: RequestHandler = async (req, res): Promise<void> => {
    const validQuery = this.matchService.validateQuery(req);
    const matches = await this.matchService.getAllWithTeamNames(validQuery);
    res.status(200).json(matches);
  };

  saveMatch: RequestHandler = async (req, res): Promise<void> => {
    const validMatch = this.matchService.validateBody(req);
    const createdMatch = await this.matchService.saveMatch(validMatch);
    res.status(201).json(createdMatch);
  };

  updateMatchProgress: RequestHandler = async (req, res): Promise<void> => {
    const { id } = req.params;
    this.matchService.updateMatchProgress(id);
    res.status(200).json({ message: 'Finished' });
  };
}

export default MatchController;
