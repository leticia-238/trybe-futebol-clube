import { Request, Response } from 'express';
import { IMatchService } from '../interfaces/Match';

class MatchController {
  constructor(private service: IMatchService) {}

  async getAllMatches(_req: Request, res: Response): Promise<void> {
    const matches = await this.service.getformatedMatchesData();
    res.status(200).json(matches);
  }
}

export default MatchController;
