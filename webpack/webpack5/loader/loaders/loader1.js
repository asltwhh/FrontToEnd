// 自定义loader,loader本身就是一个函数
module.exports = function (content, map, meta) {
  // contetn就是整个loader.js的全部代码,string类型
  console.log(111);
  // this.callback(null, content, map, meta);
  // return content;
  const callback = this.async();
  setTimeout(function () {
    callback();
    console.log("异步loader", 1111);
  }, 1000);
};

module.exports.pitch = function () {
  console.log("pitch", 111);
};
