const { user: userData } = require("../user-data");
const n26 = require("./bank-n26");

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
  }
  return userData.updateUser(userID, { bankAccount });
};

lib.updatedBankAccount = props => {
  const { userID, bankAccount } = props;
  if (!userID || !bankAccount) return false;
  return userData.updateUser(id, { bankAccount });
};

// Remove bank account
lib.removeBankAccount = props => {
  const { userID } = props;
  if (!userID) return false;
  return userData.updateUser(userID, { bankAccount: {} });
};

module.exports = lib;
