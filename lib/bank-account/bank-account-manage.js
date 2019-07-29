const { bankAccount: bankAccountData, user: userData } = require("../data");
const n26 = require("../api/n26");

const mapBankAccount = require("./bank-account-map");

// Add bank bank account, saving oauth credentials by a given userID or email
const addBankAccount = async ({ email, password, userID }) => {
  if (!userID || !email || !password) return false;

  //Authenticate to n26
  const authentication = await n26
    .authenticateWithPassword({ email, password })
    .then(res => mapBankAccount(res))
    .catch(err => {
      console.log(err);
      return false;
    });

  //Search user
  const _userID = userID
    ? userID
    : await user.getUserByEmail(email).then(user => ({ _id }));

  if (!userID || !authentication) {
    return false;
  } else {
    //store access and refresh token
    return bankAccountData.addBankAccount({
      bankAccount: { ...authentication },
      userID: _userID
    });
  }
};

// Update the oauth credential of an existing bank account, give a userID
const updateBankAccount = () => {};

// Remove bank account
const removeBankAccount = userID => {
  return bankAccountData.removeBankAccount(userID);
};

module.exports = { addBankAccount, removeBankAccount };
