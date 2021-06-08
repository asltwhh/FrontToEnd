const { getOptions } = require("loader-utils");
const { validate } = require("schema-utils");
const babel = require("@babel/core");
const util = require("util");

const schema = require("./babelSchema.json");
// babel.transform是一个普通的异步方法,用于编译代码
const transform = util.promisify(babel.transform); // 将transform方法转换为promise形式的transform方法

// 自定义loader
module.exports = function (content, map, meta) {
  // 获取options配置
  const options = getOptions(this) || {}; // 如果没有设置options,则会获得一个空对象
  console.log(options); // { presets: [ '@babel/preset-env' ] }
  // 校验options是否合法
  validate(schema, options, {
    name: "babelLoader",
  });
  //   校验合格后，就可以执行异步loader了
  const callback = this.async();
  console.log(2222);
  //   1. 使用Babel编译代码
  transform(content, options)
    .then(({ code, map }) => {
      console.log(444);
      callback(null, code, map, meta);
    })
    .catch((e) => {
      callback(e);
    });
  console.log(333);
};
