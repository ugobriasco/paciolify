const config = require("../config.js");

const getConfig = () => {
  const environment = process.env.NODE_ENV || "staging";
  return config[environment];
};

module.exports = getConfig;
