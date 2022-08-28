import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import User from '../database/models/User';
import { app } from '../app';
import httpStatus from '../helpers/httpStatus';
import { userDb } from './mocks/user_mocks';
import { invalidToken, validEmail, validPassword } from './data/login';

chai.use(chaiHttp);

type ResponseType = {
  status: number;
  body: { token: string };
};

const { expect } = chai;

describe('Testando o endpoint GET /login/validate', () => {
  let chaiHttpResponse: ResponseType;
  
  describe('requisição com token válido', () => {
    before(async () => {
      sinon.stub(User, 'findOne').resolves(userDb as User);
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
      expect(chaiHttpResponse.body).to.deep.equal({ role: 'admin' });
    });
  });

  describe('requisição com token inválido', () => {
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
      const message = 'invalid token';
      expect(chaiHttpResponse.body).to.deep.equal({ message });
    });
  });

  describe('requisição sem o token de autenticação', () => {
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
