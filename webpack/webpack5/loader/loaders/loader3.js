const { getOptions } = require("loader-utils");
const { validate } = require("schema-utils");

const schema = require("./schema.json");

// 自定义loader
module.exports = function (content, map, meta) {
  // contetn就是整个loader.js的全部代码,string类型
  console.log(333);
  // 获取options
  const options = getOptions(this);
  console.log(options); // { name: 'whh' }
  // 校验options是否合法
  validate(schema, options, {
    name: "loader3",
  });
};
