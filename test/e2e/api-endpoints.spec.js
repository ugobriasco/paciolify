const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const should = chai.should();

// System under test
const server = require("../../lib/server");

const HOST = "http://localhost:3000";

// TODO: spin up and down the server
// before(done => {
//   server.start();
//   server.on("server-started", function() {
//     done();
//   });
// });
//
// after(done => server.stop(err => done()));

describe("/status", () => {
  it("shall return a 200 by getting its /status", done => {
    chai
      .request(HOST)
      .get(`/status`)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
