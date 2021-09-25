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
	res.name = 'whh';
	res.end('123')
    next('出错啦');
}

function middlewareB(req, res, next) {
    console.log('中间件2');
	console.log(res.name)
    next();
}

function middlewareC(req, res, next) {
    console.log('中间件3');
	console.log(res.name)
    next();
}
app.use(middlewareA);
app.use(middlewareB);
app.use(middlewareC);

http.createServer(app).listen('3000', function () {
    console.log('listening 3000....');
});