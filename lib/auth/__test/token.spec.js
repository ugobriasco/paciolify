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
  describe("#verifyToken", () => {});
  describe("#generatePasswordResetToken", () => {});
});
