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

export type QueryType = {
  inProgress?: string
};

export type OptionsType = {
  inProgress?: boolean
};

export type GetterList<T> = (options: OptionsType) => Promise<T[]>;

export interface IMatchService {
  getAll: GetterList<IMatchDB>,
  getFormatedMatchesData: GetterList<IMatchWithTeams>
  saveMatch(match: IMatch): Promise<IMatch>
}
