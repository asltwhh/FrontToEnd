function Promise(executor) {
  this.PromiseState = "pending"; // 默认值
  this.PromiseResult = null; // 默认值为空
  // 预先保存实例对象的this
  const self = this;
  // 声明一个属性，保存回调
  this.callbacks = [];

  function resolve(data) {
    // 保证状态只修改一次
    if (self.PromiseState !== "pending") {
      return;
    }
    // 1 修改对象的状态 PromiseState
    self.PromiseState = "fulfilled";
    // 2 设置对象的结果值 PromiseResult
    self.PromiseResult = data;

    setTimeout(function () {
      self.callbacks.forEach((item) => {
        item.onResolved(data);
      });
    });
  }
  function reject(data) {
    // 保证状态只修改一次
    if (self.PromiseState !== "pending") {
      return;
    }
    // 1 修改对象的状态 PromiseState
    self.PromiseState = "rejected";
    // 2 设置对象的结果值 PromiseResult
    self.PromiseResult = data;

    setTimeout(function () {
      self.callbacks.forEach((item) => {
        item.onRejected(data);
      });
    });
  }
  try {
    // 执行器函数在内部是同步调用的
    executor(resolve, reject);
  } catch (e) {
    reject(e);
  }
}

// 添加then方法
Promise.prototype.then = function (onResolved, onRejected) {
  const self = this;
  // 如果没有传递参数，则使用下面的函数参数代替
  if (typeof onResolved !== "function") {
    onResolved = (value) => value;
  }
  if (typeof onRejected !== "function") {
    onRejected = (reason) => {
      throw reason;
    };
  }
  return new Promise((resolve, reject) => {
    // 封装函数
    function callback(type) {
      try {
        // 执行成功的回调函数
        let result = type(self.PromiseResult);
        //
        if (result instanceof Promise) {
          // 如果是Promise类型的对象
          result.then(
            (value) => {
              resolve(value); //变成成功的状态
            },
            (error) => {
              reject(error); // 变成失败状态
            }
          );
        } else {
          // 如果不是promise对象，改变状态为成功，并且将result作为成功的结果
          resolve(result);
        }
      } catch (e) {
        reject(e);
      }
    }
    // 调用回调函数
    if (this.PromiseState === "fulfilled") {
      // 实现then方法的链式回调
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
      // 保存回调函数
      this.callbacks.push({
        onResolved: function () {
          callback(onResolved);
        },
        onRejected: function () {
          callback(onRejected);
        },
      });
    }
  });
};

// 添加catch方法
Promise.prototype.catch = function (onRejected) {
  return this.then(undefined, onRejected);
};

// 添加Promise的resolve方法
Promise.resolve = function (value) {
  return new Promise((resolve, reject) => {
    if (value instanceof Promise) {
      value.then(
        (value) => {
          resolve(value);
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

// 添加Promise的reject方法
Promise.reject = function (value) {
  return new Promise((resolve, reject) => {
    reject(value);
  });
};

// 添加all方法
Promise.all = function (promises) {
  return new Promise((resolve, reject) => {
    var result = [];
    var count = 0;
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(
        (value) => {
          count++;
          // 对应每一个对象的结果
          result[i] = value;
          if (count === promises.length) {
            resolve(result);
          }
        },
        (error) => {
          reject(error);
        }
      );
    }
  });
};

// 添加race方法
Promise.race = function (promises) {
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
