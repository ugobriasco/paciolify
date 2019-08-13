const router = require("express").Router();

const user = require("../user");
const auth = require("../auth");
const bank = require("../bank-account");

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
  .delete(bank.removeBankAccount)
  .post(bank.updateBankAccount);

router.route("/user/:UID/transactions").get(bank.getTxHistory);

// Temporary route
router.route("/user/:UID/auth").get(bank.obtainAccessToken);

module.exports = router;
