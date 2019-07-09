/*
 * Primary file for API
 */

// External Dependancies
const server = require("./lib/server");

const app = {
  start: () => {
    // start the server
    server.start();
  },
  stop: () => {
    server.stop();
  }
};

// Self invoking only if required directly
if (require.main === module) {
  app.start(function() {});
}

module.exports = app;
