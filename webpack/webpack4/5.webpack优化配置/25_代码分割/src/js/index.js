// import "babel-polyfill";
// import "@babel/polyfill";
import '../css/index.css';

const add = (x, y) => x + y; // 下一行eslint所有规则均失效（下一行不进行eslint检查)
// eslint-disable-next-line
console.log(add(1, 11));
const a = 1;
// eslint-disable-next-line
console.log(a);
