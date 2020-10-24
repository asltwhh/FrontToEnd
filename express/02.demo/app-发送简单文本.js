// 1 创建express应用
var express = require("express"); // 加载express模块
var app = express(); // 创建express应用
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var api = require("./routes/api");

/*
2 设定express应用的参数
*/
// 设定port变量，意为访问端口
app.set("port", process.env.PORT || 3000);

// 设定views变量，意为视图存放的目录
app.set("views", path.join(__dirname, "views"));

// 设定view engine变量，意为网页模板引擎
app.set("view engine", "jade");

app.use(express.logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// 设定静态文件目录，比如本地文件
// 目录为demo/public/images，访问
// 网址则显示为http://localhost:3000/images
app.use(express.static(path.join(__dirname, "public")));

// 3 设定监听
app.listen(app.get("port"));

app.get("/", function (req, res) {
  var body = "Hello World";
  res.setHeader("Content-Type", "text/plain");
  res.setHeader("Content-Length", body.length);
  res.end(body);
});
app.get("/api", api.index);
