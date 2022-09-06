import UserRepository from './UserRepository';
import TeamRepository from './TeamRepository';
import MatchRepository from './MatchRepository';

const userRepository = new UserRepository();
const teamRepository = new TeamRepository();
const matchRepository = new MatchRepository();

export { userRepository, teamRepository, matchRepository };
