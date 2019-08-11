const account = require("./bank-account-manage");
const transactions = require("./bank-account-transactions");
const {
  getAccessToken,
  authWithRefreshToken,
  authWithPersistToken,
  updateTokens
} = require("./bank-account-auth");

const { logError } = require("../helpers");

//POST add bank accountId
const updateBankAccount = (req, res) => {
  const { email, password } = req.body;
  const userID = req.body.userID || req.params.UID;

  if (!userID || !email || !password) {
    res.status(400).send({ message: "Invalid userID, email and password" });
  } else {
    account
      .addBankAccount({ userID, email, password })
      .then(response => {
        if (!response) {
          res.status(404).send({ message: "No user found" });
        } else {
          res.status(200).send({ message: "Bank account updated", response });
        }
      })
      .catch(err => {
        logError(err);
        res.status(500).send({ message: "An error occurred" });
      });
  }
};

//DELETE remove bankAccount
const removeBankAccount = (req, res) => {
  const userID = req.body.userID || req.params.UID;
  if (!userID) {
    res.status(400).send({ message: "missing user id" });
  } else {
    account
      .removeBankAccount({ userID })
      .then(response => {
        if (!response) {
          res.status(404).send({ message: "User not found", userID });
        } else {
          res.status(200).send({ message: "Bank account removed", userID });
        }
      })
      .catch(err => {
        logError(err);
        res.status(500).send({ message: "An errorr occurred", err });
      });
  }
};

//
const obtainAccessToken = (req, res) => {
  const userID = req.params.UID;
  return getAccessToken(userID)
    .then(token => {
      if (token.status) {
        res
          .status(token.status)
          .send({ message: token.message || "Something went wrong" });
      } else {
        res.send({ access_token: token });
      }
    })
    .catch(err => {
      logError(err);
      if (err.response) {
        res
          .status(err.response.status)
          .send({ message: err.message, emitter: "N26" });
      } else {
        res.status(500).send({ err });
      }
    });
};

//GET account infromation
const getBankAccount = (req, res) => {};

//GET Transactions grouped by mcc or merchant names
const getTxHistory = (req, res) => {};

module.exports = {
  updateBankAccount,
  removeBankAccount,
  getBankAccount,
  getTxHistory,
  obtainAccessToken,
  getAccessToken,
  authWithRefreshToken,
  updateTokens,
  authWithPersistToken
};
