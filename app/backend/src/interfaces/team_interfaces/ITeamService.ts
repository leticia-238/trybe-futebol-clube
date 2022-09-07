import { Request } from 'express';
import { ITeam } from './ITeam';

export interface ITeamService {
  getAllTeams(): Promise<ITeam[]>,
  getTeamById(id: number): Promise<ITeam>,
  validateIdParam(req: Request): number,
}
