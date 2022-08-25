import NotFoundError from '../errors/NotFoundError';
import { ITeam, ITeamService } from '../interfaces/Team';
import Team from '../database/models/Team';

class TeamService implements ITeamService {
  private model = Team;

  async getAll(): Promise<ITeam[]> {
    const teams = await this.model.findAll({ raw: true });
    return teams;
  }

  async getTeamById(id: string): Promise<ITeam> {
    const team = await this.model.findByPk(id, { raw: true });
    if (!team) throw new NotFoundError('Not Found');
    return team as ITeam;
  }
}

export default TeamService;
