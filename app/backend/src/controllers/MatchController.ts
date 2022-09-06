import { RequestHandler } from 'express';
import { IMatchService } from '../interfaces/match_interfaces/IMatchService';
import { ITeamService } from '../interfaces/team_interfaces/ITeamService';

class MatchController {
  constructor(
    private matchService: IMatchService,
    private teamService: ITeamService,
  ) {}

  getMatches: RequestHandler = async (req, res): Promise<void> => {
    const validQuery = this.matchService.validateQuery(req);
    const matches = await this.matchService.getFormatedMatchesData(validQuery);
    res.status(200).json(matches);
  };

  saveMatch: RequestHandler = async (req, res): Promise<void> => {
    const validMatch = this.matchService.validateBody(req);
    const homeTeam = await this.teamService.getById(validMatch.homeTeam);
    const awayTeam = await this.teamService.getById(validMatch.awayTeam);
    this.matchService.validateIfTeamsExists(homeTeam, awayTeam);
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
