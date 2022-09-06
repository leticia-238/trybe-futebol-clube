/* eslint-disable no-param-reassign */
import { IMatchWithTeamNames } from '../interfaces/match_interfaces/IMatchWithTeamNames';
import MatchService from './MatchService';
import TeamRanking, { ITeamRanking } from './utils/TeamRanking';

type TeamsRankingsObj = Record<string, ITeamRanking>;

type TeamsRankingsCallBack = (
  obj: TeamsRankingsObj,
  match: IMatchWithTeamNames
) => TeamsRankingsObj;

const matchService = new MatchService();

class LeaderBoardService {
  // constructor(private matchesService: IMatchService) {}
  getTeamsRankings = async (teamsRankings: TeamsRankingsCallBack) => {
    const matches = await matchService.getFormatedMatchesData({ inProgress: false });

    const result = matches.reduce(teamsRankings, {} as Record<string, ITeamRanking>);
    return Object.values(result).sort((a, b) => {
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
    });
  };

  getAllTeamsRankings: TeamsRankingsCallBack = (obj, match) => {
    const { homeTeam, homeTeamGoals, awayTeam, awayTeamGoals, teamHome, teamAway } = match;

    const homeTeamRanking = this.createOrFindRankingTeam(homeTeam, teamHome.teamName, obj);
    homeTeamRanking.setRankingValues(homeTeamGoals, awayTeamGoals);

    const awayTeamRanking = this.createOrFindRankingTeam(awayTeam, teamAway.teamName, obj);
    awayTeamRanking.setRankingValues(awayTeamGoals, homeTeamGoals);
    return obj;
  };

  getHomeTeamsRankings: TeamsRankingsCallBack = (obj, match) => {
    const { homeTeam, homeTeamGoals, awayTeamGoals, teamHome } = match;

    const homeTeamRanking = this.createOrFindRankingTeam(homeTeam, teamHome.teamName, obj);
    homeTeamRanking.setRankingValues(homeTeamGoals, awayTeamGoals);
    return obj;
  };

  getAwayTeamsRankings: TeamsRankingsCallBack = (obj, match) => {
    const { homeTeamGoals, awayTeam, awayTeamGoals, teamAway } = match;

    const awayTeamRanking = this.createOrFindRankingTeam(awayTeam, teamAway.teamName, obj);
    awayTeamRanking.setRankingValues(awayTeamGoals, homeTeamGoals);
    return obj;
  };

  createOrFindRankingTeam = (
    teamId: number,
    teamName:string,
    teamRankingsList: Record<string, ITeamRanking>,
  ) => {
    if (teamId in teamRankingsList) return teamRankingsList[teamId];
    const team = new TeamRanking(teamName);
    teamRankingsList[teamId] = team;
    return team;
  };

  // getTotalPointsByTeam = async () => {
  //   const matches = await matchService.getFormatedMatchesData({ inProgress: false });
  //   const result = matches.reduce((obj, match) => {
  //     const {
  //       homeTeam, homeTeamGoals, awayTeam, awayTeamGoals, teamHome, teamAway } = match;
  //     if (homeTeam in obj) {
  //       obj[homeTeam].setGameValues(homeTeamGoals, awayTeamGoals);
  //     } else {
  //       obj[homeTeam] = new LeaderBoard(teamHome.teamName, homeTeamGoals, awayTeamGoals);
  //     }
  //     if (awayTeam in obj) {
  //       obj[awayTeam].setGameValues(awayTeamGoals, homeTeamGoals);
  //     } else {
  //       obj[awayTeam] = new LeaderBoard(teamAway.teamName, awayTeamGoals, homeTeamGoals);
  //     }
  //     return obj;
  //   }, {} as Record<string, ILeaderBoard>);
  //   return result;
  // };
}

export default LeaderBoardService;
