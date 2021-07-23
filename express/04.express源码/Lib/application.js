let http = require("http");
let url = require("url");
let Router = require("./router/index.js");

// 目的：分离路由系统和应用系统

// 应用的内容
class Application {
  constructor() {
    // 创造一个路由系统，里面放置所有的路由
    this._router = new Router();
  }
  get(path, ...handlers) {
    this._router.get(path, handlers);
  }
  listen() {
    console.log(this._router)
    var server = http.createServer((req, res) => {
      // 如果路由系统里处理不了当前的请求，调用done方法
      // nodejs中除了请求的路径外，它每次还会请求一下网站图标，可以将其忽略掉
      if(req.url === '/favicon.ico') {
        console.log('ignore');
        // res.end(`不请求图标参数`);
      } 
      else{
        function done() {
          res.end(`Cannot ${req.method} ${req.url}`);
        }
        this._router.handle(req, res, done);
      }
    });
    // 实际上是server.listen方法执行一次
    server.listen(...arguments);
  }
}
module.exports = Application;
