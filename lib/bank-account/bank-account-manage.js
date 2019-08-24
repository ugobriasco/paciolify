const { bankAccount: bankAccountData, user: userData } = require("../data");
const n26 = require("../api/n26");

const mapBankAccount = require("./bank-account-map");
const auth = require("./bank-account-auth");
const { logError } = require("../helpers");

// Add bank bank account, saving oauth credentials by a given userID or email
const addBankAccount = async ({ email, password, userID }) => {
  if (!userID || !email || !password) return false;

  //Authenticate to n26
  const authentication = await auth
    .authWithPassword({ email, password })
    .then(res => mapBankAccount(res))
    .catch(err => logError(err));

  //Search user
  const _userID = userID
    ? userID
    : await user.getUserByEmail(email).then(user => ({ _id }));

  if (!_userID || !authentication) {
    return false;
  } else {
    //store access and refresh token
    return bankAccountData.addBankAccount({
      bankAccount: { ...authentication },
      userID: _userID
    });
  }
};

// Remove bank account
const removeBankAccount = userID => {
  return bankAccountData.removeBankAccount(userID);
};

// Load local data and, if possible fetch the online ones
const getBankAccount = async userID => {
  const localData = await bankAccountData.getBankAccount(userID);
  const accessToken = localData.access_token;

  return n26
    .getAccounts(accessToken)
    .then(remoteData => ({ localData, remoteData }))
    .catch(err => {
      logError(err);
      return { localData, remoteData: false, err };
    });
};

module.exports = { addBankAccount, removeBankAccount, getBankAccount };
