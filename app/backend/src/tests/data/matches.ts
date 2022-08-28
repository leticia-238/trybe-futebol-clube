import { IMatchWithTeamNames } from "../../interfaces/IMatchWithTeamNames";

export const allMatches: IMatchWithTeamNames[] = [
  {
    id: 1,
    homeTeam: 16,
    homeTeamGoals: 1,
    awayTeam: 8,
    awayTeamGoals: 1,
    inProgress: false,
    teamHome: {
      teamName: "São Paulo",
    },
    teamAway: {
      teamName: "Grêmio",
    },
  },
  {
    id: 41,
    homeTeam: 16,
    homeTeamGoals: 2,
    awayTeam: 9,
    awayTeamGoals: 0,
    inProgress: true,
    teamHome: {
      teamName: "São Paulo",
    },
    teamAway: {
      teamName: "Internacional",
    },
  },
];

export const matchesOnlyInProgress: IMatchWithTeamNames[] = [
  {
    id: 1,
    homeTeam: 16,
    homeTeamGoals: 1,
    awayTeam: 8,
    awayTeamGoals: 1,
    inProgress: false,
    teamHome: {
      teamName: "São Paulo",
    },
    teamAway: {
      teamName: "Grêmio",
    },
  },
];

export const validMatch = {
  homeTeam: 16, 
  awayTeam: 8, 
  homeTeamGoals: 2,
  awayTeamGoals: 2
}

export const createdMatch = { 
  ...validMatch,
  id: 1,
  inProgress: true,
};


