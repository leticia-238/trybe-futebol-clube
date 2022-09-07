export interface IMatch {
  homeTeam: number,
  homeTeamGoals: number,
  awayTeam: number,
  awayTeamGoals: number,
}

export interface IMatchDb extends IMatch {
  id: number,
  inProgress: boolean,
}
