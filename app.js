var express = require("express");
var path = require("path");
require("./models/connexion")
var cors = require("cors");

var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var bookmarksRouter = require('./routes/bookmarks')

var app = express();

app.use(logger("dev"));
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/index", indexRouter);
app.use("/users", usersRouter);
app.use("/bookmarks",bookmarksRouter)

module.exports = app;
