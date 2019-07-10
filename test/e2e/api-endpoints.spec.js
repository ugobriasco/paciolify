const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const should = chai.should();

// System under test
const app = require("../../index.js");

const HOST = "http://localhost:3000";

let serverInstance;

before(done => {
  serverInstance = app.start();
  done();
});

after(done => {
  serverInstance = app.stop();
  done();
});

describe("/status", () => {
  it("GET shall return a 200", done => {
    chai
      .request(HOST)
      .get(`/status`)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
