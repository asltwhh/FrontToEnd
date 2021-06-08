class Promise {
  constructor(executor) {
    // 设置实例对象的属性
    this.PromiseState = "pending";
    this.PromiseResult = null;
    // 声明属性，保存回调
    this.callbacks = [];
    const self = this;
    function resolve(data) {
      // 限制promise实例的状态只能更改一次
      if (self.PromiseState !== "pending") return;
      // 修改状态
      self.PromiseState = "fulfilled";
      // 设置对象结果值
      self.PromiseResult = data;

      // 调用回调函数
      self.callbacks.forEach((item) => {
        item.onResolved(data);
      });
    }
    function reject(data) {
      // 限制promise实例的状态只能更改一次
      if (self.PromiseState !== "pending") return;
      // 修改状态
      self.PromiseState = "rejected";
      // 设置对象结果值
      self.PromiseResult = data;

      // 调用回调函数
      self.callbacks.forEach((item) => {
        item.onRejected(data);
      });
    }
    try {
      // 同步调用执行器函数
      executor(resolve, reject);
    } catch (e) {
      // 修改Promise对象的状态为失败
      reject(e);
    }
  }

  // then方法的封装
  then(onResolved, onRejected) {
    const self = this;
    if (typeof onRejected !== "function") {
      onRejected = function (error) {
        throw error;
      };
    }
    if (typeof onResolved !== "function") {
      onResolved = function (value) {
        return value;
      };
    }
    // then方法返回一个Promise实例对象
    // then方法返回的promise对象的状态由回调执行的结果(返回值)决定

    return new Promise((resolve, reject) => {
      function callback(type) {
        try {
          var result = type(self.PromiseResult);
          // 判断回调的返回值 promise对象 非promise对象
          if (result instanceof Promise) {
            // promise对象，则可以调用then方法
            // 根据该promise对象的成功与否判断新返回的对象的成功与否
            result.then(
              (value) => {
                resolve(value); // 修改状态
              },
              (error) => {
                reject(error);
              }
            );
          } else {
            // 非promise对象，状态修改为成功
            resolve(result);
          }
        } catch (e) {
          reject(e);
        }
      }
      // 判断状态，执行回调
      if (this.PromiseState === "fulfilled") {
        setTimeout(function () {
          callback(onResolved);
        });
      }
      if (this.PromiseState === "rejected") {
        setTimeout(function () {
          callback(onRejected);
        });
      }
      if (this.PromiseState === "pending") {
        // 保存当前的回调函数，等待异步任务结束之后，在resolve或者reject中执行该回调
        this.callbacks.push({
          onResolved: function () {
            // 调用回调
            setTimeout(function () {
              callback(onResolved);
            });
          },
          onRejected: function () {
            setTimeout(function () {
              callback(onRejected);
            });
          },
        });
      }
    });
  }
  // catch方法的封装
  catch(onRejected) {
    return this.then(undefined, onRejected);
  }

  // 类原型上的方法，使用static修饰
  static resolve = function (value) {
    return new Promise((resolve, reject) => {
      if (value instanceof Promise) {
        // promise对象，则可以调用then方法
        // 根据该promise对象的成功与否判断新返回的对象的成功与否
        value.then(
          (value) => {
            resolve(value); // 修改状态
          },
          (error) => {
            reject(error);
          }
        );
      } else {
        resolve(value);
      }
    });
  };

  //
  static reject = function (value) {
    return new Promise((resolve, reject) => {
      reject(value);
    });
  };

  // Promise.all
  static all = function (promises) {
    return new Promise((resolve, reject) => {
      let count = 0;
      let res = [];
      for (let i = 0; i < promises.length; i++) {
        promises[i].then(
          (value) => {
            count++;
            res[i] = value;
            if (count === promises.length) {
              resolve(res);
            }
          },
          (error) => {
            reject(error);
          }
        );
      }
    });
  };

  // Promise.race
  static race = function (promises) {
    return new Promise((resolve, reject) => {
      for (let i = 0; i < promises.length; i++) {
        promises[i].then(
          (value) => {
            resolve(value);
          },
          (error) => {
            reject(error);
          }
        );
      }
    });
  };
}
