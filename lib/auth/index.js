const { user: userData } = require("../data");
const localAuth = require("./auth-local");
const { generateToken, verifyToken } = require("./token");

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
              const accesstoken = generateToken(user);
              res.send({
                message: "User authenticated",
                user,
                accesstoken
              });
            }
          });
      }
    });
  }
};

// Verify that user verified
const isAuthenticated = (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    const token = req.headers.authorization.split(" ")[1];
  } else {
    const token =
      req.body.token || req.query.token || req.headers["x-access-token"];
  }
  verifyToken({ token }).then(isVerified => {
    if (!isVerified) {
      res.status(403).send({ message: "Not authorized" });
    } else {
      req.decoded = isVerified.decoded;
      next();
    }
  });
};

// Checks if the user has role Admin
const isAdmin = (req, res, next) => {
  if (req.decoded.role === "Admin") {
    next();
  } else {
    res.status(401).send({ message: "the user has no admin rights" });
  }
};

// Protects the acces to the user profile from exernal CRUDS - admins are allowed
const isAccountOwner = (req, res, next) => {
  if (
    req.query.userID === req.decoded.userID ||
    req.params.userID === req.decoded.userID ||
    req.body.userID == req.decoded.userID ||
    req.decoded.role === "Admin"
  )
    next();
  else {
    res.status(401).send({ message: "the user has not the rights" });
  }
};

module.exports = {
  localSignUp,
  localAuthenticate,
  isAuthenticated,
  isAccountOwner,
  isAdmin
};
