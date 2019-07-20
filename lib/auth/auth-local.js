const bcrypt = require("bcrypt");
const BCRYPT_COST = 8;

// Hash passsword
const hashPassword = password =>
  bcrypt.hash(password, bcrypt.genSaltSync(BCRYPT_COST), null);

// verify password
const verifyPassword = (password, localPassword) =>
  bcrypt.compare(password, localPassword);

module.exports = { hashPassword, verifyPassword };
