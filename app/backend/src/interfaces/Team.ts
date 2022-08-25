export interface ITeam {
  id: number,
  teamName: string
}

export interface ITeamService {
  getAllTeams(): Promise<ITeam[]>,
  getTeamById(id: string): Promise<ITeam>
}
