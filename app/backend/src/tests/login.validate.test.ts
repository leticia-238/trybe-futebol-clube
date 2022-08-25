import "mocha";
import * as sinon from "sinon";
import * as chai from "chai";
// @ts-ignore
import chaiHttp = require("chai-http");
import User from "../database/models/User";
import { app } from "../app";
import { mockUserLogin, validEmail, validPassword } from "./mocks/user";
import httpStatus from "../helpers/httpStatus";

chai.use(chaiHttp);

type ResponseType = {
  status: number;
  body: { token: string };
};

const invalidToken = "123&$*%34yuft$#56765"

const { expect } = chai;

describe("Testando o endpoint GET /login/validate", () => {
  describe("requisição com token válido", () => {
    let chaiHttpResponse: ResponseType;

    before(async () => {
      sinon.stub(User, "findOne").resolves(mockUserLogin as User);
      chaiHttpResponse = await chai
        .request(app)
        .post("/login")
        .send({ email: validEmail, password: validPassword });

      const { token } = chaiHttpResponse.body;

      chaiHttpResponse = await chai
        .request(app)
        .get("/login/validate")
        .set({ Authorization: token });
    });

    after(sinon.restore);

    it("deve retornar o status 200", async () => {
      expect(chaiHttpResponse).to.have.status(httpStatus.ok);
    });

    it("deve retornar um objeto com a 'role' do user", async () => {
      expect(chaiHttpResponse.body).to.deep.equal({ role: "admin" });
    });
  });
  
  describe("requisição com token inválido", () => {
    let chaiHttpResponse: ResponseType;

    before(async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get("/login/validate")
        .set({ Authorization: invalidToken });
    });

    after(sinon.restore);

    it("deve retornar o status 401", async () => {
      expect(chaiHttpResponse).to.have.status(httpStatus.unauthorized);
    });

    it("deve retornar uma mensagem de erro", async () => {
      const message = 'invalid token'
      expect(chaiHttpResponse.body).to.deep.equal({ message });
    });
  });
  
  describe("requisição sem o token de autenticação", () => {
    let chaiHttpResponse: ResponseType;

    before(async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get("/login/validate")
    });

    after(sinon.restore);

    it("deve retornar o status 400", async () => {
      expect(chaiHttpResponse).to.have.status(httpStatus.badRequest);
    });

    it("deve retornar uma mensagem de erro", async () => {
      const message = 'token not found'
      expect(chaiHttpResponse.body).to.deep.equal({ message });
    });
  });
});
