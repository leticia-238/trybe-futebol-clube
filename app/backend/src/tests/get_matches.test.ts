import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import httpStatus from '../helpers/httpStatus';
import { allMatchesDb } from './mocks/matches_mocks';
import { IMatchWithTeamNames, IMatchWithTeamNamesDb } from '../interfaces/match_interfaces/IMatchWithTeamNames'
import { allMatches } from './data/matches';
import { matchRepository } from '../repositories';

chai.use(chaiHttp);

type ResponseType = {
  status: number;
  body: IMatchWithTeamNames[];
};

const { expect } = chai;

describe('Testando o endpoint GET /matches', () => {
  let chaiHttpResponse: ResponseType;
  
  before(async () => {
    sinon.stub(matchRepository, 'findAllWithTeamNames')
      .resolves(allMatchesDb as IMatchWithTeamNamesDb[]);
    chaiHttpResponse = await chai.request(app).get('/matches');
  });

  after(sinon.restore);

  it('deve retornar um status 200', async () => {
    expect(chaiHttpResponse).to.have.status(httpStatus.ok);
  });

  it('deve retornar uma lista com dados de todas as partidas', async () => {
    expect(chaiHttpResponse.body).to.deep.equal(allMatches);
  });
});
