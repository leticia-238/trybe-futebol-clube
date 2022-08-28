import { IMatchWithTeamNamesDb } from "../../interfaces/IMatchWithTeamNamesDb";
import { createdMatch } from "../data/matches";

export const allMatchesDb: IMatchWithTeamNamesDb[] = [
  {
    id: 1,
    homeTeam: 16,
    homeTeamGoals: 1,
    awayTeam: 8,
    awayTeamGoals: 1,
    inProgress: false,
    'teamHome.teamName': 'São Paulo',
    'teamAway.teamName': 'Grêmio',
  },
  {
    id: 41,
    homeTeam: 16,
    homeTeamGoals: 2,
    awayTeam: 9,
    awayTeamGoals: 0,
    inProgress: true,
    'teamHome.teamName': 'São Paulo',
    'teamAway.teamName': 'Internacional',
  },
];

export const matchesOnlyInProgressDb: IMatchWithTeamNamesDb[] = [
  {
    id: 1,
    homeTeam: 16,
    homeTeamGoals: 1,
    awayTeam: 8,
    awayTeamGoals: 1,
    inProgress: false,
    'teamHome.teamName': 'São Paulo',
    'teamAway.teamName': 'Grêmio',
  },
];

export const createdMatchDb = { ...createdMatch }


