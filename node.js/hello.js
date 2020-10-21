/* console.log("我是hello模块");
a = 10;
function add(x, y) {
  return x + y;
}
exports = {
  add: add,
};
// exports.add = add;
console.log(module);
 */
var fs = require("fs");

// 同步文件的写入
var file = fs.openSync("hello.txt", "w");
console.log(file); // 随机返回的值：3
fs.writeSync(file, "今天天气好晴朗");
