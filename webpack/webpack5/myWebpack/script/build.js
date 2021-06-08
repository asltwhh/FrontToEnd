// 搭建调试环境
const webpack = require("../lib/myWebpack");
const config = require("../config/webpack.config");

const compiler = webpack(config);
// 开始打包
compiler.run();
