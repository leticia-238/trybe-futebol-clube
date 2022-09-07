import { ITeam } from './ITeam';

export interface ITeamRepository {
  findAll(): Promise<ITeam[]>
  findById(id: number): Promise<ITeam>
}
