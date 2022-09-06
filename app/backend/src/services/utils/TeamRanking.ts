export interface ITeamRanking{
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: number,
  setRankingValues(goalsFavor: number, goalsOwn: number): void
}

class TeamRanking implements ITeamRanking {
  totalPoints = 0;
  totalGames = 0;
  totalVictories = 0;
  totalDraws = 0;
  totalLosses = 0;
  goalsFavor = 0;
  goalsOwn = 0;
  goalsBalance = 0;
  efficiency = 0;

  constructor(public name: string) {}

  private calcTotalPoints = (points:number) => {
    if (points > 0) {
      this.totalVictories += 1;
      return 3;
    }
    if (points === 0) {
      this.totalDraws += 1;
      return 1;
    }
    this.totalLosses += 1;
    return 0;
  };

  private calcEfficiency = () => {
    const efficiency = (this.totalPoints / (this.totalGames * 3)) * 100;
    return Number(efficiency.toFixed(2));
  };

  setRankingValues = (goalsFavor: number, goalsOwn: number) => {
    this.totalGames += 1;
    this.goalsFavor += goalsFavor;
    this.goalsOwn += goalsOwn;
    this.goalsBalance += goalsFavor - goalsOwn;
    this.totalPoints += this.calcTotalPoints(goalsFavor - goalsOwn);
    this.efficiency = this.calcEfficiency();
  };
}

export default TeamRanking;
