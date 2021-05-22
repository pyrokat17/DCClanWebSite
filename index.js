const express = require("express");
const app = express();
const path = require("path");
const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();
// pug -- require npm module
const pug = require("pug");
// set view engine
app.set("view engine", "pug");
app.set("views", "./webapp/public");
app.use(
  "/static",
  express.static(path.join(__dirname + "/webapp/public/static"))
);

// Import Routes
const routes = require(path.join(__dirname + "/routes"));

app.use("/", routes);

app.listen(9050, () => console.log("listening at 9050"));
