import { Router } from 'express';
import TeamController from '../controllers/TeamController';
import TeamService from '../services/TeamService';

const teamsRouter = Router();

const service = new TeamService();
const controller = new TeamController(service);

teamsRouter.get('/', (req, res) => { controller.getAllTeams(req, res); });

teamsRouter.get('/:id', (req, res) => { controller.getTeamById(req, res); });

export default teamsRouter;
