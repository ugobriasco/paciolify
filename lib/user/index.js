const { user: userData } = require("../data");

// get a user given _id
const getUser = (req, res) => {
  const { id } = req.params.UID;
  if (!id) {
    res.status(400).message({ message: "Missining user ID" });
  } else {
    return user.getUserById(id).then(user => {
      if (!user) res.status(404);
      return user;
    });
  }
};

// create a new user (signup)
const localSignUp = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send({ message: "invalid email and/or passsword" });
  } else {
    return user.createUser({ email, password }).then(user => {
      console.log(user);
      res.send(user);
    });
  }
};

// delete a user
const deleteUser = (req, res) => {
  const { id } = req.params.UID;
  if (!id) {
    res.status(400).message({ message: "Missining user ID" });
  } else {
    return user
      .deleteUserById(id)
      .then(result => {
        if (!result) res.send(404);
      })
      .catch(err => {
        console.log(err);
        res.send(500).send({ message: "An error occurred", err });
      });
  }
};

module.exports = { getUser, localSignUp, deleteUser };
