import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import httpStatus from '../helpers/httpStatus';
import { createdMatchDb } from './mocks/matches_mocks';
import { IMatch, IMatchDb } from '../interfaces/match_interfaces/IMatch';
import { 
  createdMatch, invalidMatch1, invalidMatch2, invalidMatch3, 
  matchWithEqualTeams, matchWithInexistentsTeams, validMatch 
} from './data/matches';
import { matchRepository } from '../repositories';
import { authService } from '../services';
import { userDb } from './mocks/user_mocks';

chai.use(chaiHttp);

type ResponseType = {
  status: number;
  body: IMatch;
};

const { expect } = chai;

describe('Testando o endpoint POST /matches', () => {
  
  describe('requisição com partida válida', () => {
    let chaiHttpResponse: ResponseType;
    
    before(async () => {
      sinon.stub(matchRepository, 'create').resolves(createdMatchDb as IMatchDb);
      sinon.stub(authService, 'verifyToken').returns(userDb);

      chaiHttpResponse = await chai.request(app)
        .post('/matches')
        .send(validMatch)
    });

    after(sinon.restore);

    it('deve retornar um status 201', async () => {
      expect(chaiHttpResponse).to.have.status(httpStatus.created);
    });

    it('deve retornar os dados da partida criada', async () => {
      expect(chaiHttpResponse.body).to.deep.equal(createdMatch);
    });
  });

  describe('requisição com os dados da partida inválidos', () => {
    let chaiHttpResponses: ResponseType[];
    
    before(async () => {
      sinon.stub(matchRepository, 'create').rejects();
      sinon.stub(authService, 'verifyToken').returns(userDb);
      
      const requester = chai.request(app).keepOpen()
      chaiHttpResponses = await Promise.all([
        requester.post('/matches').send(invalidMatch1),
        requester.post('/matches').send(invalidMatch2),
        requester.post('/matches').send(invalidMatch3),
      ])  
      requester.close()
    });

    after(sinon.restore);

    it('deve retornar um status 400', async () => {
      expect(chaiHttpResponses[0]).to.have.status(httpStatus.badRequest);
      expect(chaiHttpResponses[1]).to.have.status(httpStatus.badRequest);
      expect(chaiHttpResponses[2]).to.have.status(httpStatus.badRequest);
    });

    it('deve retornar uma mensagem de erro', async () => {
      const message = 'invalid match fields';
      expect(chaiHttpResponses[0].body).to.deep.equal({ message });
      expect(chaiHttpResponses[1].body).to.deep.equal({ message });
      expect(chaiHttpResponses[2].body).to.deep.equal({ message });
    });
  });
  
  describe('requisição com times iguais na mesma partida', () => {
    let chaiHttpResponse: ResponseType;
    
    before(async () => {
      sinon.stub(matchRepository, 'create').rejects();
      sinon.stub(authService, 'verifyToken').returns(userDb);
      
      chaiHttpResponse = await chai.request(app)
        .post('/matches')
        .send(matchWithEqualTeams)
    });

    after(sinon.restore);

    it('deve retornar um status 401', async () => {
      expect(chaiHttpResponse).to.have.status(httpStatus.unauthorized);
    });

    it('deve retornar uma mensagem de erro', async () => {
      const message = 'It is not possible to create a match with two equal teams';
      expect(chaiHttpResponse.body).to.deep.equal({ message });
    });
  });

  describe('requisição com partida com times que não existem', () => {
    let chaiHttpResponse: ResponseType;
    
    before(async () => {
      sinon.stub(matchRepository, 'create').rejects();
      sinon.stub(authService, 'verifyToken').returns(userDb);
      
      chaiHttpResponse = await chai.request(app)
      .post('/matches')
      .send(matchWithInexistentsTeams)
    });

    after(sinon.restore);

    it('deve retornar um status 404', async () => {
      expect(chaiHttpResponse).to.have.status(httpStatus.notFound);
    });

    it('deve retornar uma mensagem de erro', async () => {
      const message = 'There is no team with such id!';
      expect(chaiHttpResponse.body).to.deep.equal({ message });
    });
  });
});
