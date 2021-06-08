const { resolve } = require("path");
// 引入插件
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "built.js",
    path: resolve(__dirname, "build"),
  },
  module: {
    rules: [],
  },
  plugins: [
    // html-webpack-plugin
    new HtmlWebpackPlugin(),
  ],
  mode: "production",
  externals: {
    // 忽略对于某些库的打包
    jquery: "jQuery",
  },
};
