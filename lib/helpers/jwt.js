const jwt = require("jsonwebtoken");
const getConfig = require("./get-config");

const cfg = getConfig();

const verifyToken = (token, secret) => {
  return new Promise((resolve, reject) => {
    if (!token) resolve({ status: 400, message: "No token provided" });
    const _secret = secret || cfg.secret;
    return jwt.verify(token, _secret, (err, decoded) => {
      if (err) {
        resolve({ status: 401, message: "Token authentication failed" });
      } else {
        resolve({ status: 200, message: "Token authenticated", decoded });
      }
    });
  });
};

const generateToken = (obj, _secret, _expiresIn) => {
  const secret = _secret || cfg.secret;
  const expiresIn = _expiresIn || 10080; // in seconds
  return jwt.sign(obj, secret, { expiresIn });
};

module.exports = { verifyToken, generateToken };
