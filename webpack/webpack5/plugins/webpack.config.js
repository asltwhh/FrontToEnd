// const Plugin1 = require("./plugins/Plugin1");
// const Plugin2 = require("./plugins/Plugin2");
const CopyWebpackPlugin = require("./plugins/CopyWebpackPlugin");
module.exports = {
  plugins: [
    new CopyWebpackPlugin({
      from: "public",
      to: ".",
      ignore: ["**/index.html"], // 忽略public文件夹下的index.html文件的打包
    }),
  ],
};
