const util = require("util");
const jwt = require("jsonwebtoken");
const debug = util.debuglog("server");

const { bankAccount, user: userData } = require("../data");
const n26 = require("../api/n26");
const { logError, generateToken, verifyToken } = require("../helpers");
const mapBankAccount = require("./bank-account-map");

const generateJWT = props => generateToken(props, false, 7884000); //3 months validity
const verifyJWT = token => verifyToken(token);

// call n26 api and update refreshtoken.
// It returns the updated bank account object
const updateTokens = (userID, tokens) =>
  bankAccount.updateBankAccountTokens({
    bankAccount: mapBankAccount(tokens),
    userID
  });

const authWithPassword = async ({ email, password }) => {
  const auth = await n26.authenticateWithPassword({ email, password });
  const persistToken = await generateJWT({ email, password });
  return { ...auth, persistToken };
};

const authWithPersistToken = userID =>
  bankAccount.getBankAccount(userID).then(account => {
    const { persistToken } = account;
    if (persistToken && persistToken != 0) {
      return verifyJWT(persistToken)
        .then(props => {
          if (!props.decoded) {
            updateTokens(userID);
            throw new Error(
              "The saved persist token is invalid. To avoid inconsistencies, the related tokens have been removed. See user:" +
                userID
            );
          }
          const { email, password } = props.decoded;
          return n26
            .authenticateWithPassword({ email, password })
            .then(auth => ({ ...auth, persistToken }));
        })
        .catch(err => logError("@authWithPersistToken " + err));
    } else {
      return false;
    }
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

    if (account.access_token == null && account.refresh_token == null) {
      debug(
        "The access and refresh tokens are null. Probably the workers were not able to keep its validity thoward the authentication authority"
      );
      return false;
    } else {
      //validate acccess token
      return n26.headAccountDetails(account.access_token).then(res => {
        if (res && res.status && res.status == 200) {
          return account.access_token;
        } else {
          return authWithRefreshToken(userID).then(tokens =>
            updateTokens(tokens, userID)
          );
        }
      });
    }
  });

module.exports = {
  getAccessToken,
  authWithRefreshToken,
  updateTokens,
  authWithPassword,
  authWithPersistToken
};
