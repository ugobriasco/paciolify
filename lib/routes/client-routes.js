const router = require("express").Router();
const { home, me } = require("../client/controllers");

router.route("/").get(home);
router.route("/me").get(me);

module.exports = router;
