import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import httpStatus from '../helpers/httpStatus';
import Match from '../database/models/Match';
import { allMatchesDb, matchesOnlyInProgressDb } from './mocks/matches_mocks';
import { IMatchWithTeamNames } from '../interfaces/IMatchWithTeamNames'
import { allMatches, matchesOnlyInProgress } from './data/matches';
chai.use(chaiHttp);

type ResponseType = {
  status: number;
  body: IMatchWithTeamNames[];
};

const { expect } = chai;

describe('Testando o endpoint GET /matches', () => {
  let chaiHttpResponse: ResponseType;
  let chaiHttpResponses: ResponseType[];
  
  describe('requisição sem nenhuma query', () => {
    before(async () => {
      sinon.stub(Match, 'findAll').resolves(allMatchesDb as unknown as Match[]);
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

  describe('requisição com o parâmetro da query recebendo um valor válido', () => {
    before(async () => {
      sinon.stub(Match, 'findAll').resolves(matchesOnlyInProgressDb as unknown as Match[]);
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
    before(async () => {
      sinon.stub(Match, 'findAll').rejects();
      chaiHttpResponse = await chai.request(app).get('/matches?inProgress=abc');
    });

    after(sinon.restore);

    it('deve retornar um status 400', async () => {
      expect(chaiHttpResponse).to.have.status(httpStatus.badRequest);
    });

    it('deve retornar uma mensagem de erro', async () => {
      const message = 'parâmetro da query com valor inválido';
      expect(chaiHttpResponse.body).to.deep.equal({ message });
    });
  });

  describe('requisição com o parâmetro da query inválido', () => {
    before(async () => {
      sinon.stub(Match, 'findAll').rejects();
      const requester = chai.request(app).keepOpen();
      chaiHttpResponses = await Promise.all([
        requester.get('/matches?invalidParam'),
        requester.get('/matches?invalidParam=true'),
        requester.get('/matches?invalidParam=oi&abc=8'),
      ]);
      requester.close();
    });

    after(sinon.restore);

    it('deve retornar um status 400', async () => {
      expect(chaiHttpResponses[0]).to.have.status(httpStatus.badRequest);
      expect(chaiHttpResponses[1]).to.have.status(httpStatus.badRequest);
      expect(chaiHttpResponses[2]).to.have.status(httpStatus.badRequest);
    });

    it('deve retornar uma mensagem de erro', async () => {
      const message = 'query com parâmetros inválidos';
      expect(chaiHttpResponses[0].body).to.deep.equal({ message });
      expect(chaiHttpResponses[1].body).to.deep.equal({ message });
      expect(chaiHttpResponses[2].body).to.deep.equal({ message });
    });
  });
});
