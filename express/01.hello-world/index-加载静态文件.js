var express = require("express");

// var router = require("./routes/index").router;

var app = express();
// console.log(__dirname);
// app.set("view engine", "html");

// var routes = router(app);

app.use(express.static(__dirname + "/public"));

app.listen(8080, function () {
  console.log("8080端口正在监听中...");
});
