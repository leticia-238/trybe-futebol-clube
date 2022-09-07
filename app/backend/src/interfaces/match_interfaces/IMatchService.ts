import { Request } from 'express';
import { IMatch, IMatchDb } from './IMatch';
import { IMatchWithTeamNames } from './IMatchWithTeamNames';

export type OptionsMatch = {
  inProgress?: boolean
};

export interface IMatchService {
  getAllWithTeamNames(options: OptionsMatch): Promise<IMatchWithTeamNames[]>
  saveMatch(match: IMatch): Promise<IMatchDb>
  updateMatchProgress(id: string): Promise<void>
  validateQuery(req: Request): OptionsMatch
  validateBody(req: Request): IMatch
}
