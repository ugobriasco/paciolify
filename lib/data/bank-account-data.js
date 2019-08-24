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
    return userData
      .updateUser(userID, { bank_account: bankAccount })
      .then(response => {
        if (!response) {
          return false;
        } else {
          return bankAccount;
        }
      });
  }
};

lib.getBankAccount = userID => {
  if (!userID) {
    return false;
  } else {
    return userData
      .getUserById(userID)
      .then(user => {
        return user.bank_account;
      })
      .catch(err => false);
  }
};

// Update the full bank account
lib.updateBankAccount = props => {
  const { userID, bankAccount } = props;
  if (!userID || !bankAccount || !bankAccount.updatedAt) return false;
  return userData
    .updateUser(userID, { bank_account: bankAccount })
    .then(() => bankAccount);
};

// Update only the tokes of the bank account
lib.updateBankAccountTokens = props => {
  const { userID, bankAccount } = props;
  if (!userID || !bankAccount || !bankAccount.updatedAt) return false;
  const { accessToken, refreshtoken, persistToken, updatedAt } = bankAccount;
  return userData
    .updateUser(userID, {
      bank_account: { accessToken, refreshtoken, persistToken }
    })
    .then(() => bankAccount);
};

// Remove bank account
lib.removeBankAccount = props => {
  const { userID } = props;
  if (!userID) return false;
  return userData.updateUser(userID, { bank_account: {} }).then(() => userID);
};

module.exports = lib;
