const { validate } = require("schema-utils");
const globby = require("globby"); // 用于匹配文件列表
const path = require("path");
const fs = require("fs");
const webpack = require("webpack");

const { RawSource } = webpack.sources;
const util = require("util");
const Schema = require("./schema.json");
const readFile = util.promisify(fs.readFile);

class CopyWebpackPlugin {
  constructor(options = {}) {
    //   验证options是否符合规范
    validate(Schema, options, { name: "CopyWebpackPlugin" });
    this.options = options;
  }

  apply(compiler) {
    // 通过compiler注册一个钩子
    compiler.hooks.thisCompilation.tap("CopyWebpackPlugin", (compilation) => {
      // 添加资源的hooks
      compilation.hooks.additionalAssets.tapAsync("CopyWebpackPlugin", (cb) => {
        // 将from中的资源复制到to中输出
        // 1 读取from中的所有资源
        const { from, ignore } = this.options;
        const to = this.options.to || "."; // to可能未指定
        // 将输出路径变成绝对路径
        //      获取上下文执行路劲
        const context = compiler.options.context;
        var AbsoluteFrom = path.isAbsolute(from)
          ? from
          : path.resolve(context, from);
        //   需要将路径中的反斜杠\全部转换为斜杠/
        const AbsoluteFrom1 = AbsoluteFrom.replace(/\\/g, "/");
        //
        globby(AbsoluteFrom1, { ignore }).then((paths) => {
          console.log("paths", paths); // paths所有要加载的文件的绝对路径 [ 'E:/workspaces/note/webpack/webpack5/plugins/public/index.css' ]
          // 2 过滤掉要忽略的文件   在webpack.config.js中设置，所以此时paths已经是过滤后的绝对路径的数组了
          // 3 生成webpack格式的资源
          Promise.all(
            paths.map(async (absolutepath) => {
              // 读取文件
              const data = await readFile(absolutepath); //二进制数据 <Buffer 2a 20 7b 0a 20 20 6d 61 72 67 69 6e 3a 20 30 3b 0a 7d 0a>
              const filename = path.basename(absolutepath); // 'index.css'
              return {
                // 文件数据
                data,
                //文件名称
                filename,
              };
            })
          ).then((files) => {
            // files: [{data: <Buffer 2a 20 7b 0a 20 20 6d 61 72 67 69 6e 3a 20 30 3b 0a 7d 0a>,filename: 'index.css'}]
            // 4 添加到compilation中，打包输出
            const assets = files.map((file) => {
              const source = new RawSource(file.data);
              console.log("source", source);
              /* 
              source RawSource {
                _valueIsBuffer: true,
                _value: <Buffer 2a 20 7b 0a 20 20 6d 61 72 67 69 6e 3a 20 30 3b 0a 7d 0a>,
                _valueAsBuffer: <Buffer 2a 20 7b 0a 20 20 6d 61 72 67 69 6e 3a 20 30 3b 0a 7d 0a>
              }
              */
              return {
                source,
                filename: file.filename,
              };
            });
            // 添加到compilation中
            assets.forEach((asset) => {
              compilation.emitAsset(asset.filename, asset.source);
            });
          });
        });
        // 打包输出
        cb();
      });
    });
  }
}

module.exports = CopyWebpackPlugin;
