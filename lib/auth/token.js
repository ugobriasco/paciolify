const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const { getConfig } = require("../helpers");
const cfg = getConfig();

const generateToken = (_user, _secret, _expire) => {
  if (!_user) {
    return false;
  }
  const user = {
    userID: _user._id,
    role: _user.role
  };
  const secret = _secret || cfg.secret;
  const expiresIn = _expire || 10080; // in seconds

  return jwt.sign(user, secret, { expiresIn });
};

const generatePasswordResetToken = () =>
  new Promise((resolve, reject) =>
    crypto.randomBytes(16, (err, buf) => {
      const token = buf.toString("hex");
      if (err) reject(err);
      resolve(token);
    })
  );

const verifyToken = ({ token, secret }) => {
  return new Promise((resolve, reject) => {
    if (!token) resolve(false);
    const _secret = secret || cfg.secret;
    return jwt.verify(token, _secret, (err, decoded) => {
      if (err) {
        resolve(false);
      } else {
        resolve(decoded);
      }
    });
  });
};

module.exports = { generateToken, verifyToken, generatePasswordResetToken };
