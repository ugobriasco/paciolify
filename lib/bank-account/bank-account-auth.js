const util = require("util");
const debug = util.debuglog("server");

const { bankAccount, user: userData } = require("../data");
const n26 = require("../api/n26");
const { logError } = require("../helpers");
const mapBankAccount = require("./bank-account-map");

// getAccessToken
const getAccessToken = userID => {
  //check if the accessToken is alive, if alive return it
  return bankAccount.getBankAccount(userID).then(oauth => {
    const now = new Date();

    debug("\x1b[34m%s\x1b[0m", JSON.stringify(oauth));
    debug("\x1b[34m%s\x1b[0m", "now " + now);
    debug("\x1b[34m%s\x1b[0m", "last updated " + oauth.updatedAt);
    debug("\x1b[34m%s\x1b[0m", "expiration  " + oauth.expires_in);
    debug(
      "\x1b[34m%s\x1b[0m",
      `${now - oauth.updatedAt} < ${oauth.expires_in * 1000}`
    );
    const isValid = now - oauth.updatedAt < oauth.expires_in * 1000;
    debug("\x1b[34m%s\x1b[0m", "isExpired?" + !isValid);

    if (isValid) {
      return oauth.access_token;
    } else {
      //else authenticate using refreshToken
      return n26
        .authenticateWithRefreshToken(oauth.refresh_token)
        .then(res => {
          debug("\x1b[34m%s\x1b[0m", JSON.stringify(res));
          if (res.status && res.status != 200) {
            return { status: res.status, message: "token expired" };
          } else {
            const _bankAccount = mapBankAccount(res);
            return bankAccount
              .updateBankAccount({
                bankAccount: _bankAccount,
                userID
              })
              .then(() => _bankAccount.access_token);
          }
        })
        .catch(err => {
          //if also the refreshtoken does not work, return false
          logError(err);
          return false;
        });
    }
  });
};

module.exports = { getAccessToken };
