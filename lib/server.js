const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const routes = require("./routes");

const PORT = process.env.PORT || 3000;

// Declare the application
const app = express();

// Parsing
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//Routing
// app.use("/api", api);
app.use("/", routes);

//Exposing public methods
const server = {
  start: () => {
    app.listen(PORT);
    console.log(
      "\x1b[33m%s\x1b[33m",
      "💰 A Pacioli always pays his debts on port " + PORT
    );
    app.emit("server-started");
  },
  stop: done => {
    app.close(done);
  }
};

module.exports = server;
