import { Request } from 'express';
import { ITeam } from './ITeam';

export interface ITeamService {
  getAll(): Promise<ITeam[]>,
  getById(id: number): Promise<ITeam>,
  validateIfExists(team: ITeam): ITeam,
  validateIdParam(req: Request): number,
}
