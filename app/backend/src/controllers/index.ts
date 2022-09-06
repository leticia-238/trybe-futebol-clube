import AuthController from './AuthController';
import UserController from './UserController';
import TeamController from './TeamController';
import MatchController from './MatchController';
import LeaderboardController from './LeaderboardController';
import { authService, leaderboardService, matchService,
  teamService, userService } from '../services';

const authController = new AuthController(authService);
const userController = new UserController(userService, authService);
const teamController = new TeamController(teamService);
const matchController = new MatchController(matchService, teamService);
const leaderboardController = new LeaderboardController(leaderboardService);

export { authController, userController, teamController, matchController, leaderboardController };
