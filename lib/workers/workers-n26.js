const util = require("util");
const debug = util.debuglog("worker-n26");

// For each user perform a refreh token every 15 minutes.
const n26 = require("../api/n26");
const { user } = require("../data");
const bankAccount = require("../bank-account");
const { logError } = require("../helpers");

// Collect all the users which requires the cronjob for refreshing tokens
const listUsers = () =>
  user
    .getAllUsers()
    .then(users =>
      users.filter(user => user.bank_account && user.bank_account.refresh_token)
    )
    .catch(err => logError(err));

const rotateRefreshToken = userID =>
  bankAccount.authWithPersistToken(userID).then(tokens => {
    if (tokens) {
      return bankAccount.updateTokens(userID, tokens);
    } else {
      return;
    }
  });

// Refresh token to all users applicable
const refreshAllTokens = () =>
  listUsers()
    .then(users => {
      console.log(
        "\x1b[34m%s\x1b[0m",
        `🔄 Refreshing ${users.length} set of tokens`
      );
      return users;
    })
    .then(users => users.forEach(user => rotateRefreshToken(user._id)))
    .catch(err => logError(err));

//loop the rotation every 20 minutes (refreshtoken expires in 30min)
const loop = () =>
  setInterval(function() {
    refreshAllTokens();
  }, 1000 * 60 * 20);

module.exports = { loop, refreshAllTokens };
