const expect = require("chai").expect;

const User = require("../user-model");

describe("user-model", () => {
  describe("model validation", () => {
    it("should be invalid if email or password are missing", done => {
      const u = new User();
      u.validate(err => {
        expect(err.errors["local.email"]).to.exist;
        expect(err.errors["local.password"]).to.exist;
        done();
      });
    });
    it("should return a user with role User as default", done => {
      const u = new User({ local: { email: "foo@foo.com", password: "foo" } });
      expect(u.role).to.exist;
      expect(u.role).to.be.equal("User");
      u.validate(err => {
        expect(err).to.not.exist;
        done();
      });
    });
    it("should return a user with role Admin if given", done => {
      const u = new User({
        local: {
          email: "foo@foo.com",
          password: "foo"
        },
        role: "Admin"
      });
      expect(u.role).to.exist;
      expect(u.role).to.be.equal("Admin");
      u.validate(err => {
        expect(err).to.not.exist;
        done();
      });
    });
    it("should be invalid if the role is otuside the acceptance labels", done => {
      const u = new User({
        local: {
          email: "foo@foo.com",
          password: "foo"
        },
        role: "Wizard"
      });
      u.validate(err => {
        expect(err.errors["local.email"]).to.not.exist;
        expect(err.errors["local.password"]).to.not.exist;
        expect(err.errors.role).to.exist;
        done();
      });
    });
  });
  describe("instance methods", () => {
    describe.skip("#generateHash", () => {
      it("should save by encrypting the password", done => {
        const u = new User();
        const password = "secret";
        const hash = u.generateHash(password);
        expect(hash).to.exist;
        expect(hash).to.not.be.equal("password");
        done();
      });
    });
    describe.skip("#validatePassword", () => {
      it("should be able to verify the pasword", done => {
        const u = new User();
        u.local.password = u.generateHash("super_password");
        const pswValidation = u.validatePassword("super_password");
        expect(pswValidation).to.be.equal(true);
        done();
      });
      it("should be able to verify an invalid password", done => {
        const u = new User();
        u.local.password = u.generateHash("super_password");
        const pswValidation = u.validatePassword("invalid_password");
        expect(pswValidation).to.be.equal(false);
        done();
      });
    });
  });
});
