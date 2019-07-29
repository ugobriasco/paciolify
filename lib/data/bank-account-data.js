const userData = require("./user-data");
const n26 = require("../api/n26");

// Container
const lib = {};

// Add bank account given userID and bank account data
lib.addBankAccount = props => {
  const { userID, bankAccount } = props;

  // Input validation
  if (!userID || typeof userID != "string") {
    return false;
  }
  if (!bankAccount || typeof bankAccount != "object") {
    return false;
  } else {
    return userData.updateUser(userID, { bank_account: bankAccount });
  }
};

lib.updatedBankAccount = props => {
  const { userID, bankAccount } = props;
  if (!userID || !bankAccount) return false;
  return userData.updateUser(id, { bank_account: bankAccount });
};

// Remove bank account
lib.removeBankAccount = props => {
  const { userID } = props;
  if (!userID) return false;
  return userData.updateUser(userID, { bankAccount: {} });
};

module.exports = lib;
