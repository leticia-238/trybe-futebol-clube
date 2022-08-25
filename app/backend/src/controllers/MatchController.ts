import { Request, Response } from 'express';
import { IMatchService } from '../interfaces/Match';

class MatchController {
  constructor(private service: IMatchService) {}

  async getAllMatches(_req: Request, res: Response): Promise<void> {
    const matchs = await this.service.getAll();
    res.status(200).json(matchs);
  }
}

export default MatchController;
