import { Request } from 'express';
import NotFoundError from '../errors/NotFoundError';
import Team from '../database/models/Team';
import { ITeamService } from '../interfaces/team_interfaces/ITeamService';
import { ITeam } from '../interfaces/team_interfaces/ITeam';
import validateRequest from './utils/validateRequest';

class TeamService implements ITeamService {
  private model = Team;

  getAll = async (): Promise<ITeam[]> => {
    const teams = await this.model.findAll({ raw: true });
    return teams;
  };

  getById = async (id: string): Promise<ITeam> => {
    const team = await this.model.findByPk(id, { raw: true });
    this.validateIfExists(team as ITeam);
    return team as ITeam;
  };

  validateIfExists = (team: ITeam): ITeam => {
    if (!team) throw new NotFoundError('team not found');
    return team;
  };

  validateIdParam = (req: Request) => {
    validateRequest(req, 'invalid id parameter');
  };
}

export default TeamService;
