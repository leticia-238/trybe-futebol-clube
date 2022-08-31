import { RequestHandler } from 'express';
import TeamService from '../services/TeamService';
import { IMatchService } from '../interfaces/match_interfaces/IMatchService';

class MatchController {
  constructor(private service: IMatchService) {}

  getMatches: RequestHandler = async (req, res): Promise<void> => {
    const validQuery = this.service.validateQuery(req);
    const matches = await this.service.getFormatedMatchesData(validQuery);
    res.status(200).json(matches);
  };

  saveMatch: RequestHandler = async (req, res): Promise<void> => {
    const validMatch = this.service.validateBody(req);
    const teamService = new TeamService();
    const homeTeam = await teamService.getById(validMatch.homeTeam);
    const awayTeam = await teamService.getById(validMatch.awayTeam);
    this.service.validateIfTeamsExists(homeTeam, awayTeam);
    const createdMatch = await this.service.saveMatch(validMatch);
    res.status(201).json(createdMatch);
  };
}

export default MatchController;
