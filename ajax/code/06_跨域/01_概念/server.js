const express = require('express');
const app = express();
// 用户名检测是否存在
app.get('/check-username',(request,response)=>{
    const data = {
        exist:1,
        msg:'用户名已经存在'
    };
    let str = JSON.stringify(data);
    // 响应一个页面
    response.send( 'handle(' + str + ')' );
})
app.listen(8000,()=>{
    console.log('服务已经启动....');
})