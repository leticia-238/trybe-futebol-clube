import { Request } from 'express';
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
  validateQuery(req: Request): OptionsMatch
  validateBody(req: Request): IMatch
}
