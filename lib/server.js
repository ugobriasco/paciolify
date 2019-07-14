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

// Database
//const db = mongoose.connection;
mongoose.Promise = global.Promise; //handles ES6 moongose promise deprecation
// mongoose.connect(
//   cfg.db.local,
//   {
//     useCreateIndex: true, //handles DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead
//     useNewUrlParser: true //handles ES6 moongose promise deprecation
//   }
// );

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log(`Connected to Mongo at: ${new Date()}`);
});

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
    process.exit(0);
    done();
  }
};

module.exports = server;
