const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const { api, client } = require("./routes");
const { getConfig, sleep } = require("./helpers");

//Configurations
const cfg = getConfig();
const PORT = cfg.httpPort;

// Declare the application
const app = express();

// Parsing
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// Database
mongoose.Promise = global.Promise; //handles ES6 moongose promise deprecation
const DB_ENDPOINT = cfg.mongo_db.local;
const CONNECTION_OPT = { useCreateIndex: true, useNewUrlParser: true };
const SLEEP_MS = 10000;

mongoose.connect(DB_ENDPOINT, CONNECTION_OPT).catch(err => {
  console.log(
    "\x1b[34m%s\x1b[0m",
    `It seems the DB ${DB_ENDPOINT} is not reachable yet. Sleeping for ${SLEEP_MS} ms.`
  );
  sleep(SLEEP_MS).then(() =>
    mongoose
      .connect(DB_ENDPOINT, CONNECTION_OPT)
      .catch(err =>
        console.log("\x1b[31m%s\x1b[0m", "The database is not reachable.")
      )
  );
});

// Notify when the connection is established
mongoose.connection.once("open", () => {
  console.log(
    "\x1b[34m%s\x1b[0m",
    `Connected to ${DB_ENDPOINT} at: ${new Date()}`
  );
  console.log("\x1b[34m%s\x1b[0m", `Target environment: ${cfg.envName}`);
});

//Routing
app.use("/api", api);
app.get("/api/*", (req, res) => res.status(404));

// Client
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./client/views/pages"));
app.use("/", client);
app.use("/js", express.static(path.join(__dirname, "client/js")));
app.use("/css", express.static(path.join(__dirname, "client/css")));

//Exposing public methods
const server = {
  start: () => {
    app.listen(PORT);
    console.log(path.join(__dirname, "client/public"));
    console.log(
      "\x1b[33m%s\x1b[0m",
      `\n\n\n💰 A Pacioli always pays his debts on port ${PORT}\n`
    );
    app.emit("server-started");
  },
  stop: done => {
    process.exit(0);
    done();
  }
};

module.exports = server;
