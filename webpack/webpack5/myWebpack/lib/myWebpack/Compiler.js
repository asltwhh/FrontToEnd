const parser = require("./parser");
const fs = require("fs");
const path = require("path");
const { getAst, getDeps, getCode } = parser;

class Compiler {
  constructor(options = {}) {
    //   options就是Webpack里面的配置
    this.options = options;
    this.modules = []; // 所有依赖容器
  }
  //   启动webpack的打包
  run() {
    // 1.读取入口文件
    const filepath = this.options.entry;
    // 第一次构建，得到入口文件的信息
    const fileInfo = this.build(filepath);
    // 将处理得到的依赖文件的信息放入模块中
    this.modules.push(fileInfo);

    // 递归处理其依赖模块
    this.modules.forEach((fileInfo) => {
      // 取出当前文件的依赖
      const deps = fileInfo.deps;
      // 提取deps,遍历
      for (let relativePath in deps) {
        //   得到模块依赖的绝对路径
        const absolutePath = deps[relativePath];
        // 对依赖文件递归进行处理
        const fileInfo = this.build(absolutePath);
        // 将处理得到的依赖文件的信息放入模块中
        this.modules.push(fileInfo);
      }
    });
    // console.log(this.modules);
    // 将依赖整理成更好的依赖关系图
    /* 
    {
        'index.js':{
            code:'zzz',
            deps:{'add.js':'xxx','count.js':'yyy'},
        },
        'add.js':{
            code:'xxx',
            deps:{},
        },
        'count.js':{
            code:'yyy',
            deps:{},
        }
    }
    */
    const graph = this.modules.reduce((graph, module) => {
      return {
        ...graph,
        [module.filepath]: {
          code: module.code,
          deps: module.deps,
        },
      };
    }, {});
    this.generate(graph);
  }
  //   开始构建
  build(filepath) {
    // 将文件解析成ast
    const ast = getAst(filepath);
    // 获取ast中的所有依赖
    const deps = getDeps(ast, filepath);
    // 将ast解析成code
    const code = getCode(ast);
    return {
      filepath, // 文件路径
      deps, // 当前文件的所有依赖
      code, // 当前文件编译后的代码
    };
  }
  //   生成输出资源bundle
  /* depsGraph
    {
        'index.js':{
            code:'zzz',
            deps:{'add.js':'xxx','count.js':'yyy'},
        },
        'add.js':{
            code:'xxx',
            deps:{},
        },
        'count.js':{
            code:'yyy',
            deps:{},
        }
    }
  */
  generate(depsGraph) {
    const bundle = `
    (function(depsGraph){
        // require加载入口文件
        function require(module){
            // 定义模块内部的require函数
            function localRequire(relativePath){
                // 为了找到当前要引入模块的绝对路径，再通过require函数加载进来
                return require(depsGraph[module].deps[relativePath]);
            }
            // 定义暴露对象(将来模块要暴露的内容)
            var exports = {};
            (function(require,exports,code){
                eval(code);
            })(localRequire,exports,depsGraph[module].code);
            console.log(exports);
            // 为了后面的require函数可以得到暴露的内容
            return exports;
        }
        // 加载入口文件
        require('${this.options.entry}');
    })(${JSON.stringify(depsGraph)})`;
    console.log(bundle);
    // 定义输出文件的路径
    const filePath = path.resolve(
      this.options.output.path,
      this.options.output.filename
    );
    // 写入文件
    fs.writeFileSync(filePath, bundle, "utf-8");
  }
}

module.exports = Compiler;
