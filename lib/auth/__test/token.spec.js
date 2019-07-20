const expect = require("chai").expect;

const token = require("../token");

describe("token", () => {
  describe("#generateToken", () => {
    it("returns a hashed token if a user profile including role and id is submitted", done => {
      const user = { role: "Wizard", _id: "1234" };
      const _token = token.generateToken(user);
      expect(_token).to.be.a("string");
      done();
    });
  });
  describe("#verifyToken", () => {
    it("returns decoded information of a valid jwt", done => {
      const _token = token.generateToken({ role: "Wizard", _id: "1234" });
      token.verifyToken({ token: _token }).then(decoded => {
        expect(decoded).to.be.a("object");
        expect(decoded.userID).to.be.equal("1234");
        expect(decoded.role).to.be.equal("Wizard");
        done();
      });
    });
  });
  describe("#generatePasswordResetToken", () => {});
});
