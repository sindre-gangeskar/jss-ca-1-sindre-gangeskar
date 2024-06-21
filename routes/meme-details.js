var express = require("express");
var router = express.Router();
var memeData = require("../public/js/memeData");

/* This needs to change to a post request */
router.all("/:id", function (req, res, next) {
  var id = parseInt(req.params.id);
  var data = memeData.data.find((meme) => meme.id === id);

  if (data) {
    if (req.isAuthenticated()) {
      res.render("meme-details", { data: data });
    } else {
      res.redirect("/login");
    }
  } else {
    res.status(404).render("error", { message: `Meme could not be found.<br>Click here to navigate back to the <a href='/memes-overview/'>Memes Overview</a>`, error: {status: `Error: ${res.statusCode}`, stack: null}});
  }
});

module.exports = router;
