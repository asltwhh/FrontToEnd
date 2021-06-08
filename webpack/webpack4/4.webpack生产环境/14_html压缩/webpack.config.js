const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// 设置nodejs的环境变量
process.env.NODE_ENV = "development";

module.exports = {
  entry: "./src/js/index.js",
  output: {
    filename: "js/built.js",
    path: resolve(__dirname, "build"),
  },
  module: {
    rules: [
      // eslint-loader
      // {
      //   test: /\.js$/,
      //   exclude: /node_modules/, // 排除这个
      //   loader: "eslint-loader",
      //   options: {
      //     // 自动修复代码中存在的格式问题
      //     fix: true,
      //   },
      // },
      // es6转js
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/, // 排除第三方库的检查
        options: {
          // "presets":"@babel/preset-env"
          presets: [
            [
              "@babel/preset-env",
              // 按需加载
              {
                useBuiltIns: "usage",
                corejs: {
                  //core-js的版本
                  version: 3,
                },
                //需要兼容的浏览器
                targets: {
                  chrome: "60",
                  firefox: "60",
                  ie: "9",
                  safari: "10",
                  edge: "17",
                },
              },
            ],
          ],
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      },
    }),
    // new MiniCssExtractPlugin({
    //   // 对输出的文件进行重命名
    //   filename: "css/index.css",
    // }),
  ],
  mode: "production",
};
