const StringDecoder = require("string_decoder").StringDecoder;
const querystring = require("querystring");

const { httpsPromise, getConfig } = require("../../helpers");

const cfg = getConfig();
const API_KEY = cfg.api.n26.api_key;
const PROTOCOL = "https:";
const HOSTNAME = "api.tech26.de";

const authenticateWithPassword = ({ email, username, password }) => {
  const payload = {
    username: email || username,
    password,
    grant_type: "password"
  };

  const stringPayload = querystring.stringify(payload);

  const opt = {
    protocol: PROTOCOL,
    hostname: HOSTNAME,
    method: "POST",
    path: "/oauth/token",
    headers: {
      Authorization: `Basic ${API_KEY}`,
      "Content-Type": "application/x-www-form-urlencoded",
      "Content-Length": Buffer.byteLength(stringPayload)
    }
  };

  return httpsPromise(opt, stringPayload).then(res => res.body);
};

module.exports = { authenticateWithPassword };
