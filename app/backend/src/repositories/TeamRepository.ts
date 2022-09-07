import Team from '../database/models/Team';
import { ITeam, ITeamRepository } from '../interfaces/team_interfaces';

class TeamRepository implements ITeamRepository {
  private model = Team;

  findAll = async (): Promise<ITeam[]> => {
    const teams = await this.model.findAll({ raw: true });
    return teams;
  };

  findById = async (id: number): Promise<ITeam> => {
    const team = await this.model.findByPk(id, { raw: true });
    return team as ITeam;
  };
}

export default TeamRepository;
