class Layer {
  constructor(path, handler) {
    this.path = path;
    this.handler = handler;
  }
  // 做路径匹配的方法，后续会继续扩展
  match(pathname) {
    return this.path === pathname;
  }

  handle_request(req, res, next) {
    this.handler(req, res, next);
  }
}
module.exports = Layer;
