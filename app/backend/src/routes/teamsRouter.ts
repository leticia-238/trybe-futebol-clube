import { Router } from 'express';
import TeamController from '../controllers/TeamController';
import TeamService from '../services/TeamService';

const teamsRouter = Router();

const service = new TeamService();
const controller = new TeamController(service);

teamsRouter.get('/', controller.getAllTeams);

teamsRouter.get('/:id', controller.getTeamById);

export default teamsRouter;
