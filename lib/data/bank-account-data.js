const { user: userData } = require("../user-data");
const n26 = require("./bank-n26");

const saveBankAccounts = (userID, updatedBankAccounts) => {
  if (!userID || !updatedBankAccounts) return false;
  return userData.updateUser(userID, updatedBankAccounts);
};

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

  return userData
    .getUserById(userID)
    .then(user => {
      if (!user) return false;
      const { bank_accounts } = user;
      return bank_accounts.push(bankAccount);
    })
    .then(updatedBankAccounts => saveBankAccounts(userID, updatedBankAccounts));
};

// Remove bank account
lib.removeBankAccount = props => {
  // consider bank_accounts as an array of objects
  const { index, userID } = props;

  // Input validation
  if (!userID || typeof userID != "string") {
    return false;
  }
  const i = typeof index == "number" ? index : 0;

  return userData
    .getUserById(userID)
    .then(user => {
      if (!user) return false;
      const { bank_accounts } = user;
      return bank_accounts.splice(index, index);
    })
    .then(updatedBankAccounts => saveBankAccounts(userID, updatedBankAccounts));
};

module.exports = lib;
