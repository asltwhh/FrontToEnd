function sendAJAX(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("get", url);
    xhr.send();
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        if (xhr.promiseState >= 200 && xhr.promiseState <= 300) {
          resolve(xhr.response); // 修改promise状态为成功
        } else {
          reject(xhr.promiseState); // 修改promise状态为失败
        }
      }
    };
  });
}

btn.addEventListener("onclick", async function () {
  let res = await sendAJAX("https://api.apiopen.top/getJoke");
  console.log(res);
});

class PromiseM {
  constructor(executor) {
    this.promiseState = "pending";
    this.promiseResult = null;
    executor(this.resolve.bind(this), this.reject.bind(this));
    return this;
  }
  resolve(val) {
    this.promiseState = "fulfilled";
    this.promiseResult = val;
  }
  reject(err) {
    this.promiseState = "rejected";
    this.promiseResult = err;
  }
  then(onResolved, onRejected) {
    if (this.promiseState === "fulfilled") {
      onResolved(this.promiseResult);
    }
    if (this.promiseState === "rejected") {
      onRejected(this.promiseResult);
    }
  }
}
