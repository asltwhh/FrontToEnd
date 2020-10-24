// index.js
var express = require("express");
var app = express();
// 引入路由器函数
var router = require("./routes");
// 产生路由
var routes = router(app);
app.listen(8080);
