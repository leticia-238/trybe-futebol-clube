/* eslint-disable no-param-reassign */
import { IMatchService } from '../interfaces/match_interfaces/IMatchService';
import { TeamRankingsCallBack } from '../interfaces/ILeaderboardService';
import TeamRanking from '../entities/TeamRanking';

class LeaderBoardService {
  constructor(private matchesService: IMatchService) {}

  getTeamRankings = async (teamsRankings: TeamRankingsCallBack) => {
    const matches = await this.matchesService.getAllWithTeamNames({ inProgress: false });
    const result = matches.reduce(teamsRankings, {} as Record<string, TeamRanking>);
    return this.sortTeamRankings(Object.values(result));
  };

  getAllTeamRankings: TeamRankingsCallBack = (obj, match) => {
    const { homeTeam, homeTeamGoals, awayTeam, awayTeamGoals, teamHome, teamAway } = match;

    const homeTeamRanking = this.createOrFindTeamRanking(homeTeam, teamHome.teamName, obj);
    homeTeamRanking.setRankingValues(homeTeamGoals, awayTeamGoals);

    const awayTeamRanking = this.createOrFindTeamRanking(awayTeam, teamAway.teamName, obj);
    awayTeamRanking.setRankingValues(awayTeamGoals, homeTeamGoals);
    return obj;
  };

  getHomeTeamRankings: TeamRankingsCallBack = (obj, match) => {
    const { homeTeam, homeTeamGoals, awayTeamGoals, teamHome } = match;

    const homeTeamRanking = this.createOrFindTeamRanking(homeTeam, teamHome.teamName, obj);
    homeTeamRanking.setRankingValues(homeTeamGoals, awayTeamGoals);
    return obj;
  };

  getAwayTeamRankings: TeamRankingsCallBack = (obj, match) => {
    const { homeTeamGoals, awayTeam, awayTeamGoals, teamAway } = match;

    const awayTeamRanking = this.createOrFindTeamRanking(awayTeam, teamAway.teamName, obj);
    awayTeamRanking.setRankingValues(awayTeamGoals, homeTeamGoals);
    return obj;
  };

  private createOrFindTeamRanking = (
    teamId: number,
    teamName:string,
    teamRankingsList: Record<string, TeamRanking>,
  ) => {
    if (teamId in teamRankingsList) return teamRankingsList[teamId];
    const team = new TeamRanking(teamName);
    teamRankingsList[teamId] = team;
    return team;
  };

  private sortTeamRankings = (teamRankings: TeamRanking[]) => (
    teamRankings.sort((a, b) => {
      if (a.totalPoints < b.totalPoints) return 1;
      if (a.totalPoints > b.totalPoints) return -1;
      if (a.totalVictories < b.totalVictories) return 1;
      if (a.totalVictories > b.totalVictories) return -1;
      if (a.goalsBalance < b.goalsBalance) return 1;
      if (a.goalsBalance > b.goalsBalance) return -1;
      if (a.goalsFavor < b.goalsFavor) return 1;
      if (a.goalsFavor > b.goalsFavor) return -1;
      if (a.goalsOwn < b.goalsOwn) return 1;
      if (a.goalsOwn > b.goalsOwn) return -1;
      return 0;
    })
  );
}

export default LeaderBoardService;
