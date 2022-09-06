import { Request } from 'express';
import { ITeam } from '../team_interfaces/ITeam';
import { IMatch } from './IMatch';
import { IMatchDb } from './IMatchDb';
import { IMatchWithTeamNames } from './IMatchWithTeamNames';
import { IMatchWithTeamNamesDb } from './IMatchWithTeamNamesDb';

export type GetList<T> = (options: OptionsMatch) => Promise<T[]>;

export type OptionsMatch = {
  inProgress?: boolean
};

export interface IMatchService {
  getAllWithTeamNames: GetList<IMatchWithTeamNamesDb>
  getFormatedMatchesData: GetList<IMatchWithTeamNames>
  saveMatch(match: IMatch): Promise<IMatchDb>
  updateMatchProgress(id: string): Promise<void>
  validateIfTeamsExists(homeTeam: ITeam, awayTeam: ITeam): void
  validateQuery(req: Request): OptionsMatch
  validateBody(req: Request): IMatch
}
