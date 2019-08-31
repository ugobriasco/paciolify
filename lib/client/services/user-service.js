const axios = require("axios");

const HOSTNAME = "http://localhost:3000/api";

const service = {};

service.authenticate = (email, password) => {
  const body = { email, password };
  const headers = {
    "Content-Type": "application/json"
  };
  return axios
    .post(HOSTNAME + "/login", body, { headers })
    .then(res => res.data);
};

service.registerUser = (email, password) => {
  const body = { email, password };
  const headers = {
    "Content-Type": "application/json"
  };
  return axios
    .post(HOSTNAME + "/signup", body, { headers })
    .then(res => res.data);
};

module.exports = service;
