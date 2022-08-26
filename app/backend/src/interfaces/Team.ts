import { IService } from './IService';

export interface ITeam {
  id: number,
  teamName: string
}

export interface ITeamService extends IService<ITeam> {
  getById(id: string): Promise<ITeam>,
}
