function sendAJAX(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("get", url);
    xhr.send();
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        if (xhr.status >= 200 && xhr.status <= 300) {
          resolve(xhr.response); // 修改promise状态为成功
        } else {
          reject(xhr.status); // 修改promise状态为失败
        }
      }
    };
  });
}

btn.addEventListener("onclick", async function () {
  let res = await sendAJAX("https://api.apiopen.top/getJoke");
  console.log(res);
});
