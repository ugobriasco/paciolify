const querystring = require("querystring");
const axios = require("axios");
const { getConfig } = require("../../helpers");

const {
  authenticateWithPassword,
  authenticateWithRefreshToken
} = require("./n26-authenticate");

const cfg = getConfig();
const API_KEY = cfg.api.n26.api_key;

// Container
const api = {
  authenticateWithPassword,
  authenticateWithRefreshToken
};

api.hostname = "https://api.tech26.de";

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
