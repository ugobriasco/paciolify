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

describe("/user", () => {
  it("GET shall return a 200 and a list of users", done => {
    chai
      .request(HOST)
      .get(`/user`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
        done();
      });
  });
});

describe("/user/id/:UID", () => {
  it("GET shall return a 200 and a user", done => {
    chai
      .request(HOST)
      .get(`/user/id/5d2cee95cdb0ec76f9b64f22`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });
});
