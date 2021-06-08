const fs = require("fs");
const babelParser = require("@babel/parser");
const path = require("path");
const traverse = require("@babel/traverse").default;
const { transformFromAst } = require("@babel/core");

const parser = {
  // 将文件解析成ast
  getAst(filepath) {
    //   读取文件
    const file = fs.readFileSync(filepath, "utf-8");
    // 2.将其解析成ast抽象语法树   使用babel的parser  @babel/parser
    const ast = babelParser.parse(file, {
      sourceType: "module", // 解析文件的模块化方案是ES module
    });
    return ast;
  },
  //   获取依赖
  getDeps(ast, filepath) {
    // 获取文件的文件夹路径
    const dirname = path.dirname(filepath);
    //  定义存储依赖的容器
    const deps = {};
    // 3. 收集所有的依赖,traverse会遍历body的所有项
    traverse(ast, {
      // 内部会遍历ast中的program.body,并且判断里面的语句类型
      // 如果 type:ImportDeclaration 就会触发当前函数
      ImportDeclaration({ node }) {
        //   文件相对路径：'./add.js'
        const relativePath = node.source.value;
        // 生成基于入口文件的绝对路径
        const absolutePath = path.resolve(dirname, relativePath);
        // 添加依赖
        deps[relativePath] = absolutePath;
      },
    });
    return deps;
    // debugger;
    // console.log(deps);
    /* 
    {
      './add.js': 'E:\\workspaces\\note\\webpack\\webpack5\\myWebpack\\src\\add.js',
      './count.js': 'E:\\workspaces\\note\\webpack\\webpack5\\myWebpack\\src\\count.js'
    }
    */
  },
  //   解析：将ast解析成code
  getCode(ast) {
    //  4. 编译代码：将代码中浏览器不能识别的语法进行编译
    const { code } = transformFromAst(ast, null, {
      presets: ["@babel/preset-env"],
    });
    return code;
    // console.log(code); // 从es6语法变成了commonjs语法
    /* 
      "use strict";
  
      var _add = _interopRequireDefault(require("./add.js"));
  
      var _count = _interopRequireDefault(require("./count.js"));
  
      function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
  
      console.log((0, _add["default"])(1, 2));
      console.log((0, _count["default"])(3, 1));
      */
  },
};

module.exports = parser;
