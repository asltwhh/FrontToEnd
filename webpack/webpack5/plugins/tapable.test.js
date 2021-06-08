const {
  SyncHook,
  SyncBailHook,
  AsyncParallelHook,
  AsyncSeriesHook,
} = require("tapable");

class Lesson {
  constructor() {
    //   初始化Hooks容器
    this.hooks = {
      go: new SyncHook(["address"]), // 依次执行所有的回调函数
      //   go: new SyncBailHook(["address"]), // 前一个回调有返回值，则不会再执行下一个回调函数

      //   异步钩子
      //   leave: new AsyncParallelHook(["name", "age"]), //各个回调之前并行执行，即同时执行
      //   leave: new AsyncSeriesHook(["name", "age"]),
    };
  }
  tap1() {
    console.log("我是tap1");
    // 向hooks中注册事件/添加回调函数:address=>console.log("class0318", address);  可以添加多个回调
    this.hooks.go.tap("class0318", (a) => {
      console.log("class0318", a);
      return 111;
    });
    this.hooks.go.tap("class0410", (address) => {
      console.log("class0410", address);
    });
    // this.hooks.leave.tapAsync("class0511", (name, age, callback) => {
    //   setTimeout(() => {
    //     console.log("class0511", name, age);
    //     callback();
    //   }, 2000);
    // });
    // this.hooks.leave.tapPromise("class0611", (name, age) => {
    //   return new Promise((resolve) => {
    //     setTimeout(() => {
    //       console.log("class0611", name, age);
    //       resolve();
    //     }, 1000);
    //   });
    // });
  }
  start() {
    //   触发hooks中的回调函数
    this.hooks.go.call("c318");
    // this.hooks.leave.callAsync("whh", 18, function () {
    //   // 所有leave容器中的钩子触发完了，才触发
    //   console.log("end");
    // });
  }
}

const l = new Lesson();
l.tap1();
console.log(111);
l.start();
