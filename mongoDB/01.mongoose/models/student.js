// 用来定义student的模型

var mongoose = require('mongoose');  // require是CommonJS 模块的用法，就是原来的js中的方法

var Schema = mongoose.Schema;

var stuSchema = new Schema({
    name: String,
    age: Number,
    gender: {
        type: String,
        // 这个写法可以指定默认值
        default: 'female'
    },
    address: String
})

// 定义模型
var StuModel = mongoose.model("students",stuSchema);
module.exports = StuModel;