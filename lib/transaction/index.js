const controller = require("./transaction-controller");
const transactions = require("./transaction");

module.exports = { ...controller, transactions };
