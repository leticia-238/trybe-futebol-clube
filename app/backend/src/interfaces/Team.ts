import { IService } from './IService';

export interface ITeam {
  id: number,
  teamName: string
}

export interface ITeamService extends IService<ITeam> {
  getTeamById(id: string): Promise<ITeam>
}
