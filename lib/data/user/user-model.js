const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const BCRYPT_COST = 8;

const userSchema = new mongoose.Schema(
  {
    local: {
      email: { type: String, unique: true, required: true },
      password: { type: String, required: true },
      passwordResetToken: String,
      passwordResetExpires: Date
    },
    facebook: {
      id: String,
      token: String,
      name: String,
      email: String
    },
    twitter: {
      id: String,
      token: String,
      displayName: String,
      username: String
    },
    role: {
      type: String,
      enum: ["User", "Admin"],
      default: "User"
    },
    groups: Array,
    bank: Array
  },
  {
    timestamps: true,
    strict: false
  }
);

userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(BCRYPT_COST), null);
};

// checking if password is valid
userSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model("User", userSchema);
