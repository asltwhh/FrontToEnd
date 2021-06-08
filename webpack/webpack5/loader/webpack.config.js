var path = require("path");

module.exports = {
  // 默认入口文件就是src/index.js,输出位置：
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babelLoader",
        options: {
          // 需要安装这个库
          presets: ["@babel/preset-env"],
        },
      },
    ],
  },
  //   配置loader的解析规则
  resolveLoader: {
    //   配置loader的解析路径，如果在node_modules中没有找到对应的loader，则自动去loaders目录下查找
    modules: ["node_modules", path.resolve(__dirname, "loaders")],
  },
};
