const { bankAccount, user: userData } = require("../data");
const n26 = require("../api/n26");

// Add bank bank account, saving oauth credentials by a given userID or email
const addBankAccount = async ({ email, password, userID }) => {
  if (!userID || !email || !password) return false;

  //Authenticate to n26
  const authentication = await n26
    .authenticateWithPassword({ email, password })
    .then(autentication => ({
      refresh_token,
      access_token,
      expires_in,
      last_updated: new Date()
    }));

  //Search user
  const userID = userID
    ? userID
    : await user.getUserByEmail(email).then(user => ({ _id }));

  //store access and refresh token
  return bankAccount.addBankAccount({
    bankAccount: { ...authentication },
    userID
  });
};

// Update the oauth credential of an existing bank account, give a userID
const updateBankAccount = () => {};

// Remove bank account
const removeBankAccount = userID => {
  return bankAccount.removeBankAccount(userID);
};

module.exports = { addBankAccount, removeBankAccount };
