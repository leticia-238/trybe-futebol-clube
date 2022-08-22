import "mocha";
import * as sinon from "sinon";
import * as chai from "chai";
// @ts-ignore
import chaiHttp = require("chai-http");
import User from "../database/models/User";
import { app } from "../app";

chai.use(chaiHttp);

const mockLogin = {
  email: "string",
  password: "string",
};

const mockToken = "token";
const mockErrorMessage = "message";

type BodyKeys = "token" | "message";

type ResponseType = {
  status: number;
  body: Record<BodyKeys, string>;
};

const { expect } = chai;

describe("Teste Login", () => {
  let chaiHttpResponse: ResponseType;

  describe("Login válido", () => {
    before(async () => {
      sinon.stub(User, "findOne").resolves(mockLogin as User);
      chaiHttpResponse = await chai.request(app).post("/login");
    });

    after(sinon.restore);

    it("deve retornar um status 200", async () => {
      expect(chaiHttpResponse.status).to.equal(200);
    });

    it("deve retornar um token", async () => {
      // sinon.stub(Auth, "generateToken").returns(mockToken);
      expect(chaiHttpResponse.body).to.equal({ token: mockToken });
    });
  });

  describe("Login inválido", () => {
    before(async () => {
      sinon.stub(User, "findOne").rejects();
      chaiHttpResponse = await chai.request(app).post("/login");
    });

    after(sinon.restore);

    it("deve retornar um status 400", async () => {
      expect(chaiHttpResponse.status).to.equal(400);
    });

    it("deve retornar uma mensagem de erro", async () => {
      expect(chaiHttpResponse.status).to.equal({ message: mockErrorMessage });
    });
  });
});
