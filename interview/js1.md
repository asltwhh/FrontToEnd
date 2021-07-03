这部分参考于：https://www.w3cschool.cn/zobyhd/62xh7ozt.html，在此基础上加入了一些自己的理解以及其他的文章中看到的内容

# 1 JS

## 1 js监听对象属性的变化

1. es5:  同时监听多个对象的属性

   1. ```
      var obj = {
          name:"terry",
          _age:12	//加_默认为私有属性，没有实际作用
      }
      //为_age设置一个代理age，改变_age提供age即可
      Object.defineProperty(obj,"age",{
          configurable:true,//属性可配置
          set:function(v){
              console.log("age发生了改变")
              this._age=v;
          },
          get:function(){
              return this._age;
          }
      })
      obj.age = 13;
      ```

2. es6:  使用proxy

   1. Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。

   2. ```
      const obj = {a:1};
      
      const newObj = new Proxy(obj, {
        get: function(target, key, receiver) {
          console.log(`getting ${key}!`);
          return Reflect.get(target, key, receiver);
        },
        set: function(target, key, value, receiver) {
          console.log(target, key, value, receiver);
          if (key === 'text') {
            input.value = value;
            p.innerHTML = value;
          }
          return Reflect.set(target, key, value, receiver);
        },
      })
      
      // newObj      Proxy {a: 1}
      
      newObj.name = 'whh'   // 注意这里是修改新对象的属性才会触发监听事件
      ```

## 2 如何实现一个私有变量，用getName方法可以访问，不能直接访问

```
function Product(){
	var name='张三'
	this.getName=function(){
		return name 	
	}
}
var obj=new Product()
console.log(obj.name)//undefined
console.log(obj.getName())//张三
```

## 3 实现一个once函数，传入函数参数只执行一次

```
function once(fn){
    var ifFalse = true
    return function(){
        if(ifFalse){
            ifFalse = false
            fn()
        }
    }
}
//调用
function getName(){
    console.log('我叫吉娃娃')
}
getName = once(getName);
getName() //'我叫吉娃娃'
getName() //undefined
```

## 4 ==、===和Object.is()的区别
==：等同，比较运算符，两边值类型不同的时候，先进行类型转换，再比较；

=== 恒等，严格比较运算符，不做类型转换，类型不同就是不等；

Object.is()与===的行为基本一致，不过有两处不同
+0不等于-0。
NaN等于自身。

## 5 requestAnimationFrame

[深入理解定时器系列第二篇——被誉为神器的requestAnimationFrame - 小火柴的蓝色理想 - 博客园 (cnblogs.com)](https://www.cnblogs.com/xiaohuochai/p/5777186.html)

**requestAnimationFrame告诉浏览器您希望执行动画并且请求浏览器下一次重绘之前调用指定的函数来更新动画。该方法使用一个回调函数作为参数，这个回调函数会在浏览器重绘之前调用。大多数电脑显示器的刷新频率是60Hz，大概相当于每秒钟重绘60次。大多数浏览器都会对重绘操作加以限制，不超过显示器的重绘频率，因为即使超过那个频率用户体验也不会有提升。因此，最平滑动画的最佳循环间隔是1000ms/60，约等于16.6ms。**

计时器一直是javascript动画的核心技术。而编写动画循环的关键是要知道延迟时间多长合适。一方面，循环间隔必须足够短，这样才能让不同的动画效果显得平滑流畅；另一方面，循环间隔还要足够长，这样才能确保浏览器有能力渲染产生的变化

而setTimeout和setInterval的问题是，它们都不精确。它们的内在[运行机制](http://www.cnblogs.com/xiaohuochai/p/5773183.html#anchor3)决定了时间间隔参数实际上只是指定了把动画代码添加到浏览器UI线程队列中以等待执行的时间。如果队列前面已经加入了其他任务，那动画代码就要等前面的任务完成后再执行

requestAnimationFrame采用系统时间间隔，保持最佳绘制效率，不会因为间隔时间过短，造成过度绘制，增加开销；也不会因为间隔时间太长，使用动画卡顿不流畅，让各种网页动画效果能够有一个统一的刷新机制，从而节省系统资源，提高系统性能，改善视觉效果

### 特点

　　【1】requestAnimationFrame会把每一帧中的所有DOM操作集中起来，在一次重绘或回流中就完成，并且重绘或回流的时间间隔紧紧跟随浏览器的刷新频率

　　【2】在隐藏或不可见的元素中，requestAnimationFrame将不会进行重绘或回流，这当然就意味着更少的CPU、GPU和内存使用量

　　【3】requestAnimationFrame是由浏览器专门为动画提供的API，在运行时浏览器会自动优化方法的调用，并且如果页面不是激活状态下的话，动画会自动暂停，有效节省了CPU开销

### 使用

　　requestAnimationFrame的用法与settimeout很相似，**只是不需要设置时间间隔而已**。requestAnimationFrame使用一个回调函数作为参数，这个回调函数会在浏览器重绘之前调用。它返回一个整数，表示定时器的编号，这个值可以传递给cancelAnimationFrame用于取消这个函数的执行

```
//控制台什么都不输出
var timer = requestAnimationFrame(function(){
    console.log(0);
}); 
console.log(timer);   //1
cancelAnimationFrame(timer);   
```

实现一个进度条动画：

```
<div id="myDiv" style="background-color: lightblue;width: 0;height: 20px;line-height: 20px;">0%</div>
<button id="btn">run</button>
<script>
var timer;
btn.onclick = function(){
    myDiv.style.width = '0';
    cancelAnimationFrame(timer);
    timer = requestAnimationFrame(function fn(){
        if(parseInt(myDiv.style.width) < 500){
            myDiv.style.width = parseInt(myDiv.style.width) + 5 + 'px';
            myDiv.innerHTML =     parseInt(myDiv.style.width)/5 + '%';
            timer = requestAnimationFrame(fn);
        }else{
            cancelAnimationFrame(timer);
        }    
    });
}
</script>
```

setTimeout实现：需要设置时间，并且存在被同步代码阻塞的问题

```
<div id="myDiv" style="background-color: lightblue;width: 0;height: 20px;line-height: 20px;">0%</div>
<button id="btn">run</button>
<script>
var timer;
btn.onclick = function(){
    clearTimeout(timer);
    myDiv.style.width = '0';
    timer = setTimeout(function fn(){
        if(parseInt(myDiv.style.width) < 500){
            myDiv.style.width = parseInt(myDiv.style.width) + 5 + 'px';
            myDiv.innerHTML =     parseInt(myDiv.style.width)/5 + '%';
            timer = setTimeout(fn,16);
        }else{
            clearTimeout(timer);
        }    
    },16);
}
</script>
```

## 6 去除字符串首尾空格

`/^\s*/|/\s*$/`

## 7 Flappy Bird

有一个游戏叫做Flappy Bird，就是一只小鸟在飞，前面是无尽的沙漠，上下不断有钢管生成，你要躲避钢管。然后小明在玩这个游戏时候老是卡顿甚至崩溃，说出原因（3-5个）以及解决办法（3-5个）

1. 内存溢出：应该在钢管离开可视区域后，销毁钢管，让垃圾收集器回收钢管，因为不断生成的钢管不及时清理容易导致内存溢出游戏崩溃。
2. 资源过大：我们应该选择图片文件大小更小的图片格式，比如使用webp、png格式的图片，因为绘制图片需要较大计算量。
3. 资源加载问题：在可视区域之前就预加载好资源，如果在可视区域生成钢管的话，用户的体验就认为钢管是卡顿后才生成的，不流畅。即资源预加载
4. canvas绘制频率问题：应该需要知道大部分显示器刷新频率为60次/s,因此游戏的每一帧绘制间隔时间需要小于1000/60=16.7ms，才能让用户觉得不卡顿。

## 8 编写代码，满足以下条件

1. Hero("37er");         
   1.  执行结果为 Hi! This is 37er
2. Hero("37er").kill(1).recover(30);       
   1. 执行结果为:
   2.  Hi! This is 37er 
   3. Kill 1 bug 
   4. Recover 30 bloods
3. Hero("37er").sleep(10).kill(2)      
   1. 执行结果为 Hi! This is 37er   
   2. 等待10s后 输出：Kill 2 bugs      //注意为bugs 

```
function Hero(name){
	let o = new Object();
	o.name = name;
	o.time = 0;
	console.log(`Hi! This is ${name}`);
	o.kill = function(bugs){
		if(bugs===1){
			console.log(`Kill 1 bug`);
		}else{
			setTimeout(function(){
				console.log(`Kill ${bugs} bug `);
			},1000*this.time)
		}
	}
	o.recover=function (bloods) {
        console.log("Recover "+(bloods)+" bloods");
        return o;
    }
    o.sleep=function (sleepTime) {
        o.time=sleepTime;
        return o;
    }
	return o;
}
```

## 9 ant-design优点和缺点

优点：组件非常全面，样式效果也都比较不错。

缺点：框架自定义程度低，默认UI风格修改困难。

## 10 简单介绍一下symbol

Symbol是ES6 的新增属性，代表用给定名称作为唯一标识，这种类型的值可以这样创建，let id=symbol(“id”)

Symbl确保唯一，即使采用相同的名称，也会产生不同的值，我们创建一个字段，仅为知道对应symbol的人能访问，使用symbol很有用，symbol并不是100%隐藏，有内置方法Object.getOwnPropertySymbols(obj)可以获得所有的symbol。
也有一个方法Reflect.ownKeys(obj)返回对象所有的键，包括symbol。

所以并不是真正隐藏。但大多数库内置方法和语法结构遵循通用约定他们是隐藏的

## 11 单例模式、工厂模式、发布订阅模式、装饰模式

### 11. 1 设计模式的特性：

1. 接口：提供统一方法

2. 封装：信息私有

   ```
   function User(){
    	let tip = "welcome";                  // 内部私有属性
    	this.name = "admin";
    	this.age = 34;
    	this.setAge=function(){};
    	this.getAge=function(){};
    }
    let user = new User();      // user 是访问不到tip 的。 
   ```

3. 继承：属性、方法重用

   ```
   // 定义测试父类
   function Parent(){
       this.name = "parent";
   }
   Parent.prototype.getName = function(){
       return this.name;
   }
   ```

### 11.2 工厂模式

通过不同类型创建并返回实例。把实现同一件事情的相同代码放到同一个函数中，想实现这个功能只要执行这个函数即可，这就是工厂模式，也叫做“函数的封装"，这也是”低耦合，高内聚“，从而达到减少页面冗余代码，提高代码重复利用率的作用。



### 11.3 单例模式

只允许实例化一次的对象类。

```
let Singleton = function(name){
	this.name = name;
	this.instance = null;
}
Singleton.prototype.getName = function(){
	console.log(this.name);
}
Singleton.getInstance = function(name){
	if(this.instance){
		return this.instance;
	}
	this.instance = new Singleton(name)
	return this.instance;
}

验证：
let winner = Singleton.getInstance("winner");   
console.log(winner.getName());  //winner
let sunner = Singleton.getInstance("sunner");   
console.log(sunner.getName())   //winner
```

上面的写法中创建对象的操作和判断实例的操作冗合在一起了。

使用闭包实现：

```
let CreateSingleton = (function(){
	let instance = null;
	return function(name){
		this.name = name;
		if(instance){     // instance存在于闭包中
			return instance;
		}
		return instance = this;
	}
})();

CreateSingleton.prototype.getName = function(){
        console.log(this.name);
}

let winner = new CreateSingleton("winner");  
console.log(winner.getName());  //winner
let sunner = new CreateSingleton("sunner");  
console.log(sunner.getName())   //winner
```

### 11.4 观察者模式

解决模块间的通信问题，保持数据同步。

## 12 promise+Generator+Async的使用

Promise

解决的问题:回调地狱

Promise规范:

1. promise有三种状态，等待（pending）、已完成（fulfilled/resolved）、已拒绝（rejected）.Promise的状态只能从“等待”转到“完成”或者“拒绝”，不能逆向转换，同时“完成”和“拒绝”也不能相互转换.

2. promise 必须提供一个 then方法以访问其当前值、终值和据因。promise.then(resolve, reject),resolve 和 reject都是可选参数。如果 resolve 或reject 不是函数，其必须被忽略.

3. then 方法必须返回一个 promise 对象.

Generator函数：

1. 分段执行，可以暂停

2. 可以控制阶段和每个阶段的返回值
3. 可以知道是否执行到结尾
4. generator和异步控制: 利用Generator函数的暂停执行的效果，可以把异步操作写在yield语句里面，等到调用next方法时再往后执行。这实际上等同于不需要写回调函数了，因为异步操作的后续操作可以放在yield语句下面，反正要等到调用next方法时再执行。所以，Generator函数的一个重要实际意义就是用来处理异步操作，改写回调函数。

async和异步:

1. async 表示这是一个async函数，await只能用在这个函数里面。**async用于定义一个异步函数，该函数返回一个Promise。**如果async函数返回的是一个同步的值，这个值将被包装成一个理解resolve的Promise，等同于return Promise.resolve(value)。
2. await 表示在这里等待异步操作返回结果，再继续执行。await 后一般是一个promise对象
3. await用于一个异步操作之前，表示要“等待”这个异步操作的返回值。await也可以用于一个同步的值。

## 13 写个函数，可以转化下划线命名到驼峰命名

```
var fun = function (str) {
  var arr = str.split("");
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === "_" && i + 1 < arr.length) {
      arr.splice(i, 1);
      arr[i] = arr[i].toUpperCase();
    }
  }
  return arr.join("");
};

var fun = function (str) {
  var arr = str.split("_");
  let str1 = "";
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== "_") {
      str1 += arr[i][0].toUpperCase() + arr[i].slice(1);
    }
  }
  return str1;
};
```

## 14 深浅拷贝的区别和实现

数组的浅拷贝：

如果是数组，我们可以利用数组的一些方法，比如slice，concat方法返回一个新数组的特性来实现拷贝，但假如数组嵌套了对象或者数组的话，使用concat方法克隆并不完整，如果数组元素是基本类型，就会拷贝一份，互不影响，而如果是对象或数组，就会只拷贝对象和数组的引用，这样我们无论在新旧数组进行了修改，两者都会发生变化，我们把这种复制引用的拷贝方法称为浅拷贝，

深拷贝就是指完全的拷贝一个对象，即使嵌套了对象，两者也互相分离，修改一个对象的属性，不会影响另一个

## 16 ES6箭头函数的特性

箭头函数与普通函数的区别在于：

1. 箭头函数没有this，所以需要通过查找作用域链来确定this的值，这就意味着如果箭头函数被非箭头函数包含，this绑定的就是最近一层非箭头函数的this

2. 箭头函数没有自己的arguments对象，但是可以访问外围函数的arguments对象

   1. 箭头函数可以直接使用arguments对象获取外层函数的实参列表

   2. 可以使用剩余参数操作符`...`获取自身的实参列表

      ```
      var obj = {};
      obj.fn = function(){
        let arrow = (...args) =>{
          console.log('入参列表 : ', arguments); //外层的入参列表
          console.log('剩余参数 : ', args); //使用剩余参数表示法获得的自身入参列表
        }
        arrow(4,5,6);
      }
      obj.fn(1,2,3)
      ```

3. 不能通过new关键字调用，同样也没有new.target值和原型

**箭头函数通过this和arguments获取到都是外层函数的对应值**

## 17 三种事件模型

DOM0事件模型：

1. 在原始事件模型中（也有说DOM0级），事件发生后没有传播的概念，没有事件流。事件发生，马上处理，完事，就这么简单。监听函数只是元素的一个属性值，通过指定元素的属性值来绑定监听器。书写方式有两种：

　　　　①  HTML代码中指定属性值：<input type=”button” onclick=”func1()” />

　　　　②  在js代码中指定属性值：document.getElementsByTagName(‘input’)[0].onclick = func1

2. 优点：所有浏览器都兼容
3. 缺点：
   1. 逻辑与显示没有分离；
   2. 相同事件的监听函数只能绑定一个，后绑定的会覆盖掉前面的，如：a.onclick = func1; a.onclick = func2;将只会执行func2中的内容。
   3. 无法通过事件的冒泡、委托等机制（后面系列会讲到）完成更多事情。

4. 在当前web程序模块化开发以及更加复杂的逻辑状况下，这种方式显然已经落伍了，所以在真正项目中不推荐使用，平时写点博客小例子啥的倒是可以，速度比较快。

IE事件模型：

1. 一次事件共有两个过程，事件处理阶段，和事件冒泡阶段。事件处理阶段会首先为目标元素绑定监听事件。然后是事件冒泡阶段，冒泡指的是事件从目标元素冒泡到 document，依次检查经过的节点是否绑定了事件监听函数，如果有则执行。
2. 这种模型通过 attachEvent 来添加监听函数，可以添加多个监听函数，会按顺序依次执行。
3. 它已经解决了DOM0事件模型的三个问题。但是它自身存在的问题就是兼容性问题

DOM2事件模型：

1. 此模型是W3C制定的标准模型，既然是标准，那大家都得按这个来，我们现在使用的现代浏览器（指IE6~8除外的浏览器）都已经遵循这个规范。W3C制定的事件模型中，一次事件的发生包含三个过程：
   1. apturing phase:事件捕获阶段。事件被从document一直向下传播到目标元素,在这过程中依次检查经过的节点是否注册了该事件的监听函数，若有则执行。
   2. target phase:事件处理阶段。事件到达目标元素,执行目标元素的事件处理函数.
   3. bubbling phase:事件冒泡阶段。事件从目标元素上升一直到达document，同样依次检查经过的节点是否注册了该事件的监听函数，有则执行。
2. 所有的事件类型都会经历捕获阶段，但是只有部分事件会经历冒泡阶段,例如submit事件就不会被冒泡。 
3. 标准的事件监听器该如何绑定：addEventListener("eventType","handler","true|false");其中eventType指事件类型，注意不要加‘on’前缀，与IE下不同。第二个参数是处理函数，第三个即用来指定是否在捕获阶段进行处理，一般设为false来与IE保持一致，除非你有特殊的逻辑需求。监听器的解除也类似：removeEventListner("eventType","handler","true!false");

## 18 怎么获得对象上的属性

1. for（let I in obj）该方法依次访问一个对象及其原型链中所有可枚举的类
2. object.keys:返回一个数组，包括所有可枚举的属性名称
3. object.getOwnPropertyNames:返回一个数组包含不可枚举的属性

## 19 ES6的一些新特性

1. ES6在变量的声明和定义方面增加了let、const声明变量，有局部变量的概念，赋值中有比较吸引人的结构赋值
2. ES6对字符串、 数组、正则、对象、函数等拓展了一些方法，如字符串方面的模板字符串、函数方面的默认参数、对象方面属性的简洁表达方式
3. ES6也 引入了新的数据类型symbol，新的数据结构set和map,symbol可以通过typeof检测出来
4. 为解决异步回调问题，引入了promise和 generator
5. 还有最为吸引人了实现Class和模块，通过Class可以更好的面向对象编程，使用模块加载方便模块化编程，当然考虑到 浏览器兼容性，我们在实际开发中需要使用babel进行编译

## 20 Object.create()

1. **`Object.create()`**方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__。 （请打开浏览器控制台以查看运行结果。）
2. `let obj = Object.create(Person);`  将Person类作为obj的隐式原型

## 21 给两个构造函数A和B，如何实现A继承B？

```
function A(...) {}  A.prototype...
function B(...) {}  B.prototype...
A.prototype = Object.create(B.prototype);


Object.create()的底层实现:
Object.create =  function (o) {
   var F = function () {};
   F.prototype = o;
   return new F();
};
```

## 22 如果已经有三个promise，A、B和C，想串行执行，该怎么写？

```
// promise
A.then(B).then(C).catch(...)

// async/await
(async ()=>{
 await a();
 await b();
 await c();
})()
```

如果不是三个，是一个数组：

```
// promise
let prom = proms[0];
for(let i = 1; i < proms.length; i++) {
 prom = prom.then(proms[i]);
}

// async/await
(async ()=>{
 for(let i = 0; i < proms.length; i++) {
   await prom[i]();
 }
})()
```

## 23 隐藏一个元素

1. opacity：0，该元素隐藏起来了，但不会改变页面布局，并且，如果该元素已经绑定一些事件，如click事件，那么点击该区域，也能触发点击事件的
2. visibility：hidden，该元素隐藏起来了，但不会改变页面布局，但是不会触发该元素已经绑定的事件
3. display：none，把元素隐藏起来，并且会改变页面布局，可以理解成在页面中把该元素删除掉。

## 24 原型链题目

1. 任何的构造函数，包括Object都是Function的实例对象
2. 任何的对象，包括Function都是Object的实例对象

```
Function.prototype.a = 1;
Object.prototype.b = 2;

function A() {}

var a = new A();

console.log(a.a, a.b); // undefined, 2

console.log(A.a, A.b); // 1, 2
```

![](./img/16.png)

## 25 js对象类型，基本对象类型以及引用对象类型的区别

分为基本对象类型和引用对象类型

基本数据类型：按值访问，可操作保存在变量中的实际的值。基本类型值指的是简单的数据段。基本数据类型有这六种:undefined、null、string、number、boolean、symbol。

引用类型：当复制保存着对象的某个变量时，操作的是对象的引用，但在为对象添加属性时，操作的是实际的对象。引用类型值指那些可能为多个值构成的对象。

引用类型有这几种：Object、Array、RegExp、Date、Function、特殊的基本包装类型(String、Number、Boolean)以及单体内置对象(Global、Math)。

## 26 JavaScript中的轮播实现原理？假如一个页面上有两个轮播，你会怎么实现？

图片轮播的原理就是图片排成一行，然后准备一个只有一张图片大小的容器，对这个容器设置超出部分隐藏，在控制定时器来让这些图片整体左移或右移，这样呈现出来的效果就是图片在轮播了。

如果有两个轮播，可封装一个轮播组件，供两处调用

## 27 怎么实现一个计算一年中有多少周？

**星期一到星期天是满的，比如1月1号是星期3开始的，则星期三到星期6这4天不能算进去**

1. 首先你得知道是不是闰年，也就是一年是365还是366.

2. 其次你得知道当年1月1号是周几。假如是周五，一年365天把1号 2号3号减去，也就是把第一个不到一周的天数减去等于362
3. 还得知道最后一天是周几，假如是周五，需要把周一到周五减去，也就是362-5=357.正常情况 357这个数计算出来是7的倍数。357/7=51 。即为周数。

```
//判断是否是闰年
function isLeapYear(year) {
  if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
    console.log(year + "is leap year");
    return true;
  } else {
    console.log(year + "is not leap year");
    return false;
  }
}

//获取某年某月某日是星球几
function getDate(date) {
  let oDate = new Date(date);
  let day = oDate.getDay();   // 0-6表示星期天,星期一，...,星期六
  switch (day) {
    case 0:
      console.log("星期日");
      return 0;
    case 1:
      console.log("星期一");
      return 1;
    case 2:
      console.log("星期二");
      return 2;
    case 3:
      console.log("星期三");
      return 3;
    case 4:
      console.log("星期四");
      return 4;
    case 5:
      console.log("星期五");
      return 5;
    case 6:
      console.log("星期六");
      return 6;
  }
}

function main(year) {
  let currentYearDays = isLeapYear(year) ? 366 : 365;
  let beforeDays = 7 - getDate(`${year}-1-1`) + 1;
  let afterDays = getDate(`${year}-12-31`);
  let vaildDays = currentYearDays - beforeDays - afterDays;
  let weeks = vaildDays / 7;
  return weeks;
}
main(2021);

```

注意：Date函数的参数选择，只要是能被`Date.parse()`方法解析的字符串，都可以当作参数。比如：`2013-2-15,2013/2/15,02/15/2013,2013-FEB-15`  或者`FEB 15, 2013,` 或者 `February, 15, 2013` 或者 `15 Feb 2013` 或者 `15, February, 2013`。 如果Date没有给定参数，则默认选择的就是当前时间。`2021-06-23T06:15:57.082Z`

## 28 口述数组去重

1. [...new Set(arr)]
2. Array.from(new Set(arr))
3. 遍历+hash表，如果当前元素在hash表中已经存在，则表明重复，删除
4. 双重for循环+splice
5. 新建数组，判断arr.index(arr[i])为-1则加入新数组中

## 29 call和apply的区别

apply：调用一个对象的一个方法，用另一个对象替换当前对象。例如：B.apply(A, arguments);即A对象应用B对象的方法。   数组

call：调用一个对象的一个方法，用另一个对象替换当前对象。例如：B.call(A, args1,args2);即A对象调用B对象的方法。   多个参数

## 30 new操作符原理

1. 创建一个类的实例：创建一个空对象obj，然后把这个空对象的__proto__设置为构造函数的prototype。

2. 初始化实例：构造函数被传入参数并调用，关键字this被设定指向该实例obj。

3. 返回实例obj。

```
function myNew(Fn, ...args) {
  // 创建一个空的object实例对象obj, 作为Fn的实例对象
  const obj = {};
  // 将Fn的prototype属性值赋值给obj的__proto__属性值
  obj.__proto__ = Fn.prototype;
  // 调用Fn, 指定this为obj, 参数为args列表
  const result = Fn.call(obj, ...args);
  // 如果Fn返回的是一个对象类型, 那返回的就不再是obj, 而是Fn返回的对象
  // 否则返回obj
  return result instanceof Object ? result : obj;
}
```

## 31 简单地手写Promise

```
class PromiseM {
  constructor(executor) {
    this.promiseState = "pending";
    this.promiseResult = null;
    executor(this.resolve.bind(this), this.reject.bind(this));
    return this;
  }
  resolve(val) {
    this.promiseState = "fulfilled";
    this.promiseResult = val;
  }
  reject(err) {
    this.promiseState = "rejected";
    this.promiseResult = err;
  }
  then(onResolved, onRejected) {
    if (this.promiseState === "fulfilled") {
      onResolved(this.promiseResult);
    }
    if (this.promiseState === "rejected") {
      onRejected(this.promiseResult);
    }
  }
}
```

# 2 服务器端编程

## 32 JSONP

优点：

1. 它不像XMLHttpRequest对象实现的Ajax请求那样受到同源策略的限制，JSONP可以跨越同源策略；
2. 它的兼容性更好，在更加古老的浏览器中都可以运行，不需要XMLHttpRequest或ActiveX的支持

缺点：

1. JSON只支持get，因为script标签只能使用get请求；
2. JSONP需要后端配合返回指定格式的数据。

## 32 跨域（jsonp，ajax）

1. jsonP跨域：
   1. script标签src属性中的链接却可以访问跨域的js脚本，利用这个特性，服务端不再返回JSON格式的数据，而是返回一段调用某个函数的js代码，在src中进行了调用，这样实现了跨域。
   2. 通过动态创建script，再请求一个带参网址实现跨域通信。

2. document.domain + iframe跨域：两个页面都通过js强制设置document.domain为基础主域，就实现了同域。因为浏览器通过`document.domain`属性来检查是否同源。设置为相同，则；浏览器就会判断两个界面同源
3. location.hash + iframe跨域：a欲与b跨域相互通信，通过中间页c来实现。 三个页面，不同域之间利用iframe的location.hash传值，相同域之间直接js访问来通信。
4. postMessage跨域：可以跨域操作的window属性之一。
5. CORS：服务端设置Access-Control-Allow-Origin即可，前端无须设置，若要带cookie请求，前后端都需要设置。
6. 代理跨域：起一个代理服务器，实现数据的转发

## 33 readyState

readystate是xhr对象的属性，表示状态,5个值

- 0:(xhr实例生成了，但是实例的open()方法还没有被调用)
- 1: (open方法调用完毕)
- 2: send方法调用完毕)
- 3: (服务端返回了结果,但是没有返回全部的结果)
- 4: 服务端返回的所有的结果

## 34 实现一个Ajax

AJAX创建异步对象XMLHttpRequest

操作XMLHttpRequest 对象

（1）设置请求参数（请求方式，请求页面的相对路径，是否异步）

（2）设置回调函数，一个处理服务器响应的函数，使用 onreadystatechange ，类似函数指针

（3）获取异步对象的readyState 属性：该属性存有服务器响应的状态信息。每当 readyState 改变时，onreadystatechange 函数就会被执行。

（4）判断响应报文的状态，若为200说明服务器正常运行并返回响应数据。

（5）读取响应数据，可以通过 responseText 属性来取回由服务器返回的数据。

```
var xhr = new XMLHttpRequest();
xhr.open("get", "aabb.php", true);
xhr.send(null);
xhr.onreadystatechange = function () {
  if (xhr.readyState == 4) {
    if (xhr.status == 200) {
      console.log(xhr.responseText);
    }
  }
};
```

## 如果我想发出两个有顺序的ajax需要怎么做？

发出两个有顺序的ajax，可以用回调函数，也可以使用Promise.then或者async等。

# 3 其他

## 35 接口文档如何写

1. 在项目开发中，web项目的前后端分离开发，APP开发，需要由前后端工程师共同定义接口，编写接口文档，之后大家都根据这个接口文档进行开发，到项目结束前都要一直维护。

2. 为什么要写接口文档？

   1. 项目开发过程中前后端工程师有一个统一的文件进行沟通交流开发
   2. 项目维护中或者项目人员更迭，方便后期人员查看、维护

3. 接口规范是什么？

   1. 首先接口分为四部分：方法、uri、请求参数、返回参数

   2. 方法:新增(post) 修改(put) 删除(delete) 获取(get)

   3. uri：以/a开头。uri地址里不允许出现大写字母，如果是两个单词拼接，用/分开

   4. 请求参数和返回参数，都分为5列：字段、说明、类型、备注、是否必填

      1. 字段是类的属性；说明是中文释义；
      2. 类型是属性类型，只有String、Number、Object、Array四种类型；
      3. 备注是一些解释，或者可以写一下例子，比如负责json结构的情况，最好写上例子，好让前端能更好理解；
      4. 是否必填是字段的是否必填。

   5. 请求参数举例：

      ![img](https://pic4.zhimg.com/80/v2-797a8c463f3479ccd094da4f4f15dfbd_720w.jpg?source=1940ef5c)

4. 接口设计原则：

   1. 充分理由:不是随便一个功能就要有个接口，也不是随便一个需求就要加个接口。每新建一个接口，就要有充分的理由和考虑，无意义的接口不仅增加了维护的难度，更重要是对于程序的可控性的大大降低，接口也会十分臃肿。
   2. 职责明确:一个接口只负责一个业务功能，比如查询会员，但不要在查询会员的同时还有修改权限等类似的其他业务功能，应该分成两个接口做。
   3. 高内聚低耦合:一个接口要包含完整的业务功能，而不同接口之间的业务关联要尽可能的小。
   4. 分析角度明确:设计接口分析的角度要统一明确。否则会造成接口结构的混乱。
   5. 入参格式统一:所有接口的参数格式要求及风格要统一，不要一个接口参数是逗号分隔，另一个就是数组;不要一个接口日期参数是x年x月x日风格，另一个就是x-x-x。
   6. 状态及消息:提供必要的接口调用状态信息。调用是否成功?如果失败，那么失败的原因是什么。这些必要的信息必须要告诉给客户端。
   7. 控制数据量:一个接口返回不应该包含过多的数据量，过多的数据量不仅处理复杂，对数据传输的压力也非常大，会导致客户端反应缓慢。过多的数据量很多时候都是接口划分不明确。

# 4 流行框架

## 1 redux的作用

Redux 是一个用来管理管理数据状态和 UI 状态的 JavaScript 应用工具。随着 JavaScript 单页应用（SPA）开发日趋复杂，JavaScript 需要管理比任何时候都要多的 state（状态），Redux 就是降低管理难度的。

在组件化的应用中，会有着大量的组件层级关系，深嵌套的组件与浅层父组件进行数据交互，变得十分繁琐困难。而redux，站在一个服务级别的角度，可以毫无阻碍地将应用的状态传递到每一个层级的组件中。redux就相当于整个应用的管家。

## 2 redux里常用方法

## 3 redux中的reducer（纯函数）

Redux数据流里，reducer其实是根据之前的状态（previous state）和现有的action（current action） 更新state(这个state可以理解为上下累加器的结果） 每次redux reducer被执行时，state和action被传入，这个state根据action进行累加或者是'自身消减'(reduce), 进而返回最新的state,这也就是典型reduce函数的用法：state ->  action ->  state

## 3 介绍一下react,React的好处

React 是一个用于构建用户界面的 JAVASCRIPT 库。React可以创建交互式UI。为应用程序中的每个状态建立的视图，并且React将在数据更改时进行更新，呈现正确的组件。另外，我们也可以构建管理自己状态的封装组件，然后将它们组合成复杂的UI。因为组件用JS编写而不是模板，所以可以通过应用传递数据，并使状态与DOM分离

React特点有：

1. 声明式设计 −React采用声明范式，可以轻松描述应用。

2. 高效 −React通过对DOM的模拟，最大限度地减少与DOM的交互。

3. 灵活 −React可以与已知的库或框架很好地配合。

4. JSX − JSX 是 JavaScript 语法的扩展。React 开发不一定使用 JSX ，但我们建议使用它。

5. 组件 − 通过 React 构建组件，使得代码更加容易得到复用，能够很好的应用在大项目的开发中。

6. 单向响应的数据流 − React 实现了单向响应的数据流，从而减少了重复代码，这也是它为什么比传统数据绑定更简单。

## 4 React单项数据流

在React中，数据是单向流动的，是从上向下的方向，即从父组件到子组件的方向。

state和props是其中重要的概念，如果顶层组件初始化props，那么React会向下遍历整颗组件树，重新渲染相关的子组件。其中state表示的是每个组件中内部的的状态，这些状态只在组件内部改变。
把组件看成是一个函数，那么他接受props作为参数，内部由state作为函数的内部参数，返回一个虚拟dom的实现。

## 5 react生命周期函数(旧)

1. React的组件在第一次挂载的时候首先获取父组件传递的props，接着获取初始的state值，（getDefaultProps获取实例的默认属性，getInitialState获取每个实例的初始化状态）
2. 接着经历挂载阶段的三个生命周期函数，也就是ComponentWillMount，render，ComponentDidMount，这三个函数分别代表组件将会挂载，组件渲染，组件挂载完毕三个阶段
3. 在组件挂载完成后，组件的props和state的任意改变都会导致组建进入更新状态，在组件更新阶段
   1. 如果是props改变，则进入ComponentWillReceiveProps函数，接着进入ComponentShouldUpdate进行判断是否需要更新，这个默认是true，表示更新。当手动设置为false,判定不需要更新的话，组件继续运行。需要更新的话则依次执行render，ComponentDidUpdate三个函数
   2. 如果是state改变则直接进入ComponentShouldUpdate判定
4. 当组件卸载时，会首先进入生命周期函数ComponentWillUnmount,之后才进行卸载，如图

![img](https://uploadfiles.nowcoder.com/images/20190313/311436_1552449334251_333911954F2DCB5163DF98765ED4E026)

react生命周期函数:

1. 初始化阶段：
   1. getDefaultProps获取实例的默认属性
   2. getInitialState获取每个实例的初始化状态
   3. ComponentWillMount：组件将被装载，渲染到页面上
   4. render：组件在这里生成虚拟的DOM节点
   5. ComponentDidMount:组件真正被装载之后

2. 运行中状态：
   1.  componentWillReceiveProps:组件将要接收到属性的时候调用 
   2.  shouldComponentUpdate:组件接受到新属性或者新状态的时候（可以返回 false，接收数据后不更新，阻止 render 调用，后面的函数不会被继续执行了）
   3.  shouldComponentUpdate 这个方法用来判断是否需要调用 render 方法重新描绘 dom。因为 dom 的描绘非常消耗性能，如果我们能在 shouldComponentUpdate 方法中能够写出更优化的 dom diff 算法，可以极大的提高性能。
   4.  componentWillUpdate:组件即将更新不能修改属性和状态
   5.  render:组件重新描绘 
   6.  componentDidUpdate:组件已经更新 销毁阶段
3. componentWillUnmount:组件即将销毁

## 6 reactJs的组件交流

React组件之间的交流方式可以分为以下三种

1. 父组件向子组件传值:主要是利用props来进行交流

2. 子组件向父组件传值：子组件通过控制自己的state然后告诉父组件的点击状态。然后在父组件中展示出来，子组件则是通过调用父组件传给它的函数给父组件传递数据。如图：

![img](https://uploadfiles.nowcoder.com/images/20190313/311436_1552449534178_B47FC53A4528B4CD14EAA0C5621FD661)

3. 没有任何嵌套关系的组件之间传值：如果组件之间没有任何关系，组件嵌套层次比较深（个人认为 2 层以上已经算深了），或者你为了一些组件能够订阅、写入一些信号，不想让组件之间插入一个组件，让两个组件处于独立的关系。对于事件系统，这里有 2 个基本操作步骤：
   1. 订阅（subscribe）/监听（listen）一个事件通知，并发送（send）/触发（trigger）/发布（publish）/发送（dispatch）一个事件通知那些想要的组件。
   2. redux
   3. context

## 7 有了解过react的虚拟DOM吗，虚拟DOM是怎么对比的呢

- 虚拟ＤＯＭ：
  - 虚拟DOM本质就是一个一般的Js对象
  - 虚拟DOM比较轻，真实DOM比较重，因为虚拟DOM是React内部在用，无需真实DOM上那么多的属性
  - 虚拟DOM最终会被React转化为真实DOM呈现在页面上

虚拟DOM是怎么对比？当然是使用的diff算法，diff算法有三种优化形式：

1. tree diff：将新旧两颗DOM树按照层级遍历，只对同级的DOM节点进行比较，即同一父节点下的所有子节点，当发现节点已经不存在，则该节点及其子节点会被完全删除，不会进一步比较

2. component diff：不同组件之间的对比，如果组件类型相同，暂不更新，否则删除旧的组件，再创建一个新的组件，插入到删除组件的位置

3. element diff:在类型相同的组件内，再继续对比组件内部的元素

## 8 怎么获取真正的dom

ReactDOM.findDOMNode()或this.refs

1. findDOMNode通常用于React组件的引用，其语法如下：

   1. 当组件被渲染到DOM中后，findDOMNode会返回该组件实例对应的DOM节点。

   2. ```
      componentDidMount(){
          const dom = ReactDOM.findDOMNode(this);
          // this为当前组件的实例
      }
      
      render() {}
      ```

2. refs多用于React组件内子组件的引用。

   1. 子组件为原生DOM组件,则可以通过refs直接获取到该DOM节点

      ```
      回调函数格式：
      <input ref={(ref)=>{this.myInput = ref}} />    获取：this.myInput
      
      字符串形式：
      <input ref='myInput' />   获取：this.refs.myInput
      ```

   2. 子组件为React组件: 通过refs获取到的就是该组件的实例对象，通过ReactDOM.findDOMNode获取到的就是该实例对应的dom节点

      ```
      componentDidMount(){
          const myComp = this.refs.myComp;  // 获取到的是<Comp />的实例myComp，即可以使用该实例的方法了
          
          const dom = ReactDOM.findDOMNode(myComp);  // 获取到实例对应的DOM节点
      }
      
      render(){
          return (
              <div>
                  <Comp ref='myComp' />
              </div>
          );
      }
      ```

## 9 react的生命周期函数(新)

在使用新版本的react，添加了旧的生命周期勾子时，会在控制台报出一些警告，指明当前的勾子不安全（不是指安全性不高，而是为了避免被滥用，尤其是加入了异步操作以后，这些勾子并没有删除，而是添加了UNSAFE_前缀）

在react   17.0.1后，如果要用，就需要加前缀，否则就只能使用新的勾子

1. 初始化阶段: 由ReactDOM.render()触发---初次渲染

   1. constructor()

   2. getDerivedStateFromProps(props,preState)：从props中获取派生状态，即从父组件中传递的数据保存在了props中，该数据又从props中拿出来放入了state中

      ```
      - 参数1是从父组件中传递过来的，state是当前组件未更新前的状态
      
      - **注意：这个方法是给类组件调用的，不是给实例调用的，需要添加static属性，并且应该返回null或者状态对象**，状态对象指的是和组件state中的属性相同的一个对象
      
      - 如果返回一个状态对象，则会直接将组件的状态修改为所返回的那个对象。并且使用之前定义的更新state的方法已经无法实现state的更新了，除非返回的对象发生变化
      
      - 有一个用法：直接将父组件传递过来的props返回，这样，除非父组件传递过来的props发生变化，否则该状态值永远都不会发生变化。也就是说：**若state的值在任何时候都取决于props**，那么可以使用getDerivedStateFromProps
      
      - 极少用，使用场景单一
      ```

   3. render()

   4. componentDidMount() =====> 常用
      	一般在这个勾子中做一些初始化的事，例如：开启定时器、发送网络请求、订阅消息

2. 更新阶段: 由组件内部this.setSate()或父组件重新render触发

   1. getDerivedStateFromProps

   2. shouldComponentUpdate()

   3. render()

   4. getSnapshotBeforeUpdate(preProps,preState)

      ```
      - preProps：父组件传递过来的props,preState更新之前的state
      
      - 必须返回一个快照值或者null。 字符串，数组，函数等都可以作为快照值snapshotValue
      
      - 它的返回值会传递给componentDidUpdate
      
      - 不常用
      ```

   5. componentDidUpdate(preProps,preState,snapshotValue)

3. 卸载组件: 由ReactDOM.unmountComponentAtNode()触发

   1.	componentWillUnmount()  =====> 常用
        	一般在这个勾子中做一些收尾的事，例如：关闭定时器、取消订阅消息

新的生命周期勾子废弃了componentWillMount,componentWillReceiveProps,componentWillUpdate。 

但是新的生命周期勾子添加了两个新的勾子：getDerivedStateFromProps和getSnapShotBeforeUpdate。

## 10 setState之后的流程

在代码中调用setState函数之后，React 会将传入的参数对象与组件当前的状态合并，然后触发所谓的调和过程（Reconciliation）。 经过调和过程，React 会以相对高效的方式根据新的状态构建 React 元素树并且着手重新渲染整个UI界面。 在 React 得到元素树之后，React 会自动计算出新的树与老树的节点差异，然后根据差异对界面进行最小化重渲染。 在差异计算算法中，React 能够相对精确地知道哪些位置发生了改变以及应该如何改变，这就保证了按需更新，而不是全部重新渲染。

## 11 react高阶组件（HOC）知道吗？

高阶组件接收React组件作为参数，并且返回一个新的React组件。高阶组件本质上也是一个函数，并不是一个组件。

HOC 在 React 的第三方库中很常见，例如 Redux 的 [`connect`](https://github.com/reduxjs/react-redux/blob/master/docs/api/connect.md#connect) 。

## 12 react的组件是通过什么去判断是否刷新的

通过state是否改变

## 13 react中的keys

帮助我们跟踪哪些项目已更改、添加、从列表中删除，key是独一无二的，可以让我们高效的去定位元素，并且操作它

1). 简单的说: key是虚拟DOM对象的标识, 在更新显示时key起着极其重要的作用。

 2). 详细的说: 当状态中的数据发生变化时，react会根据【新数据】生成【新的虚拟DOM】, 随后React进行【新虚拟DOM】与【旧虚拟DOM】的diff比较，比较规则如下：

    a. 旧虚拟DOM中找到了与新虚拟DOM相同的key：
     (1).若虚拟DOM中内容没变, 直接使用之前的真实DOM
     (2).若虚拟DOM中内容变了, 则生成新的真实DOM，随后替换掉页面中之前的真实DOM
    
    b. 旧虚拟DOM中未找到与新虚拟DOM相同的key
         根据数据创建新的真实DOM，随后渲染到到页面

 3). 组件的 key 值并不需要在全局都保证唯一，只需要在当前的同一级元素之前保证唯一即可。

## 14 为什么虚拟DOM会提高性能

1. 虚拟DOM相当于在js和真实dom中间加了一个缓存，利用dom diff算法避免了没有必要的doom操作，从而提高性能
2. 虚拟DOM比较轻便，没有很多真实dom节点上的属性和方法
3. 具体实现步骤： ·
   1. 用JavaScript对象结构表示DOM树的结构；
   2. 然后用这个树构建一个真正的DOM树，插到文档中 。当状态变更的时候，重新构造一棵树的对象树，
   3. 然后用新的树和旧的树进行对比，记录两棵树差异 ·把2所记录的差异应用到步骤1所构建的真正的DOM树上，试图就更新了。

## 15 diff算法

1. 把树形结构按照层级分解，只比较同级元素 

2. 给列表结构的每个单元添加key属性，方便比较。在实际代码中，会对新旧两棵树进行一个深度优先的遍历，这样每个节点都会有一个标记 
3.  在深度优先遍历的时候，每遍历到一个节点就把该节点和新的树进行对比。如果有差异的话就记录到一个对象里面 Vritual DOM 算法主要实现上面步骤的三个函数：element， diff， patch。然后就可以实际的进行使用 react只会匹配相同的class的component（这里的class指的是组件的名字） 合并操作，条用component的setState方法的时候，React将其标记为dirty.到每一个时间循环借宿，React检查所有标记dirty的component重新绘制
4. 选择性子树渲染。可以重写shouldComponentUpdate提高diff的性能	

## 16 flux

http://www.ruanyifeng.com/blog/2016/01/flux.html

flux是一个前端框架。

flux的最大特点，就是数据的‘单向流动’ 

1. 用户访问View 
2. View发出用户的Action 
3. Dispatcher收到Action,要求state进行相应的更新
4. store更新后，发出一个‘change’事件后，更新页面
5. View 收到"change"事件后，更新页面

数据总是"单向流动"，任何相邻的部分都不会发生数据的"双向流动"。这保证了流程的清晰。

## 17 reac性能优化是哪个周期函数

shouldComponentUpdate 这个方法用来判断是否需要调用render方法重新描绘dom。因为dom的描绘非常消耗性能， 如果我们在shouldComponentUpdate方法中能够写出更优化的dom diff算法，可以极大的提高性能

## 18 react怎么划分业务组件和技术组件

1. 根据组件的职责通常把组件分为UI组件和容器组件 
2. UI组件负责UI的呈现，容器组件负责管理数据和逻辑 
3. 两者通过React-redux提供connect方法联系起来

## 19 setState

1. setState通过一个队列机制实现state更新，当执行setState时，会将需要更新的state放入状态队列，而不会立即更新this.state，队列机制可以高效地批量更新state。

2. 如果不通过setState而直接修改this.state的值，那么该state将不会被放入状态队列中。当下次调用setState并对状态队列进行合并时，就会忽略之前修改的state，造成不可预知的错。 同时，也利用了队列机制实现了setState的异步更新，避免了频繁的重复更新state 同步更新state: setState 函数并不会阻塞等待状态更新完毕，因此 setNetworkActivityIndicatorVisible 有可能先于数据渲染完毕就执行。 

3. 第二个参数是一个回调函数，在setState的异步操作结束并且组件已经重新渲染的时候执行。也就是说，我们可以通过这个回调来拿到更新的state的值，实现代码的同步，例子：


# 5 Node.js

## 1 你有用到Express,讲讲Express

Express 是一个简洁而灵活的 node.js Web应用框架, 提供了一系列强大特性帮助你创建各种 Web 应用，和丰富的 HTTP 工具。

可以迅速地搭建一个服务器后台





