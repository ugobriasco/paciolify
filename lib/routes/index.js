const router = require("express").Router();

const user = require("../user");

router.get("/status", (req, res) => {
  res.status(200).send();
});

route.route("/signup").post(user.localSignUp);

module.exports = router;
