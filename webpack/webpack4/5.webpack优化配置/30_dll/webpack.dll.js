const { resolve } = require("path");
const webpack = require("webpack");
// 对某些库进行单独打包，一般值第三方库
module.exports = {
  entry: {
    // 最终打包生成的name是jquery，['jquery']指定打包的库
    jquery: ["jquery"],
  },
  output: {
    filename: "[name].js",
    path: resolve(__dirname, "dll"),
    library: "[name]_[hash]", // 指定打包的库向外暴露出去的内容的名字
  },
  plugins: [
    //   打包生成一个manifest.json文件，提供和jquery的映射
    new webpack.DllPlugin({
      name: "[name]_[hash]", //映射库暴露的名称
      path: resolve(__dirname, "dll/manifest.json"),
    }),
  ],
  mode: "production",
};
