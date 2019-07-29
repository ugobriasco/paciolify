const router = require("express").Router();

const user = require("../user");
const auth = require("../auth");
const bank = require("../bank-account");

router.get("/status", (req, res) => {
  res.status(200).send();
});

router.route("/signup").post(auth.localSignUp);
router.route("/login").post(auth.localAuthenticate);

router.route("/user").get(user.getAllUsers);

router
  .route("/user/id/:UID")
  .get(user.getUser)
  .delete(user.deleteUser);

router.route("/bank").post(bank.addBankAccount);
router.route("/bank/login").post(bank.authenticateToBank);

module.exports = router;
