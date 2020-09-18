// 服务器端准备
//1. 引入express
const express = require('express');

//2. 创建应用对象
const app = express();

//3. 创建路由规则
app.get('/jsonp-server', (request, response)=>{
    // 设置响应头,设置允许跨域
    response.setHeader('Access-Control-Allow-Origin','*')
    
    const data = {
        name:'尚硅谷'
    }
    // 
    let str = JSON.stringify(data);
    // 返回的是一个函数调用，浏览器端在接收到之后会将其解析为js代码，然后执行
    response.send('handle('+str+')');
    //由script标签发起的请求必须返回一个js文件或者js代码段
    // response.send("console.log('HELLO jsonp-server')");
});

//4. 监听端口启动服务
app.listen(8000, ()=>{
    console.log("服务已经启动, 8000 端口监听中....");
});