var fs = require("fs");
fs.writeFile("hello.txt", "今天出太阳啦！", function (err) {
  if (!err) {
    console.log("写入成功");
  } else {
    console.log("发生了错误", err);
  }
});
fs.writeFileSync("hello1.txt", "今天是个大晴天！");
