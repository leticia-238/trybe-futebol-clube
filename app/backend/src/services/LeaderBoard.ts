import { ILeaderBoard } from '../interfaces/ILeaderBoard';

class LeaderBoard implements ILeaderBoard {
  totalPoints = 0;
  totalGames = 0;
  totalVictories = 0;
  totalDraws = 0;
  totalLosses = 0;
  goalsFavor = 0;
  goalsOwn = 0;
  goalsBalance = 0;
  efficiency = 0;

  constructor(
    public name: string,
    goalsFavor: number,
    goalsOwn: number,
  ) {
    this.setGameValues(goalsFavor, goalsOwn);
  }

  calcTotalPoints = (points:number) => {
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

  calcEfficiency = () => (this.totalPoints / (this.totalGames * 3)) * 100;

  setGameValues = (goalsFavor: number, goalsOwn: number) => {
    this.totalGames += 1;
    this.goalsFavor += goalsFavor;
    this.goalsOwn += goalsOwn;
    this.goalsBalance += goalsFavor - goalsOwn;
    this.totalPoints += this.calcTotalPoints(goalsFavor - goalsOwn);
    this.efficiency = Number(this.calcEfficiency().toFixed(2));
  };
}

export default LeaderBoard;
