import { IMatch } from './IMatch';

export interface IMatchWithTeamNamesDb extends IMatch {
  'teamHome.teamName': string,
  'teamAway.teamName': string
}
