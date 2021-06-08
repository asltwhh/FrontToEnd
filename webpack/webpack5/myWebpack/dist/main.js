
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
        require('./src/index.js');
    })({"./src/index.js":{"code":"\"use strict\";\n\nvar _add = _interopRequireDefault(require(\"./add.js\"));\n\nvar _count = _interopRequireDefault(require(\"./count.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { \"default\": obj }; }\n\nconsole.log((0, _add[\"default\"])(1, 2));\nconsole.log((0, _count[\"default\"])(3, 1));","deps":{"./add.js":"E:\\workspaces\\note\\webpack\\webpack5\\myWebpack\\src\\add.js","./count.js":"E:\\workspaces\\note\\webpack\\webpack5\\myWebpack\\src\\count.js"}},"E:\\workspaces\\note\\webpack\\webpack5\\myWebpack\\src\\add.js":{"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = void 0;\n\nfunction add(x, y) {\n  return x + y;\n}\n\nvar _default = add;\nexports[\"default\"] = _default;","deps":{}},"E:\\workspaces\\note\\webpack\\webpack5\\myWebpack\\src\\count.js":{"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = void 0;\n\nfunction count(x, y) {\n  return x - y;\n}\n\nvar _default = count;\nexports[\"default\"] = _default;","deps":{}}})