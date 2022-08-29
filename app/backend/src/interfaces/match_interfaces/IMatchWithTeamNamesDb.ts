import { IMatchDb } from './IMatchDb';

export interface IMatchWithTeamNamesDb extends IMatchDb {
  'teamHome.teamName': string,
  'teamAway.teamName': string
}
