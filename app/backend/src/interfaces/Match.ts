import { IService } from './IService';

export interface IMatch {
  id: number,
  homeTeam: number,
  homeTeamGoals: number,
  awayTeam: number,
  awayTeamGoals: number,
  inProgress: boolean,
}

export interface IMatchDB extends IMatch {
  'teamHome.teamName': string,
  'teamAway.teamName': string
}

export type TeamType = { teamName: string };

export interface IMatchWithTeams extends IMatch {
  teamHome: TeamType,
  teamAway: TeamType
}

export interface IMatchService extends IService<IMatchDB>{
  getformatedMatchesData(): Promise<IMatchWithTeams[]>
}
