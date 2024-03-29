const router = require("express").Router();

const user = require("../user");
const auth = require("../auth");
const bank = require("../bank-account");
const transactions = require("../transaction");

router.get("/status", (req, res) => {
  res.status(200).send();
});

router.route("/signup").post(auth.localSignUp);
router.route("/login").post(auth.localAuthenticate);

router.route("/user/all").get(user.getAllUsers);

router
  .route("/user/:UID")
  .get(user.getUser)
  .delete(user.deleteUser);

router
  .route("/user/:UID/bank")
  .get(bank.getBankAccount)
  .delete(bank.removeBankAccount)
  .post(bank.updateBankAccount);

router.route("/user/:UID/transactions").get(transactions.getTxHistory);
router.route("/user/:UID/balance").get(transactions.getBalance);

// Temporary route
router.route("/user/:UID/auth").get(bank.obtainAccessToken);

module.exports = router;
