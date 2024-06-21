var express = require("express");
var router = express.Router();
var fs = require("fs").promises;
var path = require("path");
const axios = require("axios");
var memeData = require("../public/js/memeData");

router.get("/", async function (req, res, next) {
  const memes = await getMemes();
  res.render("memes-overview", { memes: memes });
});

router.post("/",(req, res, next) => {
  const search = req.body.search;
  req.session.search = search;
  
  var filteredMemes = {};
  filteredMemes.data = memeData.data.filter(x => x.name.toLowerCase().includes(search.toLowerCase()));
  res.render("memes-overview", { memes: filteredMemes });
  console.log(search);
  console.log(memeData)
  console.log(filteredMemes)
});

async function getMemes() {
  const API_KEY = await fs.readFile(path.resolve(__dirname, "../data/API_KEY.json"), "utf-8");
  const api = JSON.parse(API_KEY);

  if (Object.keys(memeData).length === 0) {
    const response = await axios.get(api.api);
    memeData.data = response.data.memes;
    return memeData;
  } else {
    return memeData;
  }
}
module.exports = router;
