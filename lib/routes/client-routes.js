const router = require("express").Router();
const { home, me, account } = require("../client/controllers");

router.route("/").get(home);
router.route("/me").get(me);
router
  .route("/me/account")
  .get(account.getAccount)
  .post(account.postAccount);

module.exports = router;
