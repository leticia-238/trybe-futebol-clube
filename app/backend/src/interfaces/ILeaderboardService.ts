import TeamRanking from '../services/utils/TeamRanking';
import { IMatchWithTeamNames } from './match_interfaces/IMatchWithTeamNames';

export type TeamRankingsCallBack = (
  obj: Record<string, TeamRanking>,
  match: IMatchWithTeamNames
) => Record<string, TeamRanking>;

export interface ILeaderboardService {
  getTeamRankings(teamsRankings: TeamRankingsCallBack): Promise<TeamRanking[]>
  getAllTeamRankings: TeamRankingsCallBack
  getHomeTeamRankings: TeamRankingsCallBack
  getAwayTeamRankings: TeamRankingsCallBack
}
