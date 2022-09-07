import { IMatchDb } from './IMatch';

export type TeamType = {
  teamName: string
};

export interface IMatchWithTeamNames extends IMatchDb {
  teamHome: TeamType,
  teamAway: TeamType
}

export interface IMatchWithTeamNamesDb extends IMatchDb {
  'teamHome.teamName': string,
  'teamAway.teamName': string
}
