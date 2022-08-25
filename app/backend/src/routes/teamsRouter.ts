import { Router } from 'express';
import TeamController from '../controllers/TeamController';
import TeamService from '../services/TeamService';

const teamsRouter = Router();

const service = new TeamService();
const controller = new TeamController(service);

teamsRouter.get('/', async (req, res) => { await controller.getAllTeams(req, res); });

teamsRouter.get('/:id', async (req, res) => { await controller.getTeamById(req, res); });

export default teamsRouter;
