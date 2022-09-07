import { Request } from 'express';
import validateRequest from './utils/validateRequest';
import { NotFoundError, ValidationError } from '../errors';
import { ITeam, ITeamRepository, ITeamService } from '../interfaces/team_interfaces';

class TeamService implements ITeamService {
  constructor(private teamRepository: ITeamRepository) {}

  getAllTeams = async (): Promise<ITeam[]> => {
    const teams = await this.teamRepository.findAll();
    return teams;
  };

  getTeamById = async (id: number): Promise<ITeam> => {
    const team = await this.teamRepository.findById(id);
    this.validateIfExists(team);
    return team as ITeam;
  };

  private validateIfExists = (team: ITeam): void => {
    if (!team) throw new NotFoundError('team not found');
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
