import { IMatch, IMatchDb } from './IMatch';
import { OptionsMatch } from './IMatchService';
import { IMatchWithTeamNamesDb } from './IMatchWithTeamNames';

export interface IMatchRepository {
  findAllWithTeamNames(options: OptionsMatch): Promise<IMatchWithTeamNamesDb[]>
  create(match: IMatch): Promise<IMatchDb>
  update(id: string): Promise<void>
}
