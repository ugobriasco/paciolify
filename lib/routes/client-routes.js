const router = require("express").Router();
const { home } = require("../../client/controllers");

router.route("/").get(home);

module.exports = router;
