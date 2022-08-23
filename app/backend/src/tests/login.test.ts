import "mocha";
import * as sinon from "sinon";
import * as chai from "chai";
// @ts-ignore
import chaiHttp = require("chai-http");
import User from "../database/models/User";
import { app } from "../app";
import AuthService from "../services/AuthService";
import { mockUserLogin, mockUserToken } from "./mocks/user";

chai.use(chaiHttp);

type BodyKeys = "token" | "message";

type ResponseType = {
  status: number;
  body: Record<BodyKeys, string>;
};

const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;

const { expect } = chai;

describe("Teste Login", () => {
  let requester = chai.request(app).keepOpen();

  describe("Login válido", () => {
    let chaiHttpResponse: ResponseType;
    before(async () => {
      sinon.stub(User, "findOne").resolves(mockUserLogin as User);
      sinon.stub(AuthService, "generateToken").returns(mockUserToken);
      chaiHttpResponse = await requester
        .post("/login")
        .send({ email: "email@email.com", password: "123456abc" });
    });

    after(sinon.restore);

    it("deve retornar um status 200", async () => {
      expect(chaiHttpResponse.status).to.equal(200);
    });
    it("deve retornar um token", async () => {
      expect(chaiHttpResponse.body).to.deep.equal({ token: mockUserToken });
    });
  });

  describe("Login inválido", () => {
    let chaiHttpResponses: ResponseType[];

    before(() => {
      sinon.stub(User, "findOne");
    });

    after(sinon.restore);

    describe("requisição com campos faltando", () => {
      before(async () => {
        chaiHttpResponses = await Promise.all([
          requester.post("/login").send({ password: "123456" }),
          requester.post("/login").send({ email: "email@email.com" }),
        ]);
      });

      it("deve retornar um status 400", async () => {
        expect(chaiHttpResponses[0].status).to.equal(BAD_REQUEST);
        expect(chaiHttpResponses[1].status).to.equal(BAD_REQUEST);
      });
      it("deve retornar uma mensagem de erro", async () => {
        const message = "All fields must be filled";
        expect(chaiHttpResponses[0].body).to.deep.equal({ message });
        expect(chaiHttpResponses[1].body).to.deep.equal({ message });
      });
    });

    describe("requisição com campos inválidos", () => {
      before(async () => {
        chaiHttpResponses = await Promise.all([
          requester.post("/login").send({
            email: "invalid",
            password: "123456abc",
          }),
          requester.post("/login").send({
            email: "email@email.com",
            password: "123",
          }),
        ]);
      });

      it("deve retornar um status 401", async () => {
        expect(chaiHttpResponses[0].status).to.equal(UNAUTHORIZED);
        expect(chaiHttpResponses[1].status).to.equal(UNAUTHORIZED);
      });
      it("deve retornar uma mensagem de erro", async () => {
        const message = "Incorrect email or password";
        expect(chaiHttpResponses[0].body).to.deep.equal({ message });
        expect(chaiHttpResponses[1].body).to.deep.equal({ message });
      });
    });
  });
});
