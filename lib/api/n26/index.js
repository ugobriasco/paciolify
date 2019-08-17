const util = require("util");
const debug = util.debuglog("api-n26");

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

api.headAccountDetails = accessToken => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`
  };
  const url = api.hostname + "/api/me";
  debug("HEAD", url);
  return axios.head(url, { headers });
};

//get Me
api.getAccountDetails = accessToken => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`
  };
  const url = api.hostname + "/api/me";
  debug("GET", url);
  return axios.get(url, { headers }).then(res => res.data);
};

//get TX history
api.getTxHistory = ({ accessToken, from, to }) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`
  };

  const fromDate = new Date(from).getTime();
  const toDate = new Date(to).getTime();

  const url =
    api.hostname + `/api/smrt/transactions?from=${fromDate}&to=${toDate}`;
  debug("GET", url);
  return axios.get(url, { headers }).then(res => res.data);
};

//get single transaction
api.getTXDetails = ({ accessToken, transaction_id }) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`
  };
  const url = api.hostname + `/api/smrt/transactions/` + transaction_id;
  debug("GET", url);
  return axios.get(url, { headers }).then(res => res.data);
};

module.exports = api;
