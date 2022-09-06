/* eslint-disable no-param-reassign */
import { Request } from 'express';
import { ITeam } from '../interfaces/team_interfaces/ITeam';
import NotFoundError from '../errors/NotFoundError';
import validateRequest from './utils/validateRequest';
import Team from '../database/models/Team';
import Match from '../database/models/Match';
import { GetList, IMatchService, OptionsMatch } from '../interfaces/match_interfaces/IMatchService';
import { IMatchWithTeamNamesDb } from '../interfaces/match_interfaces/IMatchWithTeamNamesDb';
import { IMatchWithTeamNames } from '../interfaces/match_interfaces/IMatchWithTeamNames';
import { IMatch } from '../interfaces/match_interfaces/IMatch';
import UnauthorizedError from '../errors/UnauthorizedError';
import { IMatchDb } from '../interfaces/match_interfaces/IMatchDb';
import ValidationError from '../errors/ValidationError';
import { ILeaderBoard } from '../interfaces/ILeaderBoard';
import LeaderBoard from './LeaderBoard';

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

  updateMatchProgress = async (id: string) => {
    await Match.update({ inProgress: 0 }, {
      where: { id },
    });
  };

  getTotalPointsByTeam = async () => {
    const matches = await this.getFormatedMatchesData({ inProgress: false });
    const result = matches.reduce((obj, match) => {
      const {
        homeTeam, homeTeamGoals, awayTeam, awayTeamGoals, teamHome, teamAway } = match;
      if (homeTeam in obj) {
        obj[homeTeam].setGameValues(homeTeamGoals, awayTeamGoals);
      } else {
        obj[homeTeam] = new LeaderBoard(teamHome.teamName, homeTeamGoals, awayTeamGoals);
      }
      if (awayTeam in obj) {
        obj[awayTeam].setGameValues(awayTeamGoals, homeTeamGoals);
      } else {
        obj[awayTeam] = new LeaderBoard(teamAway.teamName, awayTeamGoals, homeTeamGoals);
      }
      return obj;
    }, {} as Record<string, ILeaderBoard>);
    return result;
  };

  validateIfTeamsExists = (homeTeam: ITeam, awayTeam: ITeam): void => {
    if (!homeTeam || !awayTeam) throw new NotFoundError('There is no team with such id!');
  };

  validateQuery = (req: Request) => {
    const errors = validateRequest(req);
    if ('inProgress' in req.query && !errors.isEmpty()) {
      throw new ValidationError(`${errors.array()}`);
    }
    return req.query as OptionsMatch;
  };

  validateBody = (req: Request): IMatch => {
    const errors = validateRequest(req);
    if (!errors.isEmpty()) {
      throw new ValidationError('invalid match fields');
    }
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;
    if (homeTeam === awayTeam) {
      throw new UnauthorizedError('It is not possible to create a match with two equal teams');
    }
    return { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals };
  };
}

export default MatchService;
