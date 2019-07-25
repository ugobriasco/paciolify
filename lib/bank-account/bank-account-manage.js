const { bankAccount: bankAccountData } = require("../data");
const n26 = require("../api/n26");

// Add bank bank account
const addBankAccount = ({ email, password, userID }) => {
  //Search user
  //Authenticate to n26
  //store access and refresh token
};

// Remove bank account
const removeBankAccount = userID => {};

// getAccessToken
const getAccessToken = userID => {
  //try to user the access accessToken
  //if expired refresh token
  //return the accesss token
};
