var express = require("express");
var app = express();

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/about", (req, res) => {
  res.sendFile(__dirname + "/views/about.html");
});

app.get("/article", (req, res) => {
  res.sendFile(__dirname + "/views/article.html");
});

app.listen(3000);
