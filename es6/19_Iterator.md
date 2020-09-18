# Iterator(遍历器)
js中原有的表示"集合"的数据结构：Array,Object  
es6中又添加了Map和Set  
为了处理不同的数据结构，就需要一种用以的接口机制——Iterator  
Iterator为不同的数据结构提供统一的访问机制，任何数据只要部署了Iterator接口，就可以完成遍历操作  
Iterator主要是为了遍历命令for..of循环使用  
Iterator 的遍历过程：

    （1）创建一个指针对象，指向当前数据结构的起始位置。也就是说，遍历器对象本质上，就是一个指针对象。
    （2）第一次调用指针对象的next方法，可以将指针指向数据结构的第一个成员。
    （3）第二次调用指针对象的next方法，指针就指向数据结构的第二个成员。
    （4）不断调用指针对象的next方法，直到它指向数据结构的结束位置。

每一次调用next方法，都会返回数据结构的当前成员的信息。具体来说，就是返回一个包含value和done两个属性的对象。其中，value属性是当前成员的值，done属性是一个布尔值，表示遍历是否结束。
```
// 定义一个遍历器,返回一个遍历器对象，该对象包含next函数属性
function makeIterator(array){
    var nextIndex = 0;
    return {
        next:function(){
            // next方法返回一个对象，对象中包含两个属性，value表示当前位置的成员，done表示遍历操作是否结束
            return nextIndex < array.length ?
                {value : array[nextIndex++],done:false} :
                {value : undefined, done:true};
        }
    }
}
var it = makeIterator([1,2,3,4]);
console.log(typeof it)
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());

/*
object
{ value: 1, done: false }
{ value: 2, done: false }
{ value: 3, done: false }
{ value: 4, done: false }
 */

```

# 默认的Iterator接口
es6规定，默认的Iterator接口部署在数据结构的Symbol.iterator属性，也就是说只要一个数据结构具备Symbol.iterator属性，就可以看作是可遍历的  
Symbol.iterator属性本身是一个函数，会返回一个遍历器；它是一个表达式，返回Symbol对象的iterator属性，是一个类型为Symbol的特殊值，**要放在方括号内**  
```
const obj = {
    name : 'mama',
    [Symbol.iterator]:function(){
        return {
            next : function(){
                return {value:1, done:true};
            }
        }
    }
}
// 注意这里的写法，使用方括号调用obj的Symbol.iterator属性，由于该属性是一个函数，则()执行该函数
var it = obj[Symbol.iterator]();
console.log(it.next());// { value: 1, done: true }
```

es6中一些数据结构的原生中就部署了Symbol.iterator属性，所以可以直接使用next()方法、for...of遍历  
原生中部署了Iterator接口的数据结构有：Array,Map,Set,String,TypedArray,函数的arguments对象,NodeList对象  

```
let arr = [1,2,3,4];
let iter = arr[Symbol.iterator]();
console.log(iter.next());  // { value: 1, done: false }
```

给类的原生中部署Symbol.iterator属性
```
function Obj(value) {
  this.value = value;
  this.next = null;
}
/*在构造函数的原型链上部署Symbol.iterator方法，调用该方法会返回遍历器对象iterator，调用该对象的next方法，在返回一个值的同时，自动将内部指针移到下一个实例*/
Obj.prototype[Symbol.iterator] = function() {
      var iterator = { next: next };

      var current = this;

      function next() {
        if (current) {
          var value = current.value;
          current = current.next;
          return { done: false, value: value };
        } else {
          return { done: true };
        }
      }
      return iterator;
}

var one = new Obj(1);
var two = new Obj(2);
var three = new Obj(3);

console.log(one);  // Obj { value: 1, next: null }
one.next = two;
console.log(one);  // Obj { value: 1, next: Obj { value: 2, next: null } }
two.next = three;
console.log(one);
/*Obj {
  value: 1,
  next: Obj { value: 2, next: Obj { value: 3, next: null } }
}*/
for (var i of one){
  console.log(i); // 1, 2, 3
}

```

# Iterator用途
（1）yield*:后面跟一个可遍历的结构，会调用该结构的遍历器接口  
```
let generator = function* () {
  yield 1;
  yield* [2,3,4];
  yield 5;
};

var iterator = generator();

iterator.next() // { value: 1, done: false }
iterator.next() // { value: 2, done: false }
iterator.next() // { value: 3, done: false }
iterator.next() // { value: 4, done: false }
iterator.next() // { value: 5, done: false }
iterator.next() // { value: undefined, done: true }
```

（2）其他场合：  
任何接受数组作为参数的场合，其实都调用了遍历器接口：  

    for...of
    Array.from()
    Map(), Set(), WeakMap(), WeakSet()（比如new Map([['a',1],['b',2]])）
    Promise.all()
    Promise.race()

(3)扩展运算符默认调用Iterator:  
```
// 例一
var str = 'hello';
[...str] //  ['h','e','l','l','o']

// 例二
let arr = ['b', 'c'];
['a', ...arr, 'd']
// ['a', 'b', 'c', 'd']
```

# 字符串的Iterator接口
字符串是一个类似数组的对象，也具备Iterator接口  
```
var someString = "hi";
typeof someString[Symbol.iterator]
// "function"

var iterator = someString[Symbol.iterator]();

iterator.next()  // { value: "h", done: false }
iterator.next()  // { value: "i", done: false }
iterator.next()  // { value: undefined, done: true }
```

可以覆盖原生的Symbol.iterator方法，达到修改遍历器行为的目的  
```
var str = new String("hi");

[...str] // ["h", "i"]

str[Symbol.iterator] = function() {
  return {
    next: function() {
      if (this._first) {
        this._first = false;
        return { value: "bye", done: false };
      } else {
        return { done: true };
      }
    },
    _first: true
  };
};

// 扩展字符会默认调用Iterator，所以当Symbol.iterator方法被修改，解析的值也会变化
console.log([...str]) // ["bye"]
// str变成了一个具备Symbol.iterator属性的Symbol类型的值
console.log(str) // [String: 'hi'] { [Symbol(Symbol.iterator)]: [Function] }
console.log(typeof str);  //Object

let iter = str[Symbol.iterator]();
console.log(iter.next());// { value: 'bye', done: false }
```

# Iterator接口和Generator函数：先放着学习了Generator再说
# 遍历器对象的return(),throw()
(1)return():如果for..of循环提前退出(出错或者有break)则会自动调用return()方法  
使用场景：如果一个对象遍历完成前需要清理或者释放资源，则可以部署return()方法  
return方法必须返回一个对象  
```
// 函数接受一个文件对象作为参数，返回一个遍历器对象，该对象中部署了两个方法：next和return
function readLineSync(file){
    return {
        [Symbol.iterator](){
            return {
                next(){
                    return { done:false };
                },
                return(){
                    file.close();
                    return { done:true };
                }
            }
        }
    }
}
```
下面的两种情况均会触发return():  
```
for(let line of readLineSync(filename)){
    console.log(line);
    break; // 存在break
}

for(let line of readLineSync(filename)){
    console.log(line);
    throw new Error();   // 存在错误
}
```

# for...of循环
一个数据结构主要部署了Symbol.iterator属性，就具备了iterator接口，就可以使用for...of遍历它的成员  
比如：Array,Set,Map,类似数组的arguments对象,NodeList对象,Generator对象,字符串  

js中的for..of只能获取键名，eg:对于数组只能获得index  
entries():返回一个遍历器对象，遍历[键名,键值]组成的数组
keys():返回一个遍历器对象,遍历键名
values():返回一个遍历器对象,遍历键值
```
let arr = ['a', 'b', 'c'];
for (let pair of arr.entries()) {
  console.log(pair);
}
// [0, 'a']
// [1, 'b']
// [2, 'c']
```

类似数组的arguments对象：
```
// arguments对象
function printArgs() {
  for (let x of arguments) {
    console.log(x);
  }
}
printArgs('a', 'b');
// 'a'
// 'b'
```

并不是所有类似数组的对象都具有 Iterator接口，一个简便的解决方法，就是使用Array.from方法将其转为数组。  
```
let arrayLike = { length: 2, 0: 'a', 1: 'b' };
for (let x of Array.from(arrayLike)) {
  console.log(x);
}
```

# 与其他遍历方法的比较
forEach方法不能中途退出，break和return命令均不起作用  
```
arr.forEach(function(keys,values){
    console.log(keys,values);
})
```