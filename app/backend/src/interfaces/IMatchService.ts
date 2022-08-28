import { IMatch } from './IMatch';
import { IMatchWithTeamNames } from './IMatchWithTeamNames';
import { IMatchWithTeamNamesDb } from './IMatchWithTeamNamesDb';

export type GetList<T> = (options: OptionsType) => Promise<T[]>;

export type QueryType = {
  inProgress?: string
};

export type OptionsType = {
  inProgress?: boolean
};

export interface IMatchService {
  getAllWithTeamNames: GetList<IMatchWithTeamNamesDb>,
  getFormatedMatchesData: GetList<IMatchWithTeamNames>
  saveMatch(match: IMatch): Promise<IMatch>
}
