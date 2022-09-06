import { Router } from 'express';
import { teamController } from '../controllers';
import { validateIdParam } from '../middlewares/validationSchemas';

const teamsRouter = Router();

teamsRouter.get('/', teamController.getAllTeams);

teamsRouter.get('/:id', validateIdParam, teamController.getTeamById);

export default teamsRouter;
