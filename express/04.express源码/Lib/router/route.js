let Layer = require("./layer.js");

class Route {
  constructor() {
    this.stack2 = [];
  }

  get(path,handlers) {
    // 给route中添加层，这个层中需要存放各种方法名和handler
    handlers.forEach((handler) => {
      let layer = new Layer(path, handler);
      layer.method = "get";
      this.stack2.push(layer);
    });
  }
  dispatch(req, res, out) {
    console.log(this.stack2)
    let idx = 0;
    console.log(1111,out);
    // 此next方法是用户调用的next方法，如果调用next会执行内层中的next方法
    // 如果没有匹配到会调用外层的next方法
    let next = () => {
      if (idx >= this.stack2.length) {
        return out();
      }
      let layer = this.stack2[idx++];
      // console.log(layer);
      // 如果当前route中的layer的方法匹配到了，执行此route上的handler
      if (layer.method === req.method.toLowerCase()) {
        layer.handle_request(req, res, next);
      } else {
        next();
      }
    };
    next();
  }
}

module.exports = Route;
