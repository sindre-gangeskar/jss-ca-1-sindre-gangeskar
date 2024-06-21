var express = require("express");
var router = express.Router();
var passport = require("passport");
var fs = require("fs");
var path = require("path");
var LocalStrategy = require("passport-local");

passport.serializeUser((user, done) => {
  process.nextTick(function () {
    done(null, { id: user.id, username: user.username });
  });
});

passport.deserializeUser((user, done) => {
  process.nextTick(function () {
    return done(null, user);
  });
});

passport.use(
  new LocalStrategy(function verify(username, password, cb) {
    var data = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../data/users.json")));
    var filteredArr = data.filter((x) => x.username === username);

    if (filteredArr.length > 0) {
      let usersData = filteredArr[0];
      if (usersData.password == password) {
        return cb(null, usersData);
      } else return cb(null, false);
    } else return cb(null, false);
  })
);
router.get("/", function (req, res, next) {
  if (!req.user) {
    res.render("login", { user: null });
  } else {
    res.render("login", { user: req.user });
  }
});

router.post("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/login");
  });
});

router.post(
  "/password",
  passport.authenticate("local", {
    successRedirect: "/memes-overview/",
    failureRedirect: "/login",
  })
);

module.exports = router;
