const fs = require("fs");
const util = require("util");
const path = require("path");
const webpack = require("webpack");

// 将fs.readFile方法变为基于promise的readFile方法
const readFile = util.promisify(fs.readFile);
const { RawSource } = webpack.sources;

class Plugin2 {
  apply(compiler) {
    compiler.hooks.thisCompilation.tap("Plugin2", (compilation) => {
      // debugger;
      // console.log(compilation);
      // 添加资源
      compilation.hooks.additionalAssets.tapAsync("Plugin2", (cb) => {
        // console.log(compilation);
        // 方式1：直接定义要打包的内容，然后将其打包到一个文件中
        const content = "hello,plugin";
        // 往要输出的资源中添加一个a.txt
        compilation.assets["a.txt"] = {
          // 文件大小
          size() {
            return content.length;
          },
          // 文件内容
          source() {
            return content;
          },
        };
        // 方式2：直接打包一个文件(内容在该文件中)
        readFile(path.resolve(__dirname, "./b.txt")).then((data) => {
          compilation.assets["b1.txt"] = new RawSource(data);
          // 或者
          // compilation.emitAsset("b.txt", new RawSource(data));
        });

        cb();
      });
    });
    // compiler.hooks.emit.tapPromise("Plugin1", (compilation) => {
    //   return new Promise((resolve) => {
    //     setTimeout(() => {
    //       console.log("emit.tapPromise 111");
    //       resolve();
    //     }, 2000);
    //   });
    // });
  }
}

module.exports = Plugin2;
