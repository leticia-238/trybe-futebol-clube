import { RequestHandler } from 'express';
import { validateIdParam } from '../services/validations';
import { ITeamService } from '../interfaces/Team';

class TeamController {
  constructor(private service: ITeamService) {}

  getAllTeams: RequestHandler = async (_req, res): Promise<void> => {
    const teams = await this.service.getAll();
    res.status(200).json(teams);
  };

  getTeamById: RequestHandler = async (req, res): Promise<void> => {
    const { id } = req.params;
    validateIdParam(id);
    const team = await this.service.getById(id);
    res.status(200).json(team);
  };
}

export default TeamController;
