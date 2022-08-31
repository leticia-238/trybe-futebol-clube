import { RequestHandler } from 'express';
import { ITeamService } from '../interfaces/team_interfaces/ITeamService';

class TeamController {
  constructor(private service: ITeamService) {}

  getAllTeams: RequestHandler = async (_req, res): Promise<void> => {
    const teams = await this.service.getAll();
    res.status(200).json(teams);
  };

  getTeamById: RequestHandler = async (req, res): Promise<void> => {
    const id = this.service.validateIdParam(req);
    const team = await this.service.getById(id);
    this.service.validateIfExists(team);
    res.status(200).json(team);
  };
}

export default TeamController;
