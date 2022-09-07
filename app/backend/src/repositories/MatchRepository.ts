import { OptionsMatch } from '../interfaces/match_interfaces/IMatchService';
import Match from '../database/models/Match';
import Team from '../database/models/Team';
import { IMatch, IMatchDb, IMatchRepository,
  IMatchWithTeamNamesDb } from '../interfaces/match_interfaces';

class MatchRepository implements IMatchRepository {
  private model = Match;

  findAllWithTeamNames = async (options: OptionsMatch) => {
    const matches = await this.model.findAll({
      where: { ...options },
      include: [{
        model: Team,
        as: 'teamHome',
        attributes: ['teamName'],
      }, {
        model: Team,
        as: 'teamAway',
        attributes: ['teamName'],
      }],
      raw: true,
    });
    return matches as unknown as IMatchWithTeamNamesDb[];
  };

  create = async (match: IMatch): Promise<IMatchDb> => {
    const createdMatch = await this.model.create({
      ...match, inProgress: true,
    });
    return createdMatch;
  };

  update = async (id: string): Promise<void> => {
    await this.model.update({ inProgress: 0 }, {
      where: { id },
    });
  };
}

export default MatchRepository;
