// 自定义loader
module.exports = function (content, map, meta) {
  // contetn就是整个loader.js的全部代码,string类型
  console.log(222);
  // return content;
  const callback = this.async();
  setTimeout(function () {
    callback();
    console.log("异步loader", 222);
  }, 1000);
};

module.exports.pitch = function () {
  console.log("pitch", 222);
};
