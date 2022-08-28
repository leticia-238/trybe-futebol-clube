import { RequestHandler } from 'express';
import { IMatchService } from '../interfaces/IMatchService';
import { validateQuery } from '../services/validations';

class MatchController {
  constructor(private service: IMatchService) {}

  getMatches: RequestHandler = async (req, res): Promise<void> => {
    const { query } = req;
    const validQuery = validateQuery(query);
    const matches = await this.service.getFormatedMatchesData(validQuery);
    res.status(200).json(matches);
  };

  saveMatch: RequestHandler = async (req, res): Promise<void> => {
    const match = req.body;
    const createdMatch = await this.service.saveMatch(match);
    res.status(201).json(createdMatch);
  };
}

export default MatchController;
