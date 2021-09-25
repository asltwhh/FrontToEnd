<!-- TOC -->

- [1 express 简介](#1-express-简介)
  - [1.1 hello-world 项目上手](#11-hello-world-项目上手)
    - [1.1.1 加载静态文件](#111-加载静态文件)
    - [1.1.2 加载动态网页](#112-加载动态网页)
  - [1.2 express 运行原理](#12-express-运行原理)
  - [1.3 中间件](#13-中间件)
    - [1.3.1 use 方法](#131-use-方法)
- [2 Express 的方法](#2-express-的方法)
  - [2.1 all,post,get,...](#21-allpostget)
  - [2.2 set 方法](#22-set-方法)
- [3 项目开发实例](#3-项目开发实例)
  - [3.1 编写启动脚本](#31-编写启动脚本)
  - [3.2 配置路由](#32-配置路由)
    - [3.2.1 指定根路径](#321-指定根路径)
    - [3.2.2 指定特定路径](#322-指定特定路径)
  - [3.3 静态网页模板](#33-静态网页模板)
  - [3.4 动态网页模板](#34-动态网页模板)
    - [3.4.1 安装模板引擎](#341-安装模板引擎)
    - [3.4.2 新建脚本数据](#342-新建脚本数据)
    - [3.4.3 新建网页模板](#343-新建网页模板)
    - [3.4.4 渲染模板](#344-渲染模板)
- [4 Express.Router](#4-expressrouter)
- [5 使用 vscode 快速创建 express 项目](#5-使用-vscode-快速创建-express-项目)
  - [5.1 创建方法](#51-创建方法)
  - [5.2 项目介绍](#52-项目介绍)

<!-- /TOC -->

# 1 express 简介

Express 是一个保持最小规模的灵活的 Node.js Web 应用程序开发框架，为 Web 和移动应用程序提供一组强大的功能。

## 1.1 hello-world 项目上手

新建一个 package.json 文件,在 dependences 中加入 express,指定项目的名称、描述、版本等，并且指定需要 4.0 版本以上的 Express。内容如下：

```
{
  "name": "hello-world",
  "description": "hello world test app",
  "version": "0.0.1",
  "private": true,
  "dependencies": {
    "express": "4.x"
  }
}
```

安装依赖包 express:`npm install`

### 1.1.1 加载静态文件

在根目录下新建一个文件`index.js`，作为项目的启动文件：

```
var express = require('express');  //加载express模块
var app = express();   // 创建express应用

app.use(express.static(__dirname + '/public'));
// 相当于 app.use('/',express.static(__dirname + '/public'))  当我们访问根目录的时候就会自动为其访问到public下的index.html文件
// 如果public下有其他的文件，index.css
// 就可以通过localhost:3000/index.css访问到

app.listen(8080);    // 监听
```

分析：

    express.static(root)是express内置的中间件功能，提供静态文件
        root:指定静态文件的根目录
        这个函数通过将req.url和指定的根目录相结合来确定要加载的文件，未找到时则调用next()方法到下一个中间件中寻找
    app.use(path,中间件函数1,...)
        将指定的中间件函数绑定到特定的path路径
        path: 默认路径'/'  当path与所请求的路径base相同时，执行中间件函数
        相当于app.use('/',中间件函数)
        也可以通过app.use(function(req,res,next){
        	if(req.path==='/'){
        		// 执行相应操作
        	}else{
        		// 直接next
        	}
        })
    
    app.use(express.static(__dirname + '/public'));
        如果当前访问的路径是'/'，则执行中间件函数，则路径就变成了'/public'
        可以将use函数是各种请求的一个总称，中间件函数可以看作是对于该path路径的请求的响应操作

然后运行上面的脚本： `node index.js`，现在就可以在浏览器中访问`http://localhost:8080`了，它会在浏览器中打开当前目录的 public 子目录，严格来说会直接加载 public 子目录下的 index.html 文件。但是由于目前我们没有创建 public 文件夹，所以会显示无法请求：
![01](./img/01.png)

比如我们创建一个 public 文件夹，在其中创建一个 index.html，随便显示一些文本，则可以得到：
![02](./img/02.png)

比如在 public 下还有一个 img 文件夹，其中有一个图片 01.png,则可以通过`http://localhost:8080/img/01.png`访问

### 1.1.2 加载动态网页

修改 index.js:

    app.get方法用于设置不同的访问路径所对应的回调函数，即就是路由

```
var express = require('express');
var app = express();

// 设置对应于根路径'/'的get方法的路由
app.get('/', function (req, res) {
  res.send('Hello world!');
});
app.listen(3000);
```

一般可以有多个路由，此时就需要将其放入一个单独的文件中，在根目录下新建`routes/index.js`,将其写入到一个路由器函数 router 中，内容如下：

```
// routes/index.js

function router = (app) {
  app.get('/', function (req, res) {
    res.send('Hello world');
  });
  app.get('/customer', function(req, res){
    res.send('customer page');
  });
  app.get('/admin', function(req, res){
    res.send('admin page');
  });
};
module.exports = router;
```

然后在`index.js`中引入该文件：

```
// index.js
var express = require('express');
var app = express();
// 引入路由器函数
var router = require('./routes');
// 产生路由
var routes = router(app);
app.listen(3000);
```

![03](./img/03.png)

## 1.2 express 运行原理

Express 框架建立在 node.js 内置的 http 模块上。http 模块生成服务器的原始代码如下：

```
var http = require("http");

// 生成一个HTTP服务器实例
var server = http.createServer(function(request, response) {
  // HTTP请求和HTTP回应的request对象和response对象
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.end("Hello world!");
});
// 监听
server.listen(3000, "localhost");
```

实际上使用 express 创建的应用 app(app 只是一个 js 函数，主要目的在于将其作为处理请求的回调传递给 http 服务器)，它在实现监听时调用了 http 的方法产生了一个 http 服务器，实际上实现监听的还是 http 服务器自身

```
app.listen = function(port){
  // 创建http服务器，this就是app
  var server = http.createServer(this);
  server.listen.apply(server,port)
}
```

## 1.3 中间件

**中间件（middleware）就是处理 HTTP 请求的函数**。它最大的特点就是，一个中间件处理完，再传递给下一个中间件。App 实例在运行过程中，会调用一系列的中间件。

每个中间件可以从 App 实例，接收三个参数，依次为 request 对象（代表 HTTP 请求）、response 对象（代表 HTTP 回应），next 回调函数（代表下一个中间件）。每个中间件都可以对 HTTP 请求（request 对象）进行加工，并且决定是否调用 next 方法，将 request 对象再传给下一个中间件。

```
function(request, response,next) {
  // HTTP请求和HTTP回应的request对象和response对象
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.end("Hello world!");
  next();
}
```

next()不带参数则表示传递给下一个中间件，传递参数(next('出错了'))则代表抛出一个错误，参数为错误文本。抛出错误以后，后面的中间件将不再执行，直到发现一个错误处理函数为止。

如果中间件中没有调用 next 方法，则表示这个中间件被调用后，不再执行后面的中间件

### 1.3.1 use 方法

`use(path,middleware,...)`

use 是 express 注册中间件的方法,也就是说设置处理对应路径的 http 请求的方法,修改`index.js`。

```
var express = require("express");
var http = require("http");

var app = express();

app.use("/home", function(request, response, next) {
  response.writeHead(200, { "Content-Type": "text/plain" });
  response.end("Welcome to the homepage!\n");
});

app.use("/about", function(request, response, next) {
  response.writeHead(200, { "Content-Type": "text/plain" });
  response.end("Welcome to the about page!\n");
});

app.use(function(request, response) {
  response.writeHead(404, { "Content-Type": "text/plain" });
  response.end("404 error!\n");
});

http.createServer(app).listen(8080);
```

上面代码使用 app.use 方法，注册了两个中间件。对应/home 路径，加载一个 html 界面，显示 Welcome to the homepage!；对应/about 路径，加载一个 html 界面，显示 Welcome to the aboutpage! 其他路径均显示 404 错误

![04](./img/04.png)

# 2 Express 的方法

## 2.1 all,post,get,...

针对不同的请求，Express 提供了 use 方法的一些别名：get,post,all 等,HTTP 动词都是 Express 的方法。

```
var express = require("express");
var http = require("http");
var app = express();

app.all("*", function(request, response, next) {
  response.writeHead(200, { "Content-Type": "text/plain" });
  next();
});

app.get("/", function(request, response) {
  response.end("Welcome to the homepage!");
});

app.get("/about", function(request, response) {
  response.end("Welcome to the about page!");
});

app.get("*", function(request, response) {
  response.end("404!");
});

http.createServer(app).listen(1337);
```

all 方法表示，所有请求都必须通过该中间件，参数中的“\*”表示对所有路径有效。get 方法则是只有 GET 动词的 HTTP 请求通过该中间件，它的第一个参数是请求的路径。

请求的路径:除了绝对匹配以外，Express 允许模式匹配。

```
app.get("/hello/:who", function(req, res) {
  res.end("Hello, " + req.params.who + ".");
});
```

上面代码将匹配“/hello/alice”网址，网址中的 alice 将被捕获，作为 req.params.who 属性的值。

## 2.2 set 方法

set 用于执行系统变量的值

```
// 设置views试图指向当前文件夹下的views目录
app.set("views", __dirname + "/views");
// 设置views视图下的文件后缀为jade
app.set("view engine", "jade");
```

# 3 项目开发实例

## 3.1 编写启动脚本

先建立一个项目目录（假定这个目录叫做 demo）。进入该目录，新建一个 package.json 文件，写入项目的配置信息。

```
{
   "name": "demo",
   "description": "My First Express App",
   "version": "0.0.1",
   "dependencies": {
      "express": "3.x"
   }
}
```

在项目目录中，新建文件 app.js。项目的代码就放在这个文件里面。

```
// 1 创建express应用
var express = require('express');  // 加载express模块
var app = express(); // 创建express应用
var path = require("path");  //加载path模块

/*
2 设定express应用的参数
*/
// 设定port变量，意为访问端口
app.set('port', process.env.PORT || 3000);

// 设定views变量，意为视图存放的目录
app.set('views', path.join(__dirname, 'views'));

// 设定view engine变量，意为网页模板引擎
app.set('view engine', 'jade');

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());

// 设定静态文件目录，比如本地文件
// 目录为demo/public/images，访问
// 网址则显示为http://localhost:3000/images
app.use(express.static(path.join(__dirname, 'public')));

// 3 设定监听
app.listen(app.get('port'));
```

此时执行`node app.js`会出现 Cannot get,这是因为我们还没有为指定的地址指定相应的路由

## 3.2 配置路由

路由指的就是用户在访问不同的路径时，指定特定的 http 请求响应方式

### 3.2.1 指定根路径

在 app.js 中：

```
app.get('/',function(req,res){
  res.send("Hello,World!");
})
```

此时，运行该文件，在浏览器中访问 http://localhost:3000，网页就会显示“Hello World”。

如果想要设置响应的头信息，则可以通过：

```
app.get('/', function(req, res){
  var body = 'Hello World';
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Content-Length', body.length);
  res.end(body);
});
```

结果：![05](./img/05.png)

### 3.2.2 指定特定路径

假定用户访问/api 路径，希望返回一个 JSON 字符串

```
app.get('/api', function(request, response) {
   response.send({name:"张三",age:40});
});
```

重新运行文件，访问`http://localhost:3000/api`就可以显示一个 json 对象

![06](./img/06.png)

我们可以将 app.get 的回调函数（处理 http 请求，返回 http 响应的中间件）封装成模块。在`routes/api.js`:

```
function index(req, res) {
  res.status(200).json({ name: "张三", age: 40 });
}
```

然后再 app.js 中，需要引入该模块：

```
var api = require("./routes/api");
app.get("/api", api.index);
```

到目前为止，我们已经学习了向浏览器发送简单的文本信息，但是如果需要发送复杂的内容，则需要使用网页模板

## 3.3 静态网页模板

在项目目录之中，建立一个子目录 views，用于存放网页模板。

假定这个项目有三个路径：根路径（/）、自我介绍（/about）和文章（/article）。那么，app.js 可以这样写：

```
var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

app.get('/about', (req, res) => {
    res.sendFile(__dirname + '/views/about.html');
});

app.get('/article', (req, res) => {
    res.sendFile(__dirname + '/views/article.html');
});

app.listen(3000);
```

上面代码表示，三个路径分别对应 views 目录中的三个模板：index.html、about.html 和 article.html。另外，向服务器发送信息的方法，从 send 变成了 sendfile，后者专门用于发送文件。

## 3.4 动态网页模板

### 3.4.1 安装模板引擎

Express 支持多种模板引擎，这里采用 Handlebars 模板引擎的服务器端版本 hbs 模板引擎。

先安装 hbs：`npm install hbs --save-dev`

上面代码将 hbs 模块，安装在项目目录的子目录 node_modules 之中。save-dev 参数表示，将依赖关系写入 package.json 文件。安装以后的 package.json 文件变成下面这样：

```
{
  "name": "hello-world",
  "description": "hello world test app",
  "version": "0.0.1",
  "private": true,
  "dependencies": {
    "express": "4.x"
  },
  "devDependencies": {
    "hbs": "^4.1.1"
  }
}
```

安装模板引擎之后，就要改写 app.js。

```
// app.js文件

var express = require('express');
var app = express();

// 加载hbs模块
var hbs = require('hbs');

// 指定模板文件的后缀名为html
app.set('view engine', 'html');

// 运行hbs模块
app.engine('html', hbs.__express);

app.get('/', function (req, res){
	res.render('index');
});

app.get('/about', function(req, res) {
	res.render('about');
});

app.get('/article', function(req, res) {
	res.render('article');
});
```

上面代码改用 render 方法，对网页模板进行渲染。render 方法的参数就是模板的文件名，默认放在子目录 views 之中，后缀名已经在前面指定为 html，这里可以省略。所以，res.render(‘index’) 就是指，把子目录 views 下面的 index.html 文件，交给模板引擎 hbs 渲染。

### 3.4.2 新建脚本数据

渲染是指将数据代入模板的过程。实际运用中，数据都是保存在数据库之中的，这里为了简化问题，假定数据保存在一个脚本文件中。

在项目目录中，新建一个文件 blog.js，用于存放数据。blog.js 的写法符合 CommonJS 规范，使得它可以被 require 语句加载。

### 3.4.3 新建网页模板

接着，新建模板文件 index.html。

```
<!-- views/index.html文件 -->

<h1>文章列表</h1>

{{#each entries}}
   <p>
      <a href="/article/{{id}}">{{title}}</a><br/>
      Published: {{published}}
   </p>
{{/each}}
```

模板文件 about.html。

```

<!-- views/about.html文件 -->

<h1>自我介绍</h1>

<p>正文</p>
```

模板文件 article.html。

```
<!-- views/article.html文件 -->

<h1>{{blog.title}}</h1>
Published: {{blog.published}}

<p/>

{{blog.body}}
```

可以看到，上面三个模板文件都只有网页主体。因为网页布局是共享的，所以布局的部分可以单独新建一个文件 layout.html。

```
<!-- views/layout.html文件 -->

<html>

<head>
   <title>{{title}}</title>
</head>

<body>

	{{{body}}}

   <footer>
      <p>
         <a href="/">首页</a> - <a href="/about">自我介绍</a>
      </p>
   </footer>

</body>
</html>
```

### 3.4.4 渲染模板

最后，改写 app.js 文件。

```
// app.js文件

var express = require('express');
var app = express();

var hbs = require('hbs');

// 加载数据模块
var blogEngine = require('./blog');

app.set('view engine', 'html');
app.engine('html', hbs.__express);
app.use(express.bodyParser());

app.get('/', function(req, res) {
   res.render('index',{title:"最近文章", entries:blogEngine.getBlogEntries()});
});

app.get('/about', function(req, res) {
   res.render('about', {title:"自我介绍"});
});

app.get('/article/:id', function(req, res) {
   var entry = blogEngine.getBlogEntry(req.params.id);
   res.render('article',{title:entry.title, blog:entry});
});

app.listen(3000);
```

上面代码中的 render 方法，现在加入了第二个参数，表示模板变量绑定的数据。

现在重启 node 服务器，然后访问http://127.0.0.1:3000。

# 4 Express.Router

从 Express 4.0 开始，路由器功能成了一个单独的组件 Express.Router。它好像小型的 express 应用程序一样，有自己的 use、get、param 和 route 方法。

首先，Express.Router 是一个构造函数，调用后返回一个路由器实例。然后，使用该实例的 HTTP 动词方法，为不同的访问路径，指定回调函数；最后，挂载到某个路径。

```
var router = express.Router();

router.get('/', function(req, res) {
res.send('首页');
});

router.get('/about', function(req, res) {
res.send('关于');
});

app.use('/', router);
```

上面代码先定义了两个访问路径，然后将它们挂载到根目录。如果最后一行改为 app.use(‘/app’, router)，则相当于为/app 和/app/about 这两个路径，指定了回调函数。

这种路由器可以自由挂载的做法，为程序带来了更大的灵活性，既可以定义多个路由器实例，也可以为将同一个路由器实例挂载到多个路径。

# 5 使用 vscode 快速创建 express 项目

## 5.1 创建方法

- 1 在 vscode 中先安装 express 插件
- 2 再安装 express 应用生成器：`npm install -g express-generator`
- 3 产生 express 应用：`express -e app_name`
  - 使用`-e`是因为这样产生的应用下的 views 文件夹下是.ejs 文件
  - `express -j app_name`or`express app_name`在 views 文件夹下会产生`.jade`文件
  - 使用`express --no-view app_name`产生的是 html 界面，在 public 文件夹下
- 4 安装其他的依赖包:`npm install`
  - express 创建项目的时候，对于一些依赖的模块，在 package.json 中的 dependences 中说明了，用命令 npm install 初始化一下，把这些 express 依赖的库装入。
- 5 运行项目：`npm start`,然后在浏览器的 3000 端口查看结果：`http://127.0.0.1:3000/`

## 5.2 项目介绍

比如快速创建了一个应用：app_name

    bin, 存放启动项目的脚本文件,管理的是使用 url 访问项目的端口号，以及url访问出错情况下的一些处理
    node_modules, 存放所有的项目依赖库。
    public，静态文件(css,js,img)
    routes，路由文件(MVC中的C,controller)
    views，页面文件(Ejs模板)
    package.json，项目依赖配置及开发者信息
    app.js，应用核心配置文件

app.js:

```
// 加载会使用到的模块
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// 加载路由模块
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// 创建express应用
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views')); // 设置views变量指向views文件夹
app.set('view engine', 'ejs'); // 设置views目录下的文件的后缀为ejs

// 加载中间件
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 将路由模块挂载到对应的路径中
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
```

package.json:说明了此项目的基本配置及所依赖的模块

```
{
  "name": "app-name",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "start": "node ./bin/www"
  },
  "dependencies": {
    "cookie-parser": "~1.4.4",
    "debug": "~2.6.9",
    "ejs": "~2.6.1",
    "express": "~4.16.1",
    "http-errors": "~1.6.3",
    "morgan": "~1.9.1"
  }
}
```

bin/www: 主要是创建 http 服务器，实现监听，并且处理一些监听异常

```
#!/usr/bin/env node

// 加载依赖模块
var app = require('../app');
var debug = require('debug')('app-name:server');
var http = require('http');

// 设定监听端口，默认是3000，可以自己修改
var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

// 创建http服务器
var server = http.createServer(app);

// 实现监听
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
```

routes/index.js 或者 routes/users.js :指定了对应路径的响应页面

运行该项目：npm start,得到在两种路径下的响应页面：
![07](./img/07.png)

# 中间件

express的理解：

> - express是用来搭建后台路由的web框架(库)
> - 它本身的功能非常简单，需要通过其中间件来扩展其功能

Route路由的理解：

> - 每一个路由就是一个key与value组成的映射关系
> - key是请求方式和path的组合，多个路由之间key不能相同
> - value是callback,用来处理请求，返回响应

Request对象和Response对象

> - Request对象
>   - Request对象是路由回调函数中的第一个参数，代表了用户发给服务器的请求
>   - query包含get请求的所有query参数的对象
>   - params包含get请求的所有param参数的对象
>   - body包含post请求的所有参数的对象
> - Response对象
>   - Response是路由回调函数中的第二个参数，代表和服务器发送给用户的响应信息
>   - res.send(body) 返回响应体
>   - res.json(obj/array) 以json格式返回响应体
>   - res.redirect(path) 重定向到指定路径
>   - render(viewName, dataObj)   渲染模板后返回数据

get请求和post请求传递数据:

> - get请求：
>
>   - query参数：
>
>     - 路由path: /xxx
>     - 请求路径：/xxx?name=tom&age=12
>     - 获取参数数据： const {name,age} = req.query;
>
>   - params参数：
>
>     - 路由path: /xxx/:name/:age
>
>     - 请求路径：/xxx?tom/12
>
>     - 获取参数数据： const {name,age} = req.params;
>
>     - ```
>       // 路由和句柄函数（中间件系统），处理指向/user/:id的GET请求
>       app.get('/user/:id',(req,res,next)=>{
>           console.log('USER');
>       })
>       ```
>
> - post请求的2中格式的文本参数
>
>   - urlencoded格式
>     - 格式： name=tom&age=12
>     - 服务器端使用对应的中间件：`app.use(express.urlencoded({ extended: false }));`
>     - 注意：表单使用此格式，服务器端都会支持此格式
>   - json格式
>     - 格式：{"name":"tom", "age":"12"}
>     - 服务器端使用对应的中间件:`app.use(express.json());`
>     - 有的服务器端可能不支持此格式

## 中间件分类

> - 一种特别的函数:` (req,res,next)=>{}`
>
> - 作用：为express处理请求做特定处理工作，比如：解析post请求参数
>
> - 分类：
>
>   - **内置中间件**：
>
>     - `express.static(rootPath, options)`:指定静态资源根路径的函数，它会返回一个中间件函数
>
>     - `app.use(express.static(path.join(__dirname, "public")));`
>
>     - options配置：
>
>       - ```
>         dotfiles	是否对外输出文件名以点（.）开头的文件。可选值为 “allow”、“deny” 和 “ignore”	String	"ignore"
>         etag	是否启用etag生成	Boolean	true，用于开启强缓存
>         extensions	设置文件扩展名备份选项	Array	[ ]
>         index	发送目录索引文件，设置为 false 禁用目录索引。	mixed	"index.html"
>         lastModified	设置 Last-Modified 头为文件在操作系统上的最后修改日期	Boolean	true,用于开启协商缓存
>         maxAge	毫秒或者其字符串格式设置 Cache-Control 头的 max-age 属性	Number	0
>         redirect	当路径为目录时，重定向至"/"	Boolean	true
>         setHeaders	设置HTTP头以提供文件的函数	Function	
>         ```
>
>       - ```
>         var options = {
>           dotfiles: 'ignore',
>           etag: false,
>           extensions: ['htm', 'html'],
>           index: false,
>           maxAge: '1d',
>           redirect: false,
>           setHeaders: function (res, path, stat) {
>             res.set('x-timestamp', Date.now());
>           }
>         }
>         
>         app.use(express.static('public', options));
>         ```
>
>   - **应用级中间件**:
>
>     - **应用级中间件绑定到 app 对象**，使用 `app.use()` 和 `app.METHOD()`，其中， `METHOD` 是需要处理的 HTTP 请求的方法，例如 GET, PUT, POST 等等，全部小写。
>
>   - **路由中间件**
>
>     - `express.Router()`: 建立一个路由器，然后针对每个路径存在对应的路由器中间件
>
>     - **路由级中间件和应用级中间件一样，只是它绑定的对象为 `express.Router()`**。
>
>     - ```
>       var router = express.Router();
>       router.get("/", function (req, res, next) {
>         res.render("index", { title: "Express" });
>       });
>       ```
>
>   - **第三方中间件**：
>
>     - body-parser: 解析post请求的中间件
>     - cookie-parser: 解析cookie的中间件
>     - express-session: 解析session的中间件
>
>   - **错误处理中间件**
>
>     - 错误处理中间件有 *4* 个参数，定义错误处理中间件时必须**使用这 4 个参数**，分别是**error,req,res,next**,其中`error`就是next传入的参数。即使不需要 `next` 对象，也必须声明它，否则中间件会被识别为一个常规中间件，不能处理错误。
>
>     - 当同路径的中间件调用next时传入了参数，则就会自动调用错误处理中间件
>
>     - ```
>       app.use(function(err, req, res, next) {
>         console.error(err.stack);
>         res.status(500).send('Something broke!');
>       });
>       ```
>
>   - **自定义中间件**：
>
>     - `function xxx(req,res,next){}`
>
> - 声明使用中间件：
>
>   - `express.use(path,middleware)`
>   - `app.use(middleware)`   path默认为/,匹配处理任意请求
>   
> - **总而言之，非路由中间件挂载app上，路由中间件挂载router上**

## 中间件的原理

使用中间件：`app.use(中间件)`，其实这个语句就是将中间件函数保存到express所维护的数组`stack`中，当有请求到来时，它会挨个去执行所有的中间件。

`app.get(url,中间件)`也是同理，就是多指定了一个请求方法和请求路径，它也是保存中间件函数。就是为其添加了限制条件，只有请求满足对应条件(路径和方法都匹配)下才会执行

多个中间件之间传递数据：直接将数据保存在res对象上，后续的中间件均可以在res对象上获取到该数据

next方法就是在循环调用所有符合条件的中间件函数

```
var http = require('http');

function express() {

    var funcs = []; // 待执行的函数数组

    var app = function (req, res) {
        var i = 0;

        function next() {
            var task = funcs[i++];  // 取出函数数组里的下一个函数
            if (!task) {    // 如果函数不存在,return
                return;
            }
            task(req, res, next);   // 否则,执行下一个函数
        }

        next();
    }

    app.use = function (task) {
        funcs.push(task);
    }

    return app;    // 返回实例
}

var app = express();

function middlewareA(req, res, next) {
    console.log('中间件1');
    console.log(res.end(123))
    next();
}

function middlewareB(req, res, next) {
    console.log('中间件2');
    next();
}

function middlewareC(req, res, next) {
    console.log('中间件3');
    next();
}
app.use(middlewareA);
app.use(middlewareB);
app.use(middlewareC);

http.createServer(app).listen('3000', function () {
    console.log('listening 3000....');
});
```

# express源码解析

## `express.static`解析

`app.use(express.static(__dirname + '/public',{}));`

express.static函数：这个函数接收一个root，指定静态文件夹，它返回一个中间件函数

实际上`express.static = require('serve-static')`，而`serve-static`默认暴露的就是`serveStatic`函数：

> - express.static函数中可以传递第二个参数，这个参数是一个对象，对象中可以设置协商缓存的etag(Boolean),lastModified(Boolean),强缓存的cache-Control对应的maxAge的值
> - 这是对于静态资源的缓存

```
function serveStatic (root, options) {
  // 检测root类型
  if (!root) {
    throw new TypeError('root path required')
  }

  if (typeof root !== 'string') {
    throw new TypeError('root path must be a string')
  }

  // copy options object
  var opts = Object.create(options || null)

  // 这个设置为true,则当客户端发生错误，比如错误请求或者请求一个不存在的地址时，直接会执行next()方法，否则会执行next(err)
  var fallthrough = opts.fallthrough !== false

  // default redirect
  var redirect = opts.redirect !== false

  // headers listener
  var setHeaders = opts.setHeaders

  if (setHeaders && typeof setHeaders !== 'function') {
    throw new TypeError('option setHeaders must be function')
  }

  // setup options for send
  opts.maxage = opts.maxage || opts.maxAge || 0
  opts.root = resolve(root)     //设置静态资源的位置

  // construct directory listener
  var onDirectory = redirect
    ? createRedirectDirectoryListener()
    : createNotFoundDirectoryListener()
  // 重点是它最终返回了一个中间件函数
  return function serveStatic (req, res, next) {
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      if (fallthrough) {
        return next()
      }

      // 改变状态码和响应头，返回信息
      res.statusCode = 405
      res.setHeader('Allow', 'GET, HEAD')
      res.setHeader('Content-Length', '0')
      res.end()
      return
    }

    var forwardError = !fallthrough
    var originalUrl = parseUrl.original(req)
    var path = parseUrl(req).pathname

    // make sure redirect occurs at mount
    if (path === '/' && originalUrl.pathname.substr(-1) !== '/') {
      path = ''
    }

    // 传递指定的opts
    var stream = send(req, path, opts)

    // add directory handler
    stream.on('directory', onDirectory)

    // add headers listener
    if (setHeaders) {
      stream.on('headers', setHeaders)
    }

    // add file listener for fallthrough
    if (fallthrough) {
      stream.on('file', function onFile () {
        // once file is determined, always forward error
        forwardError = true
      })
    }

    // forward errors
    stream.on('error', function error (err) {
      if (forwardError || !(err.statusCode < 500)) {
        next(err)
        return
      }

      next()
    })

    // pipe
    stream.pipe(res)
  }
}
```

## `app.use`解析

这个函数在`express/lib/application.js`中：

```
app.use = function use(fn) {
  var offset = 0;   // 获取中间件函数参数的标志位：fn是函数时为0，fn不是函数时为1
  var path = '/';   // 默认path是'/'

  // 如果fn不是函数
  if (typeof fn !== 'function') {
    var arg = fn;

    while (Array.isArray(arg) && arg.length !== 0) {
    //如果第一个参数是数组的话，取出数组第一个元素
      arg = arg[0];
    }

    // 如果arg不是函数，则表明它是指定的路径，赋值给path
    if (typeof arg !== 'function') {
      offset = 1;
      path = fn;
    }
  }
  // flatten就是带了深度参数的数组拉平方法，获取到[中间件函数1，中间件函数2,...],拉平，从参数中取出处理函数列表，可以传入多个中间件函数
  var fns = flatten(Array.prototype.slice.call(arguments, offset));

  if (fns.length === 0) {
    throw new TypeError('app.use() requires a middleware function')
  }

  // 实例化Router，并将其赋值给this._router
  this.lazyrouter();
  var router = this._router;
  //遍历参数中的function，逐个调用router.use
  fns.forEach(function (fn) {
    if (!fn || !fn.handle || !fn.set) {
      return router.use(path, fn);
    }

    debug('.use app under %s', path);
    fn.mountpath = path;
    fn.parent = this;

    // restore .app property on req and res
    router.use(path, function mounted_app(req, res, next) {
      var orig = req.app;
      fn.handle(req, res, function (err) {
        setPrototypeOf(req, orig.request)
        setPrototypeOf(res, orig.response)
        next(err);
      });
    });

    // mounted an app
    fn.emit('mount', this);
  }, this);

  return this;
};
```

## `router.use`解析

这个函数在`express/lib/router/index.js`中，属于express中的路由器部分：

```
proto.use = function use(fn) {
  var offset = 0;
  var path = '/';  
  // 同理设置默认路径和判断fn的类型
  // disambiguate router.use([fn])
  if (typeof fn !== 'function') {
    var arg = fn;
    while (Array.isArray(arg) && arg.length !== 0) {
      arg = arg[0];
    }
    // 第一个参数是路径
    if (typeof arg !== 'function') {
      offset = 1;
      path = fn;
    }
  }
  // 获取到剩余参数组成的数组
  var callbacks = flatten(slice.call(arguments, offset));

  if (callbacks.length === 0) {
    throw new TypeError('Router.use() requires a middleware function')
  }

  for (var i = 0; i < callbacks.length; i++) {
    var fn = callbacks[i];
    // 如果某个参数不是函数类型(本应该是中间件函数)，则直接报错
    if (typeof fn !== 'function') {
      throw new TypeError('Router.use() requires a middleware function but got a ' + gettype(fn))
    }

    // 向路由器的栈中添加layer,就包含了中间件函数
    debug('use %o %s', path, fn.name || '<anonymous>')
    // 实例化layer对象并进行初始化
    var layer = new Layer(path, {
      sensitive: this.caseSensitive,
      strict: false,
      end: false
    }, fn);
    //非路由中间件，该字段赋值为undefined
    layer.route = undefined;
    // 将layer层放入栈中
    this.stack.push(layer);
  }
  return this;
};
```

next传递参数和不传递参数的区别：

## next源码解析

> - next主要用于将执行权交给下一个中间件，如果当前中间件没有终结请求，并且next没有被调用，那么请求将被挂起，后边定义的中间件将得不到被执行的机会
>   - **只要不调用next方法，后续相同路由下的中间件就不会执行**
>   - 调用next方法：
>     - **next方法传递参数，不会执行其余相同路由中间件，这时候会触发我们定义的同路由下的错误处理中间件**，错误处理中间件，接收4个参数：`error,req,res,next`,执行中间件时会判断中间件的参数个数，
>     - **next方法不传递参数：会继续执行其余相同路由中间件**
> - app.use是在什么时候执行的，它的回调是在啥时候执行的？
>   - **app.use本身这个函数是在服务器开启时执行的，它的回调(中间件)是在请求到来时执行的**，它会在服务器开启时保存回调

### 整个路由器router中中间件传递的next方法

这个next方法负责在Layer1和Layer2中传递控制权

```
stack:[
	Layer1:{
		path:'/',
		handler: function(){},
		route:Route{stack:[Layer11,Layer12,Layer13]}
	},
	Layer2:{
		path:'/test',
		handler: function(){},
		route:Route{stack:[Layer21,Layer22]}
	},
	...
]
```

**负责多个路径下的中间件的控制权的传递**

next函数内部有个while循环，每次循环都会从stack中拿出一个layer，这个layer中包含了路由和中间件信息，然后就会用layer和请求的path就行匹配，如果匹配成功就会执行layer.handle_request，调用中间件函数。但如果匹配失败，就会循环下一个layer（即中间件）。

**所以即使它不存在next调用，剩余路径匹配的中间件也会执行，因为它在内部开启了一个遍历**

```
function next(err) {
    ... //此处源码省略
    // find next matching layer
    var layer;
    var match;
    var route;

    while (match !== true && idx < stack.length) {
      layer = stack[idx++];
      match = matchLayer(layer, path);   // 使用layer和path匹配
      route = layer.route;

      if (typeof match !== 'boolean') {
        // hold on to layerError
        layerError = layerError || match;
      }

      if (match !== true) {   // 匹配失败，则继续匹配下一个
        continue;
      }
      ... //此处源码省略       // 匹配成功，则执行
    }
	... //此处源码省略
    // this should be done for the layer
    if (err) {
        layer.handle_error(err, req, res, next);
    } else {
	    layer.handle_request(req, res, next);
    }
  }
```

### 某个路径Route下中间件的next

这个next方法负责在Layer11、Laye/12、Layer13中传递控制权，并且一定是前一个调用了不带参数的next方法，后一个才会执行

```
stack:[
	Layer1:{
		path:'/',
		handler: function(){},
		route:Route{stack:[Layer11,Layer12,Layer13]}
	},
	Layer2:{
		path:'/test',
		handler: function(){},
		route:Route{stack:[Layer21,Layer22]}
	},
	...
]
```

**它负责同一个路由下的多个中间件之间的控制权的传递，一定是调用了next才会执行剩余的中间件**，否则不会执行

路由组件的next负责**同一个路由**的多个中间件的控制权的传递，并且它会接收一个参数"route"，如果调用next(“route”)，则会跳过当前路由的其它中间件，直接将控制权交给下一个路由。

```
function next(err) {
    // 如果调用的是next("route")则跳过当前路由的其他中间件
    if (err && err === 'route') {
      return done();
    }
    // 取出新的层
    var layer = stack[idx++];
    // 如果层不存在，则结束
    if (!layer) {
      return done(err);
    }
    // 如果方法不匹配，则取出下一个中间件
    if (layer.method && layer.method !== method) {
      return next(err);
    }
    // 存在错误，则寻找错误处理中间件并且执行
    if (err) {
      layer.handle_error(err, req, res, next);
    } else {
      // 没有错误，则执行该中间件函数
      layer.handle_request(req, res, next);
    }
}
```

其中`handle_errror`的源码: 它会判断中间件接收到的参数数量，如果参数个数不等于4则认为不是错误处理中间件，则继续调用next(err)，这样就会进入到下一个中间件函数，继续进行参数个数判断，如此方式一直到某个中间件函数的参数个数是4，就认为找到了错误处理中间件，然后执行此中间件函数。

```
Layer.prototype.handle_error = function handle_error(error, req, res, next) {
  var fn = this.handle;

  if (fn.length !== 4) {
    // not a standard error handler，继续携带错误查找下一个中间件
    return next(error);
  }

  try {
    fn(error, req, res, next);
  } catch (err) {
    next(err);
  }
};
```



```
[
  Layer {
    handle: [Function: bound dispatch],
    name: 'bound dispatch',
    params: undefined,
    path: undefined,
    keys: [],
    regexp: /^\/?$/i { fast_star: false, fast_slash: false },
    route: Route { path: '/', stack: [Array], methods: [Object] }
  },
  Layer {
    handle: [Function: bound dispatch],
    name: 'bound dispatch',
    params: {},
    path: '/test1',
    keys: [],
    regexp: /^\/test1\/?$/i { fast_star: false, fast_slash: false },
    route: Route { path: '/test1', stack: [Array], methods: [Object] }
  },
  Layer {
    handle: [Function: bound dispatch],
    name: 'bound dispatch',
    params: {},
    path: '/test1',
    keys: [],
    regexp: /^\/test1\/?$/i { fast_star: false, fast_slash: false },
    route: Route { path: '/test1', stack: [Array], methods: [Object] }
  },
  Layer {
    handle: [Function: bound dispatch],
    name: 'bound dispatch',
    params: undefined,
    path: undefined,
    keys: [],
    regexp: /^\/test2\/?$/i { fast_star: false, fast_slash: false },
    route: Route { path: '/test2', stack: [Array], methods: [Object] }
  },
  Layer {
    handle: [Function: bound dispatch],
    name: 'bound dispatch',
    params: undefined,
    path: undefined,
    keys: [],
    regexp: /^\/test2\/?$/i { fast_star: false, fast_slash: false },
    route: Route { path: '/test2', stack: [Array], methods: [Object] }
  }
]
```



参考文献：

[1**对express中next函数的一些理解**--leijingning](https://cnodejs.org/topic/5757e80a8316c7cb1ad35bab)

## 面试提问

css全称，css图层

> - css中可以创建图层的样式
>   - 拥有3d变换的css属性,（perspective，transform）
>   - 插件flash
>   - video标签
>   - canvas标签
>   - css的变换属性will-change
>   - **开启绝对定位的元素仍然位于同一个图层，但是它内部存在层级的划分，该层级可以使用z-index设定**

CSS硬件加速(GPU加速)

> - CSS3 硬件加速又叫做 GPU 加速，是利用 GPU 进行**渲染**，减少 CPU 操作的一种优化方案。由于 GPU 中的 transform 等 CSS 属性不会触发 repaint，所以能大大提高网页的性能。
> - CSS触发硬件加速的属性：
>   - transform
>   - opacity
>   - filter
>   - will-change
> - 如果某个元素没有用到以上的属性，但是想开启硬件加速，则可以使用下面的形式：
>   - `transform:rotateZ(360deg)`
>   - `transform: translateZ(0); `

浏览器渲染的过程，就是渲染树创建完毕后，具体绘制的过程是怎样的？

> - 浏览器渲染页面的过程：`render tree -> 渲染元素 -> 创建图层 -> GPU 渲染 -> 浏览器复合图层 -> 生成最终的屏幕图像。`
> - 主要就是在于复合图层的合并，按照合理的顺序合并图层然后显示到屏幕上。

定时器的原理，如何实现

如何保存定时器的任务，使得能方便地拿到最先执行结束的任务，使用什么数据结构？面试官提示堆，但是我不了解

函数组件每次刷新都会调用函数，为什么每次都会获取到之前保存的状态值呢？这些值是保存在什么地方呢？

> 答了闭包，面试官提示存储在fiber链表的节点，每次刷新后，会创建新的fiber链表，即保存在旧的fiber链表的节点上

mongodb获取到多个集合的数据，联合用法

关系型数据库了解哪些，为什么选择mongodb

异地登录如何验证

> - 

客户端短时间内连续多次发请求，咋办



任务切片是如何实现的？面试官提示：是判断执行时间，到达本轮执行时间后就保存结果，在下一轮再继续执行

