var createError = require("http-errors");
var express = require("express");
var session = require("express-session");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var passport = require("passport");
var app = express();

var indexRouter = require("./routes/index");
var memesRouter = require("./routes/memes-overview");
var memeRouter = require("./routes/meme-details");
var loginRouter = require("./routes/login");
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(__dirname + "/node_modules/bootstrap/dist"));
app.use("/bootstrap-icons", express.static(path.resolve(__dirname, "./node_modules/bootstrap-icons/font")));
app.use("/jquery", express.static(path.resolve(__dirname, "./node_modules/jquery/dist")));
app.use("/company-logo", express.static(path.resolve(__dirname, "./company logo")));

app.use(session({ secret: "keyboard cat", resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  app.locals.user = req.user;
  next();
});

app.use("/", indexRouter);
app.use("/login", loginRouter);
app.use("/memes-overview", memesRouter);
app.use("/meme-details", memeRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
