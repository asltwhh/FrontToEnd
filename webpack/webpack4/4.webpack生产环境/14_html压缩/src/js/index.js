// import "babel-polyfill";
// import "@babel/polyfill";

const add = (x, y) => x + y; // 下一行eslint所有规则均失效（下一行不进行eslint检查)
// eslint-disable-next-line
console.log(add(1, 2));
const a = 1;
// eslint-disable-next-line
console.log(a);

const promise = new Promise((resolve) => {
  console.log("lalalal");
});
