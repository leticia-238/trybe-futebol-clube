import { ITeam } from './ITeam';

export interface ITeamService {
  getAll(): Promise<ITeam[]>,
  getById(id: string): Promise<ITeam>,
  validateIfExists(team: ITeam): ITeam
}
