import "mocha";
import * as sinon from "sinon";
import * as chai from "chai";
// @ts-ignore
import chaiHttp = require("chai-http");
import User from "../database/models/User";
import { app } from "../app";
import AuthService from "../services/AuthService";
import { mockUserLogin, mockUserToken, validEmail, validPassword } from "./mocks/user";
import httpStatus from '../helpers/httpStatus'

chai.use(chaiHttp);

type BodyKeys = "token" | "message";

type ResponseType = {
  status: number;
  body: Record<BodyKeys, string>;
};

const inexistentEmail = "other.email@email.com";
const inexistentPassword = "other.password";

const { expect } = chai;

describe("Testando o endpoint POST /login", () => {
  describe("requisição com email e senha válidos", () => {
    let chaiHttpResponse: ResponseType;

    before(async () => {
      sinon.stub(User, "findOne").resolves(mockUserLogin as User);
      sinon.stub(AuthService, "generateToken").returns(mockUserToken);
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
      expect(chaiHttpResponse.body).to.deep.equal({ token: mockUserToken });
    });
  });

  let chaiHttpResponses: ResponseType[];

  describe("requisição com email ou senha faltando", () => {
    before(async () => {
      sinon.stub(User, "findOne").rejects();
      let requester = chai.request(app).keepOpen();

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
      let requester = chai.request(app).keepOpen();

      chaiHttpResponses = await Promise.all([
        requester.post("/login").send({
          email: "invalid",
          password: validPassword,
        }),
        requester.post("/login").send({
          email: validEmail,
          password: "123",
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
