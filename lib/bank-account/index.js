const account = require("./bank-account-manage");
const transactions = require("./bank-account-transactions");
const { authenticate } = require("./bank-account-auth");

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
        console.log(err);
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
        console.log(err);
        res.status(500).send({ message: "An errorr occurred", err });
      });
  }
};

//GET account infromation
const getBankAccount = (req, res) => {};

// //POST login to bank acount api
// const authenticateToBank = (req, res) => {
//   const { email, password } = req.body;
//   const userID = req.body.userID || req.params.UID;
//
//   if (!userID || !email || !password) {
//     res.status(400).send({ message: "Invalid userID, email and password" });
//   } else {
//     return authenticate({ userID, email, password })
//       .then(response => {
//         if (!response) {
//           res.status(500).send({ message: "Something went wrong." });
//         } else {
//           res.status(200).send(response);
//         }
//       })
//       .catch(err =>
//         res.setatus(500).send({ message: "An error accourred", err })
//       );
//   }
// };

//GET Transactions grouped by mcc or merchant names
const getTxHistory = (req, res) => {};

module.exports = {
  updateBankAccount,
  removeBankAccount,
  getBankAccount,
  getTxHistory
};
