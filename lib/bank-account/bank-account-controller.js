const account = require("./bank-account-manage");
const transactions = require("./bank-account-transactions");
const {
  getAccessToken,
  authWithRefreshToken,
  authWithPersistToken,
  updateTokens
} = require("./bank-account-auth");

const { logError } = require("../helpers");

const controller = {};

//POST add bank accountId
controller.updateBankAccount = (req, res) => {
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
controller.removeBankAccount = (req, res) => {
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

//GET access token of N26
controller.obtainAccessToken = (req, res) => {
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
controller.getBankAccount = (req, res) => {};

//GET Transactions grouped by mcc or merchant names
controller.getTxHistory = (req, res) => {
  const userID = req.params.UID || req.query.id || req.body.userID;
  const from = req.query.from || req.body.from;
  const to = req.query.to || req.body.to;

  const groupBy = req.query.group_by;
  const mode = req.query.mode;

  return transactions({ userID, from, to, groupBy, mode })
    .then(list => res.send(list))
    .catch(err => {
      logError(err);
      res.status(500).send({ err });
    });
};

module.exports = controller;
