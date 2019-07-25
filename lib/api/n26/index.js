const axios = require("axios");
const { getConfig } = require("../../../helpers");

const cfg = getConfig();
const API_KEY = cfg.api.n26.api_key;

// Container
const api = {};

api.hostname = "https://api.tech26.de/";

// Authenticate via username/password
api.authenticateWithPassword = ({ email, username, password }) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Basic ${API_KEY}`
  };

  const payload = {
    username: email || username,
    password,
    grantType: "password"
  };

  const url = api.hostname + "/oauth/token";

  return axios.post(url, payload, { headers }).then(res => res.data);
};

// authenticate with refreshToken
api.authenticateWithRefreshToken = refresh_token => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Basic ${API_KEY}`
  };

  const payload = {
    refresh_token,
    grantType: "refresh_token"
  };

  const url = api.hostname + "/oauth/token";

  return axios.post(url, payload, { headers }).then(res => res.data);
};

//get Me
api.getAccountDetails = accessToken => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`
  };

  const url = api.hostname + "/api/me";

  return axios.get(url, { headers }).then(res => res.data);
};

//get TX history
api.getTxHistory = ({ accessToken, from, to }) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`
  };

  const fromDate = new Date(from).getTime();
  const toDate = newDate(to).getTime();

  const url =
    api.hostname +
    `/api/smrt/transactions?transactions?from=${fromDate}&to=${toDate}`;

  return axios.get(url, { headers }).then(res => res.data);
};

//get single transaction
api.getTXDetails = ({ accessToken, transaction_id }) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`
  };

  const url = api.hostname + `/api/smrt/transactions`;

  return axios.get(url, { headers }).then(res => res.data);
};

module.exports = api;