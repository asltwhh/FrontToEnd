const path = require("path");
const { AutoWebPlugin } = require("web-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// 使用AutoWebPlugin自动寻找pages目录下的所有目录，将每一个目录看成一个单页应用
const autoWebPlugin = new AutoWebPlugin("src", {
  template: "./template.html", // HTML模板文件所在的文件路径
  postEntrys: ["./common.css"], // 所有的页面都依赖的共用的css样式文件
  // 提取所有页面的公共代码
  commonsChunk: {
    name: "common", // 提取出公共代码的Chunk名称
  },
});
module.exports = {
  // AutoWebPlugin会为寻找到的所有单页应用生成对应的入口配置
  // autoWebPlugin.entry方法可以获取所有由autoWebPlugin生成的入口配置
  entry: autoWebPlugin.entry({}),
  output: {
    filename: "[name]_[chunkhash:8].js",
    path: path.resolve(__dirname, "./dist"),
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: ["babel-loader"],
        exclude: path.resolve(__dirname, "node_modules"),
      },
      {
        test: /\.css/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  plugins: [
    autoWebPlugin,
    new MiniCssExtractPlugin({
      filename: "[name]_[contenthash:8].css",
    }),
  ],
};
