import { Request, Response } from 'express';
import { validateQuery } from '../services/validations';
import { IMatchService } from '../interfaces/Match';

class MatchController {
  constructor(private service: IMatchService) {}

  async getMatches(req: Request, res: Response): Promise<void> {
    const { query } = req;
    const validQuery = validateQuery(query);
    const matches = await this.service.getFormatedMatchesData(validQuery);
    res.status(200).json(matches);
  }

  async saveMatch(req: Request, res: Response): Promise<void> {
    const match = req.body;
    const createdMatch = await this.service.saveMatch(match);
    res.status(201).json(createdMatch);
  }
}

export default MatchController;
