// 定义一个模块，连接mongodb数据库

// 连接数据库
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/mongoose_test", { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once("open",function(){
    console.log("数据库连接成功...");
})
