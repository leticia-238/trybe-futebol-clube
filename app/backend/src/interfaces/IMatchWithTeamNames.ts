import { IMatch } from './IMatch';

export type TeamType = {
  teamName: string
};

export interface IMatchWithTeamNames extends IMatch {
  teamHome: TeamType,
  teamAway: TeamType
}
