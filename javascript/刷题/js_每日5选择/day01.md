# 题目1：
for(let i=0;i<2;i++){
    setTimeout(function(){
        console.log(i)
    },100);
}
for(var i=0;i<2;i++){
    setTimeout(function(){
        console.log(i)
    },100);
}

    分析：
    第一个for循环：使用let声明变量，确保每一次迭代中的变量i都是只在当前代码块中有用
    第二个for循环：使用var声明变量，i是全局变量

    另外，setTimeout属于异步任务，一般是将同步任务执行完成之后执行异步任务，所以第一个for循环执行完成后，每一次迭代的i都锁定在每一个迭代中，所以输出0，1;而第二个for循环的i共用，同步任务执行完成后，i已经变成了2,所以输出2,2

    结果：0,1,2,2

# 问题2：涉及到吉他类型数据转换为boolean类型

    没有内容就是undefined--->false
    0,NaN--->false
    null--->false
    空字符串""--->false

# 问题3：
undefined == null  // true
null == undefined   // true

    undefined:只声明没有赋值的变量
    null:空对象

undefined转换为数值：NaN
null转换为数值：0

问题4：代码 var a = 10.42; 取出 a 的整数部分

    A. parseInt(a):转换为整数，默认为10进制，结果为10
    B. floor(a):向下取整，结果为10 
    C. ceil(a):向上取整，结果为11
    D. a.split('.')[0]:用法错误
        stringObject.split(separator,howmany)
        把一个字符串分割为字符串数组
        separator:为字符串或者正则表达式
        howmang可选
        正确做法：
            var a = 10.42;
            // arr = ["10","42"]
            var arr = String(a).split('.');
            // a = 10
            a = parseInt(arr[0]);

# 问题5：静态语言和动态语言

    静态语言：使用变量之前必须声明数据类型,eg:C++、Java、Delphi、C#
    动态语言：变量使用之前不需要类型声明，eg:PHP/ASP/Ruby/Python/Perl/ABAP/SQL/JavaScript/Unix Shell

# 问题6
```
var str1=new RegExp("e");
document.write(str1.exec("hello"));
```
以上代码输出结果为:e  
exec():检索字符串中的正则表达式的匹配,返回一个数组，存放匹配的结果  

定义正则表达式：  

    var str1=new RegExp("e")
    或者：
    var str1=new RegExp(/e/)

# 题目7
void();输出的结果是啥？？？   SytaxError

void 运算符对给定的表达式进行求值，然后返回undefined  
```
let a = void(1+2);
console.log(a)  // undefined
```

这个运算符通常只用于获取undefined的原始值，一般使用void(0)或者void 0。

# 题目8

setTimeout(fun,10);  
间隔10毫秒后，fun函数执行一次  
**毫秒，毫秒**

# 题目9
sort():无参数则按照字符编码的顺序进行排序  
sort(fun):对数组元素进行排序，函数fun规定排序次序  
```
arr.sort(function(a,b){
    return a-b;  // 升序
    // return b-a;  // 降序
    })
```

# 题目10
与浏览列表(Browser)有关的对象:history screen location Navigaton  

##### 20200705：
# 题目1：数字直接调用toString()方法的正确写法：
```
2 .toString();
2..toString();//之所以两个点是因为计算机会将第一个点认为是浮点数的点，而非调用
(2).toString();
```

# 题目2：
在大数据量场景下，以下哪种js中字符串连接方式较为高效在大数据量场景下，以下哪种js中字符串连接方式较为高效  
```
a+=b
a = a+b
Array.join();   选择这个
Array.push()
+的处理机制是：新建一个临时字符串，将新字符串赋值为a+b，然后返回这个临新字符串并同时销毁原始字符串，所以字符串连接效率较低。

arr.join(分隔符):使用分隔符将数组中的元素连接起来，组成一个str返回，不会新建临时字符串效率更高。
```

# 题目3：
只能输入零和非零开头的数字,正确的正则表达式是  

    只能输入零和非零开头的数字，就是说只能输入0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12……
    对于01， 02，……， *， a, b, c, =, +, /……等就不行啦
    所以要么是0， 要么是[1-9][0-9]* 第一位不为0的数字

    所以答案为：/^(0|[1-9][1-9]*)$/

# 题目4：
```
var name="World!";

(
    function(){
        // var name会提升到函数的最前面
        console.log(name);  // 'undefined'
        var name;
        if(typeof name=== 'undefined'){
            name='Jack';
            console.log('Goodbye'+name); // GoodbyeJack
        }else{
            console.log('hello'+name);
        }
    }
)();
```

# 函数和变量的提前声明：
```
var a = 1;
function a(a){
    console.log(a);
}
a(1);  // 会输出什么呢？？？
```
这段代码的执行与提前声明有关，实际上这段代码的执行顺序为：
```
var a;
function a(a){
    console.log(a);
}
a = 1;
a(1);  //TypeError: a is not a function
```

# 以下代码的输出为：
```
let x = 10;
let foo = () => {
console.log(x);  // 报错ReferenceError
let x = 20;
x++;
}
foo();
```
let不存在变量提升，并且如果在变量声明之前使用变量就会报错：报错ReferenceError

# undefined == null ;  true
undefined值是通过null派生出来的，==时它会自动转化为null，所以返回true
```
var a;
a == undefined;   true
```

# 大于0的数/0 ---> Infinity
isNaN(0/0)  ---> true  
运算符优先级：>的优先级高于&&,所以1&&2>1的结果是true  

# JS全局方法：
6个编码相关的方法+2数据处理+4数字相关+1特殊  

    编码相关：
        escape()、unescape()、encodeURI()、decodeURI()、
        encodeURIComponent()、decodeURIComponent()
    数据处理：Number(),String()
    数字相关：isFinite(),isNaN(),parseFloat(),parseInt()
    特殊：eval()
    https://www.runoob.com/jsref/jsref-obj-global.html

# JS全局属性：
Infinity(正的无穷大),NaN(某个值不是数值),undefined(未定义的值)

# 以下表达式的值均为0：
```
(()=>{}).length
1 & 2:按位与操作
+[]:先使用Number([])将其转换成数字0
[1,2,-3].reduce((a, b) => a - b, 0)

array.reduce(function(total, currentValue, currentIndex, arr), initialValue)
接受一个函数作为累加器，数组中每个值从左到右相减，最终计算为一个值
/*
(a,b)=(0,1),0-1=-1
(a,b)=(-1,2),-1-2=-3
(a,b)=(-3,-3),-3-(-3)=0
 */
```

