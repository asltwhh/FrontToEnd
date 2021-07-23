let express = require("./Lib/express.js");

let app = express();

app.get("/", (req, res, next) => {
  console.log("start 1");
  next();
}, (req, res, next) => {
  console.log("start 11");
  next();
}, (req, res, next) => {
  console.log("start 111");
  next();
});

app.get("/as", (req, res, next) => {
  console.log("start 2");
  next();
},(req, res, next) => {
  console.log("start 22");
  next();
},(req, res, next) => {
  console.log("start 222");
  res.end('hello')
});

app.listen(3000, function () {
  console.log("3000端口监听中...");
});
