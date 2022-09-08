import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import httpStatus from '../helpers/httpStatus';
import { matchesOnlyInProgressDb } from './mocks/matches_mocks';
import { IMatchWithTeamNames, IMatchWithTeamNamesDb } from '../interfaces/match_interfaces/IMatchWithTeamNames'
import { matchesOnlyInProgress } from './data/matches';
import { matchRepository } from '../repositories';

chai.use(chaiHttp);

type ResponseType = {
  status: number;
  body: IMatchWithTeamNames[];
};

const { expect } = chai;

describe('Testando o endpoint GET /matches?inProgress=true', () => {
  
  describe('requisição com o parâmetro da query recebendo um valor válido', () => {
    let chaiHttpResponse: ResponseType;
    
    before(async () => {
      sinon.stub(matchRepository, 'findAllWithTeamNames')
        .resolves(matchesOnlyInProgressDb as IMatchWithTeamNamesDb[]);
      chaiHttpResponse = await chai
        .request(app)
        .get('/matches?inProgress=true');
    });

    after(sinon.restore);

    it('deve retornar um status 200', async () => {
      expect(chaiHttpResponse).to.have.status(httpStatus.ok);
    });

    it('deve retornar uma lista das partidas filtradas pela query', async () => {
      expect(chaiHttpResponse.body).to.deep.equal(matchesOnlyInProgress);
    });
  });

  describe('requisição com o parâmetro da query recebendo um valor inválido', () => {
    let chaiHttpResponse: ResponseType;
    
    before(async () => {
      sinon.stub(matchRepository, 'findAllWithTeamNames').rejects();
      chaiHttpResponse = await chai.request(app).get('/matches?inProgress=abc');
    });

    after(sinon.restore);

    it('deve retornar um status 400', async () => {
      expect(chaiHttpResponse).to.have.status(httpStatus.badRequest);
    });

    it('deve retornar uma mensagem de erro', async () => {
      const message = 'invalid value for query string parameter "inProgress"';
      expect(chaiHttpResponse.body).to.deep.equal({ message });
    });
  });
});
