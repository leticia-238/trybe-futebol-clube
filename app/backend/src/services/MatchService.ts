import Team from '../database/models/Team';
import { GetterList, IMatch, IMatchDB, IMatchService, IMatchWithTeams } from '../interfaces/Match';
import Match from '../database/models/Match';

class MatchService implements IMatchService {
  private model = Match;

  getAll: GetterList<IMatchDB> = async (options) => {
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
    return matches as unknown as IMatchDB[];
  };

  getFormatedMatchesData: GetterList<IMatchWithTeams> = async (options) => {
    const matches = await this.getAll(options);
    const result = matches.map((match) => ({
      id: match.id,
      homeTeam: match.homeTeam,
      homeTeamGoals: match.homeTeamGoals,
      awayTeam: match.awayTeam,
      awayTeamGoals: match.awayTeamGoals,
      inProgress: !!match.inProgress,
      teamHome: { teamName: match['teamHome.teamName'] },
      teamAway: { teamName: match['teamAway.teamName'] },
    }));
    return result;
  };

  saveMatch = async (match: IMatch): Promise<IMatch> => {
    const createdMatch = await this.model.create({
      ...match, inProgress: true,
    });
    return createdMatch;
  };
}

export default MatchService;
