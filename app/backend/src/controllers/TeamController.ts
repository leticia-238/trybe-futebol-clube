import { RequestHandler } from 'express';
import { ITeamService } from '../interfaces/team_interfaces/ITeamService';

class TeamController {
  constructor(private service: ITeamService) {}

  getAllTeams: RequestHandler = async (_req, res): Promise<void> => {
    const teams = await this.service.getAllTeams();
    res.status(200).json(teams);
  };

  getTeamById: RequestHandler = async (req, res): Promise<void> => {
    const id = this.service.validateIdParam(req);
    const team = await this.service.getTeamById(id);
    res.status(200).json(team);
  };
}

export default TeamController;
