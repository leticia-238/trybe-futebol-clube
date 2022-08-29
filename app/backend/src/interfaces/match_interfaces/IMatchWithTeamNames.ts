import { IMatchDb } from './IMatchDb';

export type TeamType = {
  teamName: string
};

export interface IMatchWithTeamNames extends IMatchDb {
  teamHome: TeamType,
  teamAway: TeamType
}
