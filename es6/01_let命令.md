# let命令
    用于声明变量，用法类似于var,但是它所声明的变量仅在let命令所在的代码块中有效

```
{
    let a = 10;
    var b = 1;
    // console.log(a);  // 10
}
// console.log(a);   // a is not defined
console.log(b);   // 1

// let的这个特性，在for循环中就比较好用
for(let i=0; i<10; i++){
    // ...
}
// console.log(i);   //i is not defined
```

在下面的例子中，i使用var 声明，是一个全局变量，所以最后在
调用a[6]这个函数时，执行console.log(i)时，i已经增加到10了
```
var a = [];
for (var i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); // 10

将上面的i使用let声明，每次声明的i都只在本次循环中有效，所以每一次循环的i其实都是一个新的变量，所以最后会输出6
```

for循环的另一个特别之处：

    设置循环变量的部分是父作用域，循环体内部是一个单独的子作用域

```
for(let i=0; i<3; i++){
    let i = "abf";   // 内部声明的i和循环变量i不在同一个作用域
    console.log(i);  
}
// abf abf abf
```

不存在变量提升:变量提升就是指变量可以在声明之前使用，值为undefined

```
oo = 2;

// let 的情况
// console.log(bar); // 报错ReferenceError
let bar = 2;
```

暂时性死区

    如果区块中存在let和const命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。凡是在声明之前就使用这些变量，就会报错

```
var tmp = 123;
{
    // 这个代码块中存在tmp变量的声明，所以就不能在其声明之前使用，与外部的tmp变量无关
    // tmp = 'abc';  //报错ReferenceError
    let tmp;
}

// var x = x;  // 此时后者的x没有声明，值为undefined
// console.log(x); // undefined

// let x = x; //ReferenceError: 后者的x没有声明就使用了
```

不允许变量重复：在同一个作用域中不能重复声明一个变量

```
{
    // var a = 1;   // 在这个作用域中存在使用let声明的a,所以出现了暂时性死区
    let a = 2;  
}
```

内层作用域可以定义外层作用域的同名变量

```
{
    let a = 123;
    {
        let a = 456;
    }
    console.log(a);
}
```

# 块级作用域和函数声明

ES6 引入了块级作用域，明确允许在块级作用域之中声明函数

        允许在块级作用域内声明函数。
        函数声明类似于var，即会提升到全局作用域或函数作用域的头部。
        同时，函数声明还会提升到所在的块级作用域的头部。

```
如果不这样做，会报错
function f(){
    console.log("outside");
}

(function(){
    if(false){
        function f(){
            console.log("inside");
        }
    }
    f();  //f is not a function,因为内部声明的f函数变量被提升到了函数作用域的头部，值为undefined,而if条件又不满足
}());

上面的代码会变成：
(function(){
    var f = undefined;
    if(false){
        function f(){
            console.log("inside");
        }
    }
    f();
}());
```

所以一般不要这样做

    如果必须要这样做，可以写成函数表达式的形式 let fun = function(){}，这样内部声明的函数就不会被提升