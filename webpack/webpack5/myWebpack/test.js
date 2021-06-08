const depsGraph = {
  "./src/index.js": {
    code:
      '"use strict";\n' +
      "\n" +
      'var _add = _interopRequireDefault(require("./add.js"));\n' +
      "\n" +
      'var _count = _interopRequireDefault(require("./count.js"));\n' +
      "\n" +
      'function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }\n' +
      "\n" +
      'console.log((0, _add["default"])(1, 2));\n' +
      'console.log((0, _count["default"])(3, 1));',
    deps: {
      "./add.js":
        "E:\\workspaces\\note\\webpack\\webpack5\\myWebpack\\src\\add.js",
      "./count.js":
        "E:\\workspaces\\note\\webpack\\webpack5\\myWebpack\\src\\count.js",
    },
  },
  "E:\\workspaces\\note\\webpack\\webpack5\\myWebpack\\src\\add.js": {
    code:
      '"use strict";\n' +
      "\n" +
      'Object.defineProperty(exports, "__esModule", {\n' +
      "  value: true\n" +
      "});\n" +
      'exports["default"] = void 0;\n' +
      "\n" +
      "function add(x, y) {\n" +
      "  return x + y;\n" +
      "}\n" +
      "\n" +
      "var _default = add;\n" +
      'exports["default"] = _default;',
    deps: {},
  },
  "E:\\workspaces\\note\\webpack\\webpack5\\myWebpack\\src\\count.js": {
    code:
      '"use strict";\n' +
      "\n" +
      'Object.defineProperty(exports, "__esModule", {\n' +
      "  value: true\n" +
      "});\n" +
      'exports["default"] = void 0;\n' +
      "\n" +
      "function count(x, y) {\n" +
      "  return x - y;\n" +
      "}\n" +
      "\n" +
      "var _default = count;\n" +
      'exports["default"] = _default;',
    deps: {},
  },
};

// console.log(JSON.stringify(depsGraph));

const a = (function (depsGraph) {
  // require加载入口文件
  function require(module) {
    // 定义模块内部的require函数
    function localRequire(relativePath) {
      // 为了找到当前要引入模块的绝对路径，再通过require函数加载进来
      return require(depsGraph[module].deps[relativePath]);
    }

    // 定义暴露对象(将来模块要暴露的内容)
    var exports = {};
    (function (require, exports, code) {
      eval(code);
    })(localRequire, exports, depsGraph[module].code);
    // 为了后面的require函数可以得到暴露的内容
    return exports;
  }
  console.log(333);
  // 加载入口文件
  require("./src/index.js");
})(depsGraph);

console.log(a);
