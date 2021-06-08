// import "babel-polyfill";
// import "@babel/polyfill";
import '../css/index.css';

const add = (x, y) => x + y; // 下一行eslint所有规则均失效（下一行不进行eslint检查)
// eslint-disable-next-line
console.log(add(1, 11));
const a = 1;
// eslint-disable-next-line
console.log(a);

// 注册serviceworker
if (navigator.serviceWorker) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js').then(
      (registration) => {
        // Registration was successful
        console.log(
          'ServiceWorker registration successful with scope: ',
          registration.scope,
        );
      },
      (err) => {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', err);
      },
    );
  });
}
