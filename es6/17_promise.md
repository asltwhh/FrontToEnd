# Promise

Promise:实现异步编程，可以看作是一个容器，里面保存着未来才会结束的事件，它是一个对象  
Promise对象代表一个异步操作，有三种状态：pending(进行中)、fulfilled(已成功)、rejeced(已失败)。只有异步操作结束才可以决定是哪种状态，其他手段无法改变。  
一旦状态改变就不会再变。  
Promise对象提供统一的接口，使得控制异步操作更加容易  
缺点：  

    一旦建立就无法中途取消
    如果不设置回调函数，内部会抛出错误


### 1 产生promise实例
```
const promise = new Promise(函数);
函数内容：
function(resolve,reject){
    // 该函数的两个参数分别是resolve和reject,它们是两个函数，由 JavaScript 引擎提供，不用自己部署
    // 这两个函数由promise实例的状态改变调用，异步操作成功后将结果作为参数调用resolve函数，异步操作失败后将报出的错误作为参数调用reject函数
    // code
    if(异步操作成功){
        resolve(value);
    }else{
        reject(error);
    }
}
```

promise实例产生后，可以使用then方法分别指定fulfilled状态和rejected状态的回调函数  
then方法接受两个回调函数作为参数,第二个参数可以省略  

    第一个回调函数在promise对象的状态从pending变成fulfilled时调用
    第二个回调函数在promise对象的状态从pending变成rejected时调用

```
promise.then(function1,function2)
promise.then(function(value){
    // success
    },function(error){
    //failure
    }
);
```

下面给出一个简单的例子：
```
// timeout函数返回一个promise实例
function timeout(ms){
    return new Promise(function(resolve,reject){
        // setTimeout(回调函数,时长,传递给回调函数的参数)
        setTimeout(resolve,ms,'done');
        })
}

let promise = timeout(100);
// 过了指定的时间，promise实例的状态变成fulfilled，就会触发then方法绑定的回调函数resolve，从而输出其中所传递的参数done
promise.then(function(value){
    console.log(value);
    });
```

抛出错误，状态转为rejected,自动调用then指定的reject函数  
```
const promise = new Promise(function(resolve, reject) {
    throw new Error('error in prromise');
});
promise
.then(function(value){
    console.log(value);
},function(error){
    console.log(error);
})

// Error: error in prromise
```

promise新建后就会立即执行  
```
let promise = new Promise(function(resolve, reject) {
  console.log('Promise');
  resolve();
});

promise.then(function() {
  console.log('fulfilled.');
});

console.log('Hi!');

/*Promise       Hi!         fulfilled.
Promise新建后会立即执行
then方法指定的回调函数需要在当前脚本所有同步任务执行完才会执行，所以console.log('Hi!')先执行，最后是fulfilled
*/
```

p1和p2都是 Promise 的实例，但是p2的resolve方法将p1作为参数，即一个异步操作的结果是返回另一个异步操作。  
这时p1的状态就会传递给p2，也就是说，p1的状态决定了p2的状态。如果p1的状态是pending，那么p2的回调函数就会等待p1的状态改变；如果p1的状态已经是fulfilled或者rejected，那么p2的回调函数将会立刻执行。  
```
const p1 = new Promise(function (resolve, reject) {
  setTimeout(() => reject(new Error('fail')), 3000)
})

const p2 = new Promise(function (resolve, reject) {
  setTimeout(() => resolve(p1), 1000)
})

p2
  .then(result => console.log(result))
  .catch(error => console.log(error))

  /*
  Error: fail

  p1在3秒之后状态由pending转为rejected
  p2在1秒之后状态由pending转为rejected
  p2的状态在1秒之后改变，resolve方法返回p1,p1决定p2的状态，此时p1的状态是pending,所以p2就会等待p1的状态改变，又过了2秒，p1状态变为rejected，导致触发catch方法指定的回调函数
   */
```

调用resolve或reject并不会终结 Promise 的参数函数的执行  
```
new Promise((resolve, reject) => {
    // 注意：promsize中的resolve永远在本轮事件循环的末尾执行，总是在本轮循环的同步任务之后执行
  resolve(1);
  console.log(2);
}).then(r => {
  console.log(r);
});

// 2   1
```

# Promise.protoType.then()
链式使用：
```
let promise = new Promise(function(resolve,rejected){
    setTimeout(resolve,1000,'fulfilled!');
});
// 链式then方法
// 产生一个promise实例，该实例在1秒后状态由pending变成fulfilled,并且返回fulfilled!作为resolve函数的参数
promise.then(function(value){
    console.log(value);
    return true;
}).then(function(value1){
    // 第一个回调函数结束后将返回结果作为参数传入第二个回调函数
    console.log(value1);
})

// fulfilled!  true
```

# Promise.prototype.catch()
用于指定发生错误时的回调函数  
当一个promise实例的状态变为fulfilled，会调用then方法指定的回调函数  
如果promise实例跑出错误，状态变成rejected，就会调用catch()方法指定的回调函数  

```
const promise = new Promise(function(resolve, reject) {
  throw new Error('test');
});
promise.catch(function(error) {
  console.log(error);
});

// Error: test
// promise抛出一个错误，就被catch()方法指定的回调函数捕获
```

当在then()指定的回调函数中运行抛出错误，也会被catch()捕获  
在promise中，一旦状态变为fulfilled，再想抛出错误就没用了  
```
const promise = new Promise(function(resolve, reject) {
    setTimeout(resolve('dada'), 1000);
    // 由于promise状态已经变成了fulfilled,所以后面再跑出错误无效
    // throw new Error('error in prromise');
});
promise
.then(function(value,args){
    console.log(value);
    throw new Error('error in resolve');
})
.catch(function(error) {
  console.log(error);
});
// dada
// error in resolve
```

# Promise.prototype.finally()
finaly对象用于指定不管Promise对象最后状态如何均会执行的操作  
```
// 状态转为fulfilled
let promise = new Promise(function(resolve,reject){
    resolve(1);
})

promise
.then(result => {
    // 箭头函数表示传入参数result
    console.log(result);
})
.catch(error => {
    // 箭头函数表示传入参数error
    console.log(error);
})
.finally((a=2) => {
    console.log(a)
})
// 1      2

// 状态转为rejected
let promise = new Promise(function(resolve,reject){
    throw new Error('error in promise');
})

promise
.then(result => {
    // 箭头函数表示传入参数result
    console.log(result);
})
.catch(error => {
    // 箭头函数表示传入参数error
    console.log(error);
})
.finally((a=2) => {
    console.log(a)
})
// Error: error in promise      2
```

# promise.all
将多个Promise实例包装成一个新的Promise实例  
```
const p = Promise.all([p1,p2,p3]);
```
该方法接受一个数组作为参数，数组的元素就是Promise实例  

p的状态有两种情况：

    1.p1,p2,p3均变成fulfilled状态,p才会变成fulfilled状态，此时p1,p2,p3的返回值组成一个数组传递给p的回调函数
    2.p1,p2,p3中存在一个是rejected状态，p的状态就是rejected,此时第一个变成rejected状态的实例的返回值作为参数传递给p的回调函数

```
// p2首先变为rejected状态，所以p2的返回值作为p的reject函数的参数
let p1 = new Promise(function(resolve,reject){
    resolve(1);
})
let p2 = new Promise(function(resolve,reject){
    throw new Error('error in promise2');
})
let p3 = new Promise(function(resolve,reject){
    throw new Error('error in promise3');
})

let p = Promise.all([p1,p2,p3]);
p.then(function(value){
    console.log(value);
},function(error){
    console.log(error);
})
// Error : error in promise2

// 三个实例均变为了fulfilled状态
let p1 = new Promise(function(resolve,reject){
    resolve(1);
})
let p2 = new Promise(function(resolve,reject){
    resolve(2);
})
let p3 = new Promise(function(resolve,reject){
    resolve(3);
})

let p = Promise.all([p1,p2,p3]);
p.then(function(value){
    console.log(value);
},function(error){
    console.log(error);
})
// [ 1, 2, 3 ]
```

# Promise.race()
将多个Promise实例包装成一个新的Promise实例  
只要p1、p2、p3之中有一个实例率先改变状态，p的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给p的回调函数。  
```
// 第一个Promise实例10秒后状态变为rejected，第二个Promise对象5秒后变成rejectd,所以第二个Promise对象状态改变后，p就变成了rejected状态，调用p的reject函数
const p = Promise.race([
  new Promise(function (resolve, reject) {
    setTimeout(() => reject(new Error('request timeout1')), 10000)
  }),
  new Promise(function (resolve, reject) {
    setTimeout(() => reject(new Error('request timeout2')), 5000)
  })
]);

p
.then(console.log)
.catch(console.error);

// Error: request timeout2
```

# Promise.allSettled()
接受一组Promise实例作为参数，包装成一个新的Promise实例  
只有等到所有这些实例均返回结果，不管是fulfilled还是rejected,包装实例才会结束  
返回的结果是所有实例返回结果组成的一个数组  
```
const p = Promise.allSettled([
    // 第一个promise实例异步执行成功，转为fulfilled状态
  new Promise(function (resolve, reject) {
    setTimeout(() => resolve(1), 10000);
  }),
  // 第二个promise实例异步执行失败，转为rejected状态
  new Promise(function (resolve, reject) {
    setTimeout(() => reject(new Error('request timeout2')), 5000)
  })
]);

p
.then(value => console.log(value))
.catch(errror => console.log(error));

// [
//      { status: 'fulfilled', value: 1 },
//      {
//          status:rejected,reason:Error:request timeout1
//      }
// ]
```

# Promise.any()
接受一组Promise实例作为参数，包装成一个新的Promise实例  
只要有一个变成fullfilled状态，包装实例就会变成fulfilled状态  
如果所有均变成rejected状态，包装实例就会变成rejected状态  
```

```

# Promise.resolve()
将现有对象转换为Promise对象  
参数有4中形式：  
（1）参数是一个Promise实例，则不作任何修改，原封不动地返回这个promise实例  
（2）参数是一个具有then方法的对象
```
let foo = {
    name:'dada',
    age:14,
    then:function(resolve,reject){
        resolve(1);
    }
}
let promise = Promise.resolve(foo);
// 暂时还未转换状态,
console.log(promise);  // Promise { <pending> }

promise.then(value =>{
    // 状态变为fulfilled，值为1
    console.log(promise);  // Promise { 1 }
    console.log(value);  // 1
})
```

(3)参数不具备then方法的对象  
返回一个新的Promise对象，并且状态为fulfilled,将该对象作为resolve函数的参数传入  
```
let foo = {
    name:'dada',
    age:14
}
let promise = Promise.resolve(foo);

promise.then(value =>{
    console.log(value);  // {name:'dada',age:14}
})
```

(4)不带有任何参数  
直接返回一个fulfilled状态的Promise对象  
立即resolve()的 Promise 对象，是在本轮“事件循环”（event loop）的结束时执行  
```
// setTimeout(fn, 0)在下一轮“事件循环”开始时执行，Promise.resolve()在本轮“事件循环”结束时执行，console.log('one')则是立即执行，因此最先输出

setTimeout(function () {
  console.log('three');
}, 0);

Promise.resolve().then(function () {
  console.log('two');
});

console.log('one');

// one
// two
// three
```

# Promise.reject(reason)
返回一个新的Promise实例，并且状态为rejected  
该方法的参数会原封不动地作为reject的理由，变成后续方法的参数  


# Promise.try()
不想区分函数是异步操作还是同步操作，直接用then方法指定下一步流程  
```
不管f是同步事件还是异步事件，f均会在本轮循环的末尾执行
Promise.resolve().then(f);
```

setTimeout在下一轮循环的开始执行  
promise在本轮循环末执行  
同步语句  >>>>   promise    >>>>    setTimeout  
```
// 函数f本应是同步函数，经过promise包装后变成了异步执行
const f = () => console.log('now');
Promise.resolve().then(f);
setTimeout(function(a,b){
    console.log(a+b);
}, 1000,1,2)
console.log('next');

/*
next
now
3
 */
```