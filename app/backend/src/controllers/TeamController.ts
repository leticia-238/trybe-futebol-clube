import { Request, Response } from 'express';
import { validateIdParam } from '../services/validations';
import { ITeamService } from '../interfaces/Team';

class TeamController {
  constructor(private service: ITeamService) {}

  async getAllTeams(_req: Request, res: Response): Promise<void> {
    const teams = await this.service.getAllTeams();
    res.status(200).json(teams);
  }

  async getTeamById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    validateIdParam(id);
    const team = await this.service.getTeamById(id);
    res.status(200).json(team);
  }
}

export default TeamController;
