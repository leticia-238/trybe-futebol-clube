import AuthService from './AuthService';
import TeamService from './TeamService';
import UserService from './UserService';
import MatchService from './MatchService';
import LeaderBoardService from './LeaderBoardService';
import { matchRepository, teamRepository, userRepository } from '../repositories';

const authService = new AuthService();
const userService = new UserService(userRepository);
const teamService = new TeamService(teamRepository);
const matchService = new MatchService(matchRepository,teamRepository);
const leaderboardService = new LeaderBoardService(matchService);

export { authService, userService, teamService, matchService, leaderboardService };
