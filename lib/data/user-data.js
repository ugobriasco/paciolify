const User = require("./user-model");

//Container
const lib = {
  User
};

// Get user given its _id
lib.getUserById = id => User.findById(id);

// Get user given its email
lib.getUserByEmail = _email => User.find({ local: { email: _email } });

// Get all users
lib.getAllUsers = () => User.find();

// Create a new user
lib.createUser = props => {
  const newUser = new User(props);
  return newUser.save();
};

// Update user
lib.updateUser = (id, props) =>
  getUserById(id).then(user => {
    if (!user) {
      return false;
    } else {
      return Object.assign(user, props).save();
    }
  });

// Delete user
lib.deleteUserById = id => User.findByIdAndRemove(id);

module.exports = lib;
