import NotFoundError from '../errors/NotFoundError';
import { ITeam, ITeamService } from '../interfaces/Team';
import Team from '../database/models/Team';

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
    if (!team) throw new NotFoundError('Not Found');
    return team;
  };
}

export default TeamService;
