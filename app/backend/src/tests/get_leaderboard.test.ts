import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import httpStatus from '../helpers/httpStatus';
import { ITeamRanking } from '../interfaces/ITeamRanking';
import {allMatchesDb} from './mocks/matches_mocks'
import { matchRepository } from '../repositories';
import { allTeamRankings } from './data/leaderboard';
chai.use(chaiHttp);

type ResponseType = {
  status: number;
  body: ITeamRanking[];
};

const { expect } = chai;

describe('Testando o endpoint GET /leaderboard', () => {
  let chaiHttpResponse: ResponseType;
  
  before(async () => {
    sinon.stub(matchRepository, 'findAllWithTeamNames').resolves(allMatchesDb);
    chaiHttpResponse = await chai.request(app).get('/leaderboard');
  });

  after(sinon.restore);

  it('deve retornar um status 200', async () => {
    expect(chaiHttpResponse).to.have.status(httpStatus.ok);
  });

  it('deve retornar uma lista com as classificações de todos os times', async () => {
    expect(chaiHttpResponse.body).to.deep.equal(allTeamRankings);
  });
});
