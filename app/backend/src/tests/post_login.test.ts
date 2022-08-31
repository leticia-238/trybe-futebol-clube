import * as sinon from "sinon";
import * as chai from "chai";
// @ts-ignore
import chaiHttp = require("chai-http");
import User from "../database/models/User";
import { app } from "../app";
import httpStatus from "../helpers/httpStatus";
import {
  inexistentEmail,
  inexistentPassword,
  invalidEmail,
  invalidPassword,
  validEmail,
  validPassword,
} from "./data/login";
import { userDb, userToken } from "./mocks/user_mocks";
import * as jwt from 'jsonwebtoken';
import { SinonStub } from 'sinon';

chai.use(chaiHttp);

type BodyKeys = "token" | "message";

type ResponseType = {
  status: number;
  body: Record<BodyKeys, string>;
};

const { expect } = chai;

describe("Testando o endpoint POST /login", () => {
  let chaiHttpResponse: ResponseType;
  let chaiHttpResponses: ResponseType[];

  describe("requisição com email e senha válidos", () => {
    before(async () => {
      sinon.stub(User, "findOne").resolves(userDb as User);
      const stub = sinon.stub(jwt, 'sign') as SinonStub
      stub.returns(userToken)
      chaiHttpResponse = await chai
        .request(app)
        .post("/login")
        .send({ email: validEmail, password: validPassword });
    });

    after(sinon.restore);

    it("deve retornar um status 200", async () => {
      expect(chaiHttpResponse).to.have.status(httpStatus.ok);
    });

    it("deve retornar um token", async () => {
      expect(chaiHttpResponse.body).to.deep.equal({ token: userToken });
    });
  });

  describe("requisição com email ou senha faltando", () => {
    before(async () => {
      sinon.stub(User, "findOne").rejects();
      const requester = chai.request(app).keepOpen();

      chaiHttpResponses = await Promise.all([
        requester.post("/login").send({ password: validPassword }),
        requester.post("/login").send({ email: validEmail }),
        requester.post("/login").send({ email: "", password: validPassword }),
        requester.post("/login").send({ email: validEmail, password: "" }),
      ]);
      requester.close();
    });

    after(sinon.restore);

    it("deve retornar o status 400", async () => {
      expect(chaiHttpResponses[0]).to.have.status(httpStatus.badRequest);
      expect(chaiHttpResponses[1]).to.have.status(httpStatus.badRequest);
      expect(chaiHttpResponses[2]).to.have.status(httpStatus.badRequest);
      expect(chaiHttpResponses[3]).to.have.status(httpStatus.badRequest);
    });

    it("deve retornar uma mensagem de erro", async () => {
      const message = "All fields must be filled";
      expect(chaiHttpResponses[0].body).to.deep.equal({ message });
      expect(chaiHttpResponses[1].body).to.deep.equal({ message });
      expect(chaiHttpResponses[2].body).to.deep.equal({ message });
      expect(chaiHttpResponses[3].body).to.deep.equal({ message });
    });
  });

  describe("requisição com email ou senha inválidos", () => {
    before(async () => {
      sinon.stub(User, "findOne").resolves();
      const requester = chai.request(app).keepOpen();

      chaiHttpResponses = await Promise.all([
        requester.post("/login").send({
          email: invalidEmail,
          password: validPassword,
        }),
        requester.post("/login").send({
          email: validEmail,
          password: invalidPassword,
        }),
        requester.post("/login").send({
          email: inexistentEmail,
          password: validPassword,
        }),
        requester.post("/login").send({
          email: validEmail,
          password: inexistentPassword,
        }),
      ]);
      requester.close();
    });

    after(sinon.restore);

    it("deve retornar o status 401", async () => {
      expect(chaiHttpResponses[0]).to.have.status(httpStatus.unauthorized);
      expect(chaiHttpResponses[1]).to.have.status(httpStatus.unauthorized);
      expect(chaiHttpResponses[2]).to.have.status(httpStatus.unauthorized);
      expect(chaiHttpResponses[3]).to.have.status(httpStatus.unauthorized);
    });

    it("deve retornar uma mensagem de erro", async () => {
      const message = "Incorrect email or password";
      expect(chaiHttpResponses[0]).to.be.json;
      expect(chaiHttpResponses[1]).to.be.json;
      expect(chaiHttpResponses[2]).to.be.json;
      expect(chaiHttpResponses[3]).to.be.json;
      expect(chaiHttpResponses[0].body).to.deep.equal({ message });
      expect(chaiHttpResponses[1].body).to.deep.equal({ message });
      expect(chaiHttpResponses[2].body).to.deep.equal({ message });
      expect(chaiHttpResponses[3].body).to.deep.equal({ message });
    });
  });
});
