import { Request } from 'express';
import validateRequest from '../utils/validateRequest';
import Team from '../database/models/Team';
import Match from '../database/models/Match';
import { GetList, IMatchService } from '../interfaces/match_interfaces/IMatchService';
import { IMatchWithTeamNamesDb } from '../interfaces/match_interfaces/IMatchWithTeamNamesDb';
import { IMatchWithTeamNames } from '../interfaces/match_interfaces/IMatchWithTeamNames';
import { IMatch } from '../interfaces/match_interfaces/IMatch';
import NotFoundError from '../errors/NotFoundError';
import UnauthorizedError from '../errors/UnauthorizedError';
import { IMatchDb } from '../interfaces/match_interfaces/IMatchDb';

class MatchService implements IMatchService {
  private model = Match;

  getAllWithTeamNames: GetList<IMatchWithTeamNamesDb> = async (options) => {
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

  getFormatedMatchesData: GetList<IMatchWithTeamNames> = async (options) => {
    const matches = await this.getAllWithTeamNames(options);
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

  saveMatch = async (match: IMatch): Promise<IMatchDb> => {
    const createdMatch = await this.model.create({
      ...match, inProgress: true,
    });
    return createdMatch;
  };

  validateQuery = (req: Request): Record<string, never> => {
    validateRequest(req);
    if (Object.keys(req.query).length !== 0) {
      throw new NotFoundError('the server has not found anything matching the request-URI');
    }
    return { };
  };

  validateBody = (req: Request): IMatch => {
    validateRequest(req, 'invalid match fields');
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;
    if (homeTeam === awayTeam) {
      throw new UnauthorizedError('It is not possible to create a match with two equal teams');
    }
    return { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals };
  };
}

export default MatchService;
