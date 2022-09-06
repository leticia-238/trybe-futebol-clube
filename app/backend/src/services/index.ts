import AuthService from './AuthService';
import TeamService from './TeamService';
import UserService from './UserService';
import MatchService from './MatchService';
import LeaderBoardService from './LeaderBoardService';

const authService = new AuthService();
const userService = new UserService();
const teamService = new TeamService();
const matchService = new MatchService();
const leaderboardService = new LeaderBoardService(matchService);

export { authService, userService, teamService, matchService, leaderboardService };
