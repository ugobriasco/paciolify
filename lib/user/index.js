const { user: userData } = require("../data");

// get a user given _id
const getUser = (req, res) => {
  const id = req.params.UID;
  if (!id) {
    res.status(400).send({ message: "Missining user ID" });
  } else {
    userData
      .getUserById(id)
      .then(user => {
        if (!user) res.status(404).send({ message: "No user found" });
        res.send(user);
      })
      .catch(err => {
        console.log("\x1b[31m%s\x1b[0m", err);
        res.send(500).send({ message: "An error occurred", err });
      });
  }
};

// get all users
const getAllUsers = (req, res) => {
  userData
    .getAllUsers()
    .then(users => res.send(users))
    .catch(err => {
      console.log("\x1b[31m%s\x1b[0m", err);
      res.send(500).send({ message: "An error occurred", err });
    });
};

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
        res.send(500).send({ message: "An error occurred", err });
      });
  }
};

// delete a user
const deleteUser = (req, res) => {
  const { id } = req.params.UID;
  if (!id) {
    res.status(400).message({ message: "Missining user ID" });
  } else {
    return userData
      .deleteUserById(id)
      .then(result => {
        if (!result) res.send(404);
      })
      .catch(err => {
        console.log("\x1b[31m%s\x1b[0m", err);
        res.send(500).send({ message: "An error occurred", err });
      });
  }
};

module.exports = { getUser, localSignUp, deleteUser, getAllUsers };
