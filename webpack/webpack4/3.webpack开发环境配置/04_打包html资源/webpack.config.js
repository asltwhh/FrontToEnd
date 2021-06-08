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
    rules: [
      // 1 css文件
      {
        // 设置匹配哪些文件，使用正则表达式，下面表示匹配以css结尾的文件
        test: /\.css$/,
        // 进行哪些loader处理
        use: [
          // user中loader执行顺序：从右至左 依次执行
          // 首先css-loader将css文件变成commonjs模块加载到目标js文件中，以字符串样式呈现
          // 然后style-loader将目标js文件中的样式资源插入style标签中，添加到head中
          "style-loader",
          "css-loader",
        ],
      },
    ],
  },
  plugins: [
    // html-webpack-plugin
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
  mode: "development",
};
