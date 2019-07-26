const { bankAccount, user: userData } = require("../data");
const n26 = require("../api/n26");

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
        .then(autentication => ({
          refresh_token,
          access_token,
          expires_in,
          updated_at: new Date()
        }))
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

const authenticate = async ({ email, password, userID }) => {
  if (!userID || !email || !password) return false;

  //Authenticate to n26
  const authentication = await n26
    .authenticateWithPassword({ email, password })
    .then(autentication => ({
      refresh_token,
      access_token,
      expires_in,
      updated_at: new Date()
    }));

  //Search user
  const userID = await user.getUserByEmail(email).then(user => ({ _id }));

  //store access and refresh token
  return bankAccount.updateBankAccount({
    bankAccount: { ...authentication },
    userID
  });
};

module.exports = { getAccessToken, authenticate };
