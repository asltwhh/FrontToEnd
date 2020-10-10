/*
1 下载安装Mongoose: npm i mongoose --save
2 在项目中引入mongoose
    var mongoose = require('mongoose');
3 连接mongoDB数据库
    mongoose.connect('mongodb://数据库的ip地址:端口号/数据库名', {useNewUrlParser: true, useUnifiedTopology: true});
    如果端口号是默认端口号27017可以省略
4 断开数据库的连接：mongoose.disconnect()
    一般情况下只需要连接一次，除非项目停止服务器关闭，否则连接一般不会断开

5 监听mongodb数据库的连接状态  
    在mongoose对象中，有一个属性叫做connection,表示数据库的连接
    通过监视该对象的状态可以监听数据库的连接与断开
    mongoose.connection.once("open",function(){})  当数据库连接成功时触发function
    mongoose.connection.once("close",function(){})  当数据库连接断开时触发function
    
Schema
Model
Document
*/

var mongoose = require('mongoose');
// localhost相当于127.0.0.1
// mongoose.disconnect()
mongoose.connect("mongodb://localhost:27017/mongoose_test", { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once("open",function(){
    console.log('数据库连接成功...')
})
mongoose.connection.once("close",function(){
    console.log('数据库连接已经断开...')
})