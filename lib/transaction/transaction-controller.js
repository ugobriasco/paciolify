const transactions = require("./transaction");
const balance = require("./transaction-balance");
const { logError } = require("../helpers");

const controller = {};

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

// GET balance
controller.getBalance = (req, res) => {
  const userID = req.params.UID;
  const cycles = req.query.cycles || 3;
  const span = req.query.span || "weekly";
  return balance(userID, cycles, span)
    .then(data => res.send({ data }))
    .catch(err => {
      logError(err);
      res.status(500).send({ err });
    });
};

module.exports = controller;
