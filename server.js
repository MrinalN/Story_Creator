// load .env data into process.env
require('dotenv').config();
let cookieSession = require('cookie-session');

// Web server config
const PORT       = process.env.PORT || 8080;
const ENV        = process.env.ENV || "development";
const express    = require("express");
const bodyParser = require("body-parser");
const sass       = require("node-sass-middleware");
const app        = express();
const morgan     = require('morgan');

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));


app.use(cookieSession({
  name: 'session',
  keys: ['asdf'],

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const stories = require("./routes/stories");
const creator = require("./routes/creator");
const login = require("./routes/login");
const register = require("./routes/register");
const logout = require("./routes/logout");
// const contributions = require("./routes/contributions")
// Mount all resource routes
// Note: Feel free to replace the example routes below with your own

app.use("/stories", stories(db));
app.use("/creator", creator(db));
app.use("/login", login(db));
app.use("/register", register(db));
app.use("/logout", logout(db))
// app.use("/contributions", contributions(db));
// Note: mount other resources here, using the same pattern above


// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {
  res.redirect("/stories");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
