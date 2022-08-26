import * as sinon from "sinon";
import * as chai from "chai";
// @ts-ignore
import chaiHttp = require("chai-http");
import { app } from "../app";
import httpStatus from "../helpers/httpStatus";
import { IMatchWithTeams } from "../interfaces/Match";
import Match from "../database/models/Match";
import { mockMatchesDb, mockMatchesResponse } from "./mocks/matches";

chai.use(chaiHttp);

type ResponseType = {
  status: number;
  body: IMatchWithTeams[];
};

const { expect } = chai;

describe("Testando o endpoint GET /matches", () => {
  let chaiHttpResponse: ResponseType;

  before(async () => {
    sinon.stub(Match, "findAll").resolves(mockMatchesDb as any);
    chaiHttpResponse = await chai.request(app).get("/matches");
  });

  after(sinon.restore);

  it("deve retornar um status 200", async () => {
    expect(chaiHttpResponse).to.have.status(httpStatus.ok);
  });

  it("deve retornar uma lista com dados de todas as partidas", async () => {
    expect(chaiHttpResponse.body).to.deep.equal(mockMatchesResponse);
  });
});
