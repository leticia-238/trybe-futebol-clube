import { ITeamRanking } from "../../interfaces/ITeamRanking";

export const allTeamRankings: ITeamRanking[] = [
  {
    name: 'São Paulo',
    totalPoints: 4,
    totalGames: 2,
    totalVictories: 1,
    totalDraws: 1,
    totalLosses: 0,
    goalsFavor: 3,
    goalsOwn: 1,
    goalsBalance: 2,
    efficiency: 66.67,
  },
  {
    name: 'Grêmio',
    totalPoints: 1,
    totalGames: 1,
    totalVictories: 0,
    totalDraws: 1,
    totalLosses: 0,
    goalsFavor: 1,
    goalsOwn: 1,
    goalsBalance: 0,
    efficiency: 33.33,
  },
  {
    name: 'Internacional',
    totalPoints: 0,
    totalGames: 1,
    totalVictories: 0,
    totalDraws: 0,
    totalLosses: 1,
    goalsFavor: 0,
    goalsOwn: 2,
    goalsBalance: -2,
    efficiency: 0,
  }
]

export const homeTeamRankings: ITeamRanking[] = [
  {
    name: 'São Paulo',
    totalPoints: 4,
    totalGames: 2,
    totalVictories: 1,
    totalDraws: 1,
    totalLosses: 0,
    goalsFavor: 3,
    goalsOwn: 1,
    goalsBalance: 2,
    efficiency: 66.67,
  },
]

export const awayTeamRankings: ITeamRanking[] = [
  {
    name: 'Grêmio',
    totalPoints: 1,
    totalGames: 1,
    totalVictories: 0,
    totalDraws: 1,
    totalLosses: 0,
    goalsFavor: 1,
    goalsOwn: 1,
    goalsBalance: 0,
    efficiency: 33.33,
  },
  {
    name: 'Internacional',
    totalPoints: 0,
    totalGames: 1,
    totalVictories: 0,
    totalDraws: 0,
    totalLosses: 1,
    goalsFavor: 0,
    goalsOwn: 2,
    goalsBalance: -2,
    efficiency: 0,
  }
]