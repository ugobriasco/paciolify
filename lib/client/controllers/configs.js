const { getConfig } = require("../../helpers");
const cfg = getConfig();

const HOSTNAME = `http://localhost${cfg.port}/api/`;

module.exports = { HOSTNAME };
