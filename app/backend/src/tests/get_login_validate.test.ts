import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import httpStatus from '../helpers/httpStatus';
import { userDb } from './mocks/user_mocks';
import { invalidToken, validEmail, validPassword } from './data/login';
import { userRepository } from '../repositories';
import { IUserWithPassword } from '../interfaces/user_interfaces';

chai.use(chaiHttp);

type ResponseType = {
  status: number;
  body: { token: string };
};

const { expect } = chai;

describe('Testando o endpoint GET /login/validate', () => {
  
  describe('requisição com token válido', () => {
    let chaiHttpResponse: ResponseType;
    before(async () => {
      sinon.stub(userRepository, 'findByEmail').resolves(userDb as IUserWithPassword);
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({ email: validEmail, password: validPassword });

      const { token } = chaiHttpResponse.body;

      chaiHttpResponse = await chai
        .request(app)
        .get('/login/validate')
        .set({ Authorization: token });
    });

    after(sinon.restore);

    it('deve retornar o status 200', async () => {
      expect(chaiHttpResponse).to.have.status(httpStatus.ok);
    });

    it("deve retornar um objeto com a 'role' do user", async () => {
      expect(chaiHttpResponse.body).to.deep.equal({ role: userDb.role });
    });
  });

  describe('requisição com token inválido', () => {
    let chaiHttpResponse: ResponseType;
    
    before(async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/login/validate')
        .set({ Authorization: invalidToken });
    });

    after(sinon.restore);

    it('deve retornar o status 401', async () => {
      expect(chaiHttpResponse).to.have.status(httpStatus.unauthorized);
    });

    it('deve retornar uma mensagem de erro', async () => {
      const message = 'Token must be a valid token';
      expect(chaiHttpResponse.body).to.deep.equal({ message });
    });
  });

  describe('requisição sem o token de autenticação', () => {
    let chaiHttpResponse: ResponseType;
    
    before(async () => {
      chaiHttpResponse = await chai.request(app).get('/login/validate');
    });

    after(sinon.restore);

    it('deve retornar o status 400', async () => {
      expect(chaiHttpResponse).to.have.status(httpStatus.badRequest);
    });

    it('deve retornar uma mensagem de erro', async () => {
      const message = 'token not found';
      expect(chaiHttpResponse.body).to.deep.equal({ message });
    });
  });
});
