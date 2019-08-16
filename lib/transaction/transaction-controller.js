const transactions = require("./transaction");

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

module.exports = controller;
