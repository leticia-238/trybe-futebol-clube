import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import httpStatus from '../helpers/httpStatus';
import Team from '../database/models/Team';
import { team, teams } from './mocks/teams_mocks';
import { ITeam } from '../interfaces/team_interfaces/ITeam'
chai.use(chaiHttp);

type ResponseType = {
  status: number;
  body: ITeam[];
};

const { expect } = chai;

describe('Testando o endpoint GET /teams', () => {
  let chaiHttpResponse: ResponseType;

  before(async () => {
    sinon.stub(Team, 'findAll').resolves(teams as Team[]);
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

describe('Testando o endpoint GET /teams/:id', () => {
  let chaiHttpResponse: ResponseType;

  describe('requisição com parâmetro id válido', () => {
    before(async () => {
      sinon.stub(Team, 'findByPk').resolves(team as Team);
      chaiHttpResponse = await chai.request(app).get(`/teams/${team.id}`);
    });

    after(sinon.restore);

    it('deve retornar um status 200', async () => {
      expect(chaiHttpResponse).to.have.status(httpStatus.ok);
    });

    it('deve retornar dados de um time específico', async () => {
      expect(chaiHttpResponse.body).to.deep.equal(team);
    });
  });

  describe('requisição com parâmetro id inválido', () => {
    before(async () => {
      sinon.stub(Team, 'findByPk').resolves();
      chaiHttpResponse = await chai.request(app).get('/teams/abc')
    });

    after(sinon.restore);

    it('deve retornar um status 400', async () => {
      expect(chaiHttpResponse).to.have.status(httpStatus.badRequest);
    });

    it('deve retornar uma mensagem de erro', async () => {
      const message = 'invalid id parameter';
      expect(chaiHttpResponse.body).to.deep.equal({ message });
    });
  });
  
  describe('requisição com parâmetro id inexistent no db', () => {
    before(async () => {
      sinon.stub(Team, 'findByPk').resolves();
      chaiHttpResponse = await chai.request(app).get('/teams/89')
    });

    after(sinon.restore);

    it('deve retornar um status 404', async () => {
      expect(chaiHttpResponse).to.have.status(httpStatus.notFound);
    });

    it('deve retornar uma mensagem de erro', async () => {
      const message = 'team not found';
      expect(chaiHttpResponse.body).to.deep.equal({ message });
    });
  });
});
