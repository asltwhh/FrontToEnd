nodejs

优势：

> - express基于Nodejs开发
> - nodejs擅长**高并发**
>   - 在java,php或者.net等服务器语言中，会为每一个客户端连接创建一个新的线程，而每个线程大约需要消耗2MB的内存。也就是说，理论上一个8GB内存的服务器可以同时连接的最大用户数为4000个左右。要让web应用程序支持更多的用户，则需要增加服务器的数量，而web服务器的成本就增加了。
>   - nodejs不为每个用户连接创建一个新的线程，而仅仅使用一个线程。当有用户连接了，就会触发一个内部事件，通过非阻塞I/O、事件驱动机制，让nodejs在宏观上并行执行。使用nodejs，一个8GB内存的服务器可以同时处理超过4万用户的连接。
> - nodejs基于js语法，开发周期短，开发成本低

执行nodejs文件：`node 文件名.js`

## 使用nodejs创建web应用

```
// 引入http模块
var http = require('http');
// 创建服务器
var server = http.createServer(function(request,response){
	response.writeHead(200,{'Content-Type':"Text/plain"});
	response.end('Hello World');
});
// 监听8081端口
server.listen(8081);

console.log('Server is running at http://127.0.0.1:8001');
```





![chrome默认加载图标](C:\Users\17273\AppData\Roaming\Typora\typora-user-images\image-20210901183450699.png)

## 自启动应用

supervisor: 不需要结束服务器，修改代码后，服务器自动生效

> - 安装: `npm i supervisor --save`
> - 使用：`supervisor app.js`
> - 但是可能是版本问题，不能用

nodemon:

> - 安装: `npm i nodemon --save`
> - 使用：`nodemon app.js`

## CommonJs

> - CommonJS就是模块化的标准，nodejs就是CommonJS的实现
> - NodeJS使用模块组成，采用CommonJS模块化的规范

