import "mocha";
import * as sinon from "sinon";
import * as chai from "chai";
// @ts-ignore
import chaiHttp = require("chai-http");
import User from "../database/models/User";
import { app } from "../app";
import { mockUserLogin, validEmail, validPassword } from "./mocks/user";
import httpStatus from '../helpers/httpStatus'
import { RoleType } from "../interfaces/User";

chai.use(chaiHttp);

type ResponseType = {
  status: number;
  // headers: { 
  //   authorization: {
  //     role: RoleType 
  //   }
  // }
  body: {token:string}
};

const { expect } = chai;

describe("Testando o endpoint GET /login/validate", () => {
  describe("requisição com token válido", () => {
    let chaiHttpResponse: ResponseType;

    before(async () => {
      sinon.stub(User, "findOne").resolves(mockUserLogin as User);
      chaiHttpResponse = await chai
        .request(app).post("/login")
        .send({ email: validEmail, password: validPassword });
        
      const {token} = chaiHttpResponse.body
        
      chaiHttpResponse = await chai
        .request(app)
        .get("/login/validate")
        .set({ Authorization: token })
    });

    after(sinon.restore);

    it("deve retornar um status 200", async () => {
      expect(chaiHttpResponse).to.have.status(httpStatus.ok);
    });

    it("deve retornar um objeto com a 'role' do user", async () => {
      expect(chaiHttpResponse.body).to.deep.equal({ role: "admin" });
    });
  });
})