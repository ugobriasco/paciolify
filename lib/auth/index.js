// create a new user (signup)
const localSignUp = (req, res) => {
  const { email, password, role } = req.body;
  if (!email || !password) {
    return res.status(400).send({ message: "invalid email and/or passsword" });
  } else {
    const payload = {
      role: req.body.role ? req.body.role : undefined,
      local: {
        email,
        password
      }
    };
    userData
      .createUser(payload)
      .then(user => {
        res.send(user);
      })
      .catch(err => {
        console.log("\x1b[31m%s\x1b[0m", err);
        res.status(500).send({ message: "An error occurred", err });
      });
  }
};

module.exports = { localSignUp };
