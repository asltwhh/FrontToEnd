const { resolve } = require("path");
// 引入插件
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const addAssetHtmlWebpackPlugin = require("add-asset-html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "js/built.js",
    path: resolve(__dirname, "build"),
  },
  module: {
    rules: [],
  },
  plugins: [
    // html-webpack-plugin
    new HtmlWebpackPlugin(),
    // 告诉webpack哪些库不参与打包，同时使用的名称也发生了变化，打包时需要注意修改名称
    new webpack.DllReferencePlugin({
      manifest: resolve(__dirname, "dll/manifest.json"),
    }),
    // 将某个文件单独打包输出，并在Html中自动引入,从而将单独打包的第三方库和打包后的文件联系起来
    new addAssetHtmlWebpackPlugin({
      filepath: resolve(__dirname, "dll/jquery.js"),
    }),
  ],
  mode: "production",
};
