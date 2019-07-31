const { bankAccount, user: userData } = require("../data");
const n26 = require("../api/n26");
const mapBankAccount = require("./bank-account-map");

// getAccessToken
const getAccessToken = userID => {
  //check if the accessToken is alive, if alive return it
  return bankAccount.getBankAccount(userID).then(oauth => {
    const now = new Date();
    if (now - oauth.updatedAt < oauth.expires_in) {
      return oauth.access_token;
    } else {
      //else authenticate using refreshToken
      return n26
        .authenticateWithRefreshToken(oauth.refresh_token)
        .then(res => mapBankAccount(res))
        .then(authentication => {
          //update bank account data
          return bankAccount
            .updateBankAccount({
              bankAccount: { ...authentication },
              userID
            })
            .then(() => authentication.access_token);
        })
        .catch(err => {
          //if also the refreshtoken does not work, return false
          console.log(err);
          return false;
        });
    }
  });
};

module.exports = { getAccessToken };
