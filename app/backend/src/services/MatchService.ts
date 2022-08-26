import Team from '../database/models/Team';
import { IMatchDB, IMatchService, IMatchWithTeams } from '../interfaces/Match';
import Match from '../database/models/Match';

class MatchService implements IMatchService {
  private model = Match;

  async getAll(): Promise<IMatchDB[]> {
    const matches = await this.model.findAll({
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
  }

  async getformatedMatchesData(): Promise<IMatchWithTeams[]> {
    const matches = await this.getAll();
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
  }
}

export default MatchService;
