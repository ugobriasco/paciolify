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

describe("/404", () => {
  it("GET a unmapped route shall return a 404", done => {
    chai
      .request(HOST)
      .get(`/fooBar`)
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
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

describe("/login", () => {
  it("POST shall return a 200 if valid authentication", done => {
    chai
      .request(HOST)
      .post(`/login`)
      .send({ email: "foo", password: "foo" })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });
  it("POST shall return a 401 if invalid authentication", done => {
    chai
      .request(HOST)
      .post(`/login`)
      .send({ email: "foo", password: "Bla" })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.a("object");
        done();
      });
  });
  it("POST shall return a 401 if user not found", done => {
    chai
      .request(HOST)
      .post(`/login`)
      .send({ email: "Bla", password: "foo" })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.a("object");
        done();
      });
  });
  it("POST shall return a 400 if no email is presented", done => {
    chai
      .request(HOST)
      .post(`/login`)
      .send({ username: "foo", password: "foo" })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        done();
      });
  });
  it("POST shall return a 400 if no password is presented", done => {
    chai
      .request(HOST)
      .post(`/login`)
      .send({ email: "foo", avocado: true })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        done();
      });
  });
});
