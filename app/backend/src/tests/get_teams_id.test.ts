import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import httpStatus from '../helpers/httpStatus';
import { team } from './mocks/teams_mocks';
import { ITeam } from '../interfaces/team_interfaces/ITeam'
import { teamRepository } from '../repositories';
chai.use(chaiHttp);

type ResponseType = {
  status: number;
  body: ITeam;
};

const { expect } = chai;

describe('Testando o endpoint GET /teams/:id', () => {
  
  describe('requisição com parâmetro id válido', () => {
    let chaiHttpResponse: ResponseType;
    
    before(async () => {
      sinon.stub(teamRepository, 'findById').resolves(team as ITeam);
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
    let chaiHttpResponse: ResponseType;
    
    before(async () => {
      sinon.stub(teamRepository, 'findById').resolves();
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
    let chaiHttpResponse: ResponseType;
    
    before(async () => {
      sinon.stub(teamRepository, 'findById').resolves(undefined);
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
