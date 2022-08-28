import { IMatch } from './IMatch';
import { IMatchWithTeamNames } from './IMatchWithTeamNames';
import { IMatchWithTeamNamesDb } from './IMatchWithTeamNamesDb';

export type GetterList<T> = (options: OptionsType) => Promise<T[]>;

export type QueryType = {
  inProgress?: string
};

export type OptionsType = {
  inProgress?: boolean
};

export interface IMatchService {
  getAll: GetterList<IMatchWithTeamNamesDb[]>,
  getFormatedMatchesData: GetterList<IMatchWithTeamNames[]>
  saveMatch(match: IMatch): Promise<IMatch>
}
