// 服务器端准备
//1. 引入express
const express = require('express');

//2. 创建应用对象
const app = express();

//3. 创建路由规则
// request 是对请求报文的封装
// response 是对响应报文的封装
// 响应的路径包含server关键词
app.get('/server', (request, response)=>{
    // 设置响应头,设置允许跨域
    response.setHeader('Access-Control-Allow-Origin','*')
    //设置响应   
    response.send('HELLO AJAX GET 2');
});
app.all('/json', (request, response)=>{
    // 设置响应头,设置允许跨域
    response.setHeader('Access-Control-Allow-Origin','*')
    // 添加一个特殊的响应头,表示允许浏览器发送的报文中包含自定义的头信息
    response.setHeader('Access-Control-Allow-Headers','*');
    response.send('HELLO AJAX ALL');
});
app.all('/json-server', (request, response)=>{
    // 设置响应头,设置允许跨域
    response.setHeader('Access-Control-Allow-Origin','*')
    // 添加一个特殊的响应头,表示允许浏览器发送的报文中包含自定义的头信息
    response.setHeader('Access-Control-Allow-Headers','*');
    // 响应一个数据
    const data = {
        name:'atguigu'
    }
    //设置响应,由于send只能接收字符串类型，所以需要对data做转换
    // 借助于JSON.Stringify()
    let str = JSON.stringify(data);
    response.send(str);
});

// 针对ie缓存
app.get('/ie', (request, response)=>{
    // 设置响应头,设置允许跨域
    response.setHeader('Access-Control-Allow-Origin','*')
    //设置响应   
    response.send('HELLO IE 5');
});

app.get('/delay', (request, response)=>{
    // 设置响应头,设置允许跨域
    response.setHeader('Access-Control-Allow-Origin','*')
    setTimeout(()=>{
        response.send('HELLO DELAY');
    },3000); 
    //设置响应   
});

// axios服务
app.all('/axios-server', (request, response)=>{
    // 设置响应头,设置允许跨域
    response.setHeader('Access-Control-Allow-Origin','*');
    // 添加一个特殊的响应头,表示允许浏览器发送的报文中包含自定义的头信息
    response.setHeader('Access-Control-Allow-Headers','*');
    const data = {
        name:'尚硅谷'
    }
    //设置响应,由于send只能接收字符串类型，所以需要对data做转换
    // 借助于JSON.Stringify()
    let str = JSON.stringify(data);
    response.send(str); 
});
// fetch服务
app.all('/fetch-server', (request, response)=>{
    // 设置响应头,设置允许跨域
    response.setHeader('Access-Control-Allow-Origin','*');
    // 添加一个特殊的响应头,表示允许浏览器发送的报文中包含自定义的头信息
    response.setHeader('Access-Control-Allow-Headers','*');
    const data = {
        name:'尚硅谷'
    }
    //设置响应,由于send只能接收字符串类型，所以需要对data做转换
    // 借助于JSON.Stringify()
    let str = JSON.stringify(data);
    response.send(str); 
});

//4. 监听端口启动服务
app.listen(8000, ()=>{
    console.log("服务已经启动, 8000 端口监听中....");
});