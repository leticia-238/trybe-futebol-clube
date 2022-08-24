import "mocha";
import * as sinon from "sinon";
import * as chai from "chai";
// @ts-ignore
import chaiHttp = require("chai-http");
import User from "../database/models/User";
import { app } from "../app";
import AuthService from "../services/AuthService";
import { mockUserLogin, mockUserToken } from "./mocks/user";
import httpStatus from '../helpers/httpStatus'

chai.use(chaiHttp);

type BodyKeys = "token" | "message";

type ResponseType = {
  status: number;
  body: Record<BodyKeys, string>;
};

const validEmail = "email@email.com"
const validPassword = "123456abc"

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
        .send({ email: validEmail, password: validPassword});
    });

    after(sinon.restore);

    it("deve retornar um status 200", async () => {
      expect(chaiHttpResponse.status).to.equal(httpStatus.ok);
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
          requester.post("/login").send({ password: validPassword }),
          requester.post("/login").send({ email: validEmail }),
          requester.post("/login").send({ email: "", password: validPassword }),
          requester.post("/login").send({ email: validEmail, password: "" }),
        ]);
      });

      it("deve retornar o status 400 e uma mensagem de erro", async () => {
        const message = "All fields must be filled";
        chaiHttpResponses.forEach((response)=>{
          expect(response.status).to.equal(httpStatus.badRequest);
          expect(response.body).to.deep.equal({ message });
        })
      });
    });

    describe("requisição com campos inválidos", () => {
      before(async () => {
        chaiHttpResponses = await Promise.all([
          requester.post("/login").send({
            email: "invalid",
            password: validPassword,
          }),
          requester.post("/login").send({
            email: validEmail,
            password: "123",
          }),
        ]);
      });

      it("deve retornar o status 401 e uma mensagem de erro", async () => {
        const message = "Incorrect email or password";
        chaiHttpResponses.forEach((response)=>{
          expect(response.status).to.equal(httpStatus.unauthorized);
          expect(response.body).to.deep.equal({ message });
        })
      });
    });
  });
});
