const util = require("util");
const debug = util.debuglog("server");

const { bankAccount, user: userData } = require("../data");
const n26 = require("../api/n26");
const { logError } = require("../helpers");
const mapBankAccount = require("./bank-account-map");

// call n26 api and update refreshtoken.
// It returns the updated bank account object
const updateTokens = (userID, tokens) =>
  bankAccount.updateBankAccount({
    bankAccount: mapBankAccount(tokens),
    userID
  });

// use refresh token to authenticate.
const authWithRefreshToken = userID =>
  bankAccount.getBankAccount(userID).then(account => {
    if (account.refresh_token && account.refresh_token != null) {
      return n26.authenticateWithRefreshToken(account.refresh_token);
    } else {
      return false;
    }
  });

// Get somehow the acces token
const getAccessToken = userID =>
  bankAccount.getBankAccount(userID).then(account => {
    debug("User found: " + JSON.stringify(account));

    //validate acccess token
    return n26.headAccountDetails(account.access_token).then(res => {
      if (res && res.status && res.status == 200) {
        return account.access_token;
      } else {
        return authWithRefreshToken.then(tokens =>
          updateTokens(tokens, userID)
        );
      }
    });
  });

module.exports = { getAccessToken, authWithRefreshToken, updateTokens };
