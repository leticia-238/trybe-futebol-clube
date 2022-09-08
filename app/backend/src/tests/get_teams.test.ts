import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import httpStatus from '../helpers/httpStatus';
import { teams } from './mocks/teams_mocks';
import { ITeam } from '../interfaces/team_interfaces/ITeam'
import { teamRepository } from '../repositories';
chai.use(chaiHttp);

type ResponseType = {
  status: number;
  body: ITeam[];
};

const { expect } = chai;

describe('Testando o endpoint GET /teams', () => {
  let chaiHttpResponse: ResponseType;

  before(async () => {
    sinon.stub(teamRepository, 'findAll').resolves(teams as ITeam[]);
    chaiHttpResponse = await chai.request(app).get('/teams');
  });

  after(sinon.restore);

  it('deve retornar um status 200', async () => {
    expect(chaiHttpResponse).to.have.status(httpStatus.ok);
  });

  it('deve retornar uma lista com dados de todos os times', async () => {
    expect(chaiHttpResponse.body).to.deep.equal(teams);
  });
});

