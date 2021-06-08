const Compiler = require("./Compiler");

function myWebpack(config) {
  // 返回一个Compiler对象
  return new Compiler(config);
}

module.exports = myWebpack;
