import "../css/iconfont.css";
import "../css/index.less";
import print from "./print";

function add(a, b) {
  return a + b;
}
console.log(add(1, 2));

if (module.hot) {
  module.hot.accept("./print.js", function () {
    // 方法会监听print.js的变化，一旦发生变化，其他模块不能重新打包构建，执行该回调
    print();
  });
}
