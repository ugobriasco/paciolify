const account = require("./bank-account-manage");
const {
  getAccessToken,
  authWithRefreshToken,
  authWithPersistToken,
  updateTokens
} = require("./bank-account-auth");

const {
  updateBankAccount,
  removeBankAccount,
  obtainAccessToken,
  getBankAccount,
  getTxHistory
} = require("./bank-account-controller");

module.exports = {
  updateBankAccount,
  removeBankAccount,
  getBankAccount,
  obtainAccessToken,
  getAccessToken,
  authWithRefreshToken,
  updateTokens,
  authWithPersistToken
};
