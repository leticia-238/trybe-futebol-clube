import { Request } from 'express';
import { NotFoundError, UnauthorizedError, ValidationError } from '../errors';
import { IMatch, IMatchDb, IMatchRepository, IMatchService,
  OptionsMatch } from '../interfaces/match_interfaces';
import { ITeamRepository } from '../interfaces/team_interfaces';
import validateRequest from './utils/validateRequest';

class MatchService implements IMatchService {
  constructor(
    private matchRepository: IMatchRepository,
    private teamRepository: ITeamRepository,
  ) {}

  getAllWithTeamNames = async (options: OptionsMatch) => {
    const matches = await this.matchRepository.findAllWithTeamNames(options);
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
    await this.validateIfTeamsExists(match.homeTeam, match.awayTeam);
    const createdMatch = await this.matchRepository.create(match);
    return createdMatch;
  };

  updateMatchProgress = async (id: string) => {
    await this.matchRepository.update(id);
  };

  private validateIfTeamsExists = async (homeTeamId: number, awayTeamId: number): Promise<void> => {
    const homeTeam = await this.teamRepository.findById(homeTeamId);
    const awayTeam = await this.teamRepository.findById(awayTeamId);
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
