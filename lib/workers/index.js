const workerN26 = require("./workers-n26");

const workers = {};

workers.start = () => {
  workerN26.refreshAllTokens();
  workerN26.loop();
};

module.exports = workers;
