const Route = require("./route.js");
const Layer = require("./layer.js");
let url = require("url");

class Router {
  constructor() {
    this.stack1 = [];
  }
  // 调用get方法创造Layer,而且每个Layer上都有个route，
  // 还要将get上的handler传入到route中，route中将handler存起来

  // 创建route和layer的关系
  route(path) {
    let route = new Route();
    // 如果layer的路径匹配到了就交给route去处理
    let layer = new Layer(path, route.dispatch.bind(route));
    layer.route = route; // 把route放到layer上
    this.stack1.push(layer); // 把layer放到数组中
    return route;
  }
  get(path, handlers) {
    let route = this.route(path);
    route.get(path,handlers); // 将path和handler传递给Route保存起来
  }

  // out参数用于处理匹配不到路径时
  handle(req, res, out) {
    console.log(this.stack1)
    // 请求到来的时候会执行此方法

    let { pathname } = url.parse(req.url);
    let idx = 0;
    let next = () => {
      if (idx >= this.stack1.length) {
        return out();
      }
      let layer = this.stack1[idx++];
      // 判断当前的layer是否匹配到当前的请求路径
      if (layer.match(pathname)) {
        // next方法是外层的下一层
        layer.handle_request(req, res, next);
        
      } else {
        next();
      }
    };
    next();
  }
}
module.exports = Router;
