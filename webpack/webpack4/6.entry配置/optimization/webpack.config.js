const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const optimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const terserWebpackPlugin = require("terser-webpack-plugin");

// 设置nodejs的环境变量，指定使用package.json中的broswerlist的哪个环境
process.env.NODE_ENV = "production";

// 复用
const commonCssLoader = [
  MiniCssExtractPlugin.loader,
  "css-loader",
  // css样式的兼容
  // 还需要再package.json中指定开发和生产环境兼容的版本
  {
    loader: "postcss-loader",
    options: {
      postcssOptions: {
        ident: "postcss",
        plugins: () => [
          // 帮postcss找到package.json中browserslist里面的配置，通过配置加载指定的css兼容性样式
          require("postcss-preset-env")(),
        ],
      },
    },
  },
];

module.exports = {
  // 多入口，对应多个bundle
  entry: {
    main: "./src/js/index.js",
    // test: "./src/js/print.js",
  },
  output: {
    filename: "js/[name].[contenthash:10].js",
    path: resolve(__dirname, "build"),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [...commonCssLoader],
      },
      {
        test: /\.less$/,
        use: [...commonCssLoader, "less-loader"],
      },
      // 正常来讲一个文件只能同时被一个loader处理，先执行bable-loader,再执行eslint-loader
      // eslint-loader   js语法检查
      {
        test: /\.js$/,
        exclude: /node_modules/, // 排除这个
        enforce: "pre", // 指定eslint-loader先执行
        loader: "eslint-loader",
        options: {
          // 自动修复代码中存在的格式问题
          fix: true,
        },
      },
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
      // png,jpg,gif
      {
        test: /\.(png|jpg|gif)$/,
        loader: "url-loader",
        options: {
          limit: 12 * 1024,
          name: "[hash:10].[ext]",
          outputPath: "imgs", // 设定输出路径
          esModule: false, //
        },
      },
      // 处理html文件中的图片
      {
        test: /\.html$/,
        loader: "html-loader",
      },
      //打包其他资源（除了html,css,js之外的资源)
      {
        // 排除js,css,html文件
        exclude: /\.(js|css|html)$/,
        loader: "file-loader",
        options: {
          name: "[hash:10].[ext]",
          outputPath: "media",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      // html压缩
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      },
    }),
    // 提取css为单独的文件
    new MiniCssExtractPlugin({
      // 对输出的文件进行重命名
      filename: "css/index.[contenthash:10].css",
    }),
    // 压缩css
    new optimizeCssAssetsWebpackPlugin(),
  ],
  mode: "production",
  optimization: {
    splitChunks: {
      chunks: "all",
    },
    // 将当前模块中记录其他模块的hash单独打包为一个文件 runtime
    runtimeChunk: {
      name: (entrypoint) => `runtime-${entrypoint.name}`,
    },
    minimizer: [
      // 配置生产环境的压缩方案： js和css
      new terserWebpackPlugin({
        cache: true, // 开启缓存
        parallel: true, // 开启多进程打包
        sourceMap: true,
      }),
    ],
  },
};
