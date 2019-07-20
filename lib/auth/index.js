const { user: userData } = require("../data");
const localAuth = require("./auth-local");

// create a new user (signup)
const localSignUp = (req, res) => {
  const { email, password, role } = req.body;
  if (!email || !password) {
    return res.status(400).send({ message: "invalid email and/or passsword" });
  } else {
    return localAuth
      .hashPassword(password)
      .then(hashedPassword => ({
        role: req.body.role ? req.body.role : undefined,
        local: { email, password: hashedPassword }
      }))
      .then(payload => userData.createUser(payload))
      .then(user => {
        return res.send(user);
      })
      .catch(err => {
        console.log("\x1b[31m%s\x1b[0m", err);
        res.status(500).send({ message: "An error occurred", err });
      });
  }
};

// Local authenticate
const localAuthenticate = (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(400).json({ message: "Please fill out all fields" });
  } else {
    userData.getUserByEmail(req.body.email).then(user => {
      if (!user) {
        // No user not found
        res.status(401).send({ message: "Authentication failed" });
      } else {
        // User found
        localAuth
          .verifyPassword(req.body.password, user.local.password)
          .then(isMatch => {
            if (!isMatch) {
              res.status(401).send({
                message: "Authentication failed"
              });
            } else {
              res.send({ message: "User authenticated", user });
            }
          });
      }
    });
  }
};

module.exports = { localSignUp, localAuthenticate };
