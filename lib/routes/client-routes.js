const router = require("express").Router();
const { home, me, account, auth } = require("../client/controllers");

router.route("/").get(home);
router.route("/me").get(me);
router
  .route("/me/account")
  .get(account.getAccount)
  .post(account.postAccount);
router
  .route("/signup")
  .get(auth.getSignup)
  .post(auth.postSignup);
router
  .route("/login")
  .get(auth.getLogin)
  .post(auth.postLogin);

router.route("/logout").post(auth.postLogout);

module.exports = router;
