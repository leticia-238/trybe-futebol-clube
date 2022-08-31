import { Request } from 'express';
import NotFoundError from '../errors/NotFoundError';
import Team from '../database/models/Team';
import { ITeamService } from '../interfaces/team_interfaces/ITeamService';
import { ITeam } from '../interfaces/team_interfaces/ITeam';
import validateRequest from './utils/validateRequest';
import ValidationError from '../errors/ValidationError';

class TeamService implements ITeamService {
  private model = Team;

  getAll = async (): Promise<ITeam[]> => {
    const teams = await this.model.findAll({ raw: true });
    return teams;
  };

  getById = async (id: number): Promise<ITeam> => {
    const team = await this.model.findByPk(id, { raw: true });
    return team as ITeam;
  };

  validateIfExists = (team: ITeam): ITeam => {
    if (!team) throw new NotFoundError('team not found');
    return team;
  };

  validateIdParam = (req: Request): number => {
    const errors = validateRequest(req);
    if (!errors.isEmpty()) {
      throw new ValidationError('invalid id parameter');
    }
    return req.params.id as unknown as number;
  };
}

export default TeamService;
