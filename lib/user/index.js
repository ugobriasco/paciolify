const { user: userData } = require("./data");

// get a user given _id

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

module.exports = { localSignUp };
