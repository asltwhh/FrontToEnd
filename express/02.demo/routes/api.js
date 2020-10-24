function index(req, res) {
  res.status(200).json({ name: "张三", age: 40 });
}
exports.index = index;
