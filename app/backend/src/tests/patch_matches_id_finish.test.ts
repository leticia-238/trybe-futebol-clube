import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import httpStatus from '../helpers/httpStatus';
import { expect } from 'chai';
import { matchRepository } from '../repositories';

chai.use(chaiHttp);

type ResponseType = {
  status: number;
  body: {}
};

describe('Testando o endpoint PATCH /matches/id:/finish', () => {
  let chaiHttpResponse: ResponseType;
  
  before(async () => {
    sinon.stub(matchRepository, 'update').resolves();
    chaiHttpResponse = await chai.request(app)
      .patch('/matches/1/finish')
  });

  after(sinon.restore);

  it('deve retornar um status 200', async () => {
    expect(chaiHttpResponse).to.have.status(httpStatus.ok);
  });

  it('deve retornar uma mensagem de "finished"', async () => {
    const message = "Finished"
    expect(chaiHttpResponse.body).to.deep.equal({ message });
  });
});
