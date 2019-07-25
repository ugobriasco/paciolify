const account = require("./bank-account-manage");
const transactions = require("./bank-account-transactions");

//POST add bank accountId
const addBankAccount = (req, res) => {};

//PUT remove bankAccount
const removeBankAccount = (req, res) => {};

//GET account infromation
const getBankAccount = (req, res) => {};

//GET Transactions grouped by mcc or merchant names
const getTxHistory = (req, res) => {};

module.exports = {
  addBankAccount,
  removeBankAccount,
  getBankAccount,
  getTxHistory
};
