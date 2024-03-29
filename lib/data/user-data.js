const User = require("./user-model");

//Container
const lib = {
  User
};

// Get user given its _id
lib.getUserById = id => User.findById(id);

// Get user given its email
lib.getUserByEmail = _email =>
  User.find({ "local.email": _email }).then(data => data[0]);

// Get all users
lib.getAllUsers = () => User.find();

lib.createUser = props => new User(props).save();

// Update user
lib.updateUser = (id, props) =>
  lib.getUserById(id).then(user => {
    console.log("\x1b[34m%s\x1b[0m", user);
    if (!user) {
      return false;
    } else {
      return Object.assign(user, props).save();
    }
  });

// Delete user
lib.deleteUserById = id => User.findByIdAndRemove(id);

module.exports = lib;
