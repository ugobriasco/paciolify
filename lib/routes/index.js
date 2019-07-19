const router = require("express").Router();

const user = require("../user");
const auth = require("../auth");

router.get("/status", (req, res) => {
  res.status(200).send();
});

router.route("/signup").post(auth.localSignUp);

router.route("/user").get(user.getAllUsers);

router
  .route("/user/id/:UID")
  .get(user.getUser)
  .delete(user.deleteUser);

module.exports = router;
