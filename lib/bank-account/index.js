const account = require("./bank-account-manage");
const transactions = require("./bank-account-transactions");
const { authenticate } = require("./bank-account-auth");

//POST add bank accountId
const addBankAccount = (req, res) => {
  const { userID, email, password } = req.body;

  if (!userID || !email || !password) {
    res.status(400).send({ message: "Invalid userID, email and password" });
  } else {
    account.addBankAccount({ userID, email, password }).then(response => {
      if (!response)
        return res.status(500).send({ message: "Something went wrong." });
      res.status(200);
    });
  }
};

//PUT remove bankAccount
const removeBankAccount = (req, res) => {};

//GET account infromation
const getBankAccount = (req, res) => {};

//POST login to bank acount api
const authenticateToBank = (req, res) => {
  const { userID, email, password } = req.body;

  if (!userID || !email || !password) {
    res.status(400).send({ message: "Invalid userID, email and password" });
  } else {
    return authenticate({ userID, email, password })
      .then(response => {
        if (!response) {
          res.status(500).send({ message: "Something went wrong." });
        } else {
          res.status(200).send(response);
        }
      })
      .catch(err =>
        res.setatus(500).send({ message: "An error accourred", err })
      );
  }
};

//GET Transactions grouped by mcc or merchant names
const getTxHistory = (req, res) => {};

module.exports = {
  addBankAccount,
  removeBankAccount,
  getBankAccount,
  getTxHistory,
  authenticateToBank
};
