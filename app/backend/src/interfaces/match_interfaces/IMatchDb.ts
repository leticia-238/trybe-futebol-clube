import { IMatch } from './IMatch';

export interface IMatchDb extends IMatch {
  id: number,
  inProgress: boolean,
}
