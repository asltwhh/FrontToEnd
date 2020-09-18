# proxy
修改用户的某些默认行为  
可以理解为在目标对象之前架设一层“拦截”，外界对该对象的访问，都得经过这层拦截，所以提供了一种机制，对外界的访问进行过滤和改写  

```
对一个空对象设置拦截：
    重新定义属性的读取get和设置set行为(可以设置多个拦截操作)，获取或给该对象设置属性时就会发生变化

var obj = new Proxy({}, {
  get: function (target, propKey, receiver) {
    console.log(`getting ${propKey}!`);
    return Reflect.get(target, propKey, receiver);
  }, // 注意不同的拦截操作之间使用逗号隔开，这里的形式就是在定义对象的基础上添加了一层拦截装置，所以格式还是定义对象的格式
  set: function (target, propKey, value, receiver) {
    console.log(`setting ${propKey}!`);
    return Reflect.set(target, propKey, value, receiver);
  }
});
obj.count = 1;  // setting count!
console.log(obj.count);  // getting count!    1

```

ES6 原生提供 Proxy 构造函数，用来生成 Proxy 实例。
```
var proxy = new Proxy(target, handler);
    target参数表示所要拦截的目标对象
    handler参数也是一个对象，用来定制拦截行为。
```

```
var proxy = new Proxy({}, {
    // get方法的两个参数分别是目标对象和所要访问的属性。可以看到，由于拦截函数总是返回35，所以访问任何属性都得到35。
  get: function(target, propKey) {
    return 35;
  }
});

proxy.time // 35
proxy.name // 35
proxy.title // 35
```

如果handler没有设置任何拦截，那就等同于直接通向原对象,但是两者的地址不同
```
var target = {};
var proxy = new Proxy(target,{});
proxy.name = 'doa';
console.log(target.name);  // doa
console.log(proxy);  // { name: 'doa' }
console.log(target);  // { name: 'doa' }
console.log(proxy == target);  // false
```

Proxy 实例也可以作为其他对象的原型对象。
```
var proxy = new Proxy({}, {
  get: function(target, propKey) {
    return 35;
  }
});
// 将proxy作为obj对象的原型对象
let obj = Object.create(proxy);
obj.time // 35
```

# Proxy实例的方法

1 get(target, propKey, receiver)  
    拦截对象属性的读取，比如proxy.foo和proxy['foo']  

如果访问目标对象不存在的属性，会抛出一个错误。如果没有这个拦截函数，访问不存在的属性，只会返回undefined。
```
var person = {
    name:'张三'
};

var proxy = new Proxy(person,{
    get : function(target,propKey){
        if (propKey in target){
            return target[propKey];
        }else{
            throw new ReferenceError("Prop name \"" + propKey + "\" does not exist.");
        }
    }
});

console.log(proxy.name); // 张三
// console.log(proxy.age);  // ReferenceError: Prop name "age" does not exist.
console.log(person.name);  // 张三
console.log(person.age); // undefined
```

2 set(target,propKey,value)  
set方法用来拦截某个属性的赋值操作，可以接受四个参数，依次为目标对象、属性名、属性值和 Proxy 实例本身，其中最后一个参数可选。  
```
var person = {
    name:'张三',
    age:13
};

var proxy = new Proxy(person,{
    set : function(target,propKey,value){
        // 先判断属性名正确不
        if (propKey == 'age'){
            // 如果age不是整数或者age>200均报错
            if (!Number.isInteger(value)){
                throw new TypeError('The age is not an integer');
            }else if (value > 200){
                throw new RangeError('The age seems invalid');
            }
            // 其余则给age正常赋值
            console.log('setting');
            target[propKey] = value;
        }
    }
});

console.log(proxy.age);  // 13
proxy.age = 134;  // setting
console.log(proxy.age);  // 134
```

3 apply(target,this,目标对象的参数数组)  
```
var handler = {
  apply (target, ctx, args) {
    return Reflect.apply(...arguments);
  }
};
```

```
var target = function () { return 'I am the target'; };
var handler = {
  apply: function () {
    return 'I am the proxy';
  }
};

var p = new Proxy(target, handler);
// 变量p是 Proxy 的实例，当它作为函数调用时（p()），就会被apply方法拦截，返回一个字符串。
p()
// "I am the proxy"
```

4 has(目标对象,需查询的属性名)  
拦截HasProperty操作，即判断对象是否具有某个属性时，这个方法会生效。典型的操作就是in运算符。  
```
使用has方法隐藏某些属性，不被in运算符发现
var handler = {
  has (target, key) {
    // 如果原对象的属性名的第一个字符是下划线，proxy.has就会返回false
    if (key[0] === '_') {
      return false;
    }
    return key in target;
  }
};
var target = { _prop: 'foo', prop: 'foo' };
var proxy = new Proxy(target, handler);
// in运算符会被has方法拦截
'_prop' in proxy // false
'prop' in proxy  // true
```

如果原对象不可配置或者禁止扩展，这时has拦截会报错。
```
var obj = { a: 10 };
Object.preventExtensions(obj);

var p = new Proxy(obj, {
   has: function(target, prop) {
        if (prop == 'a'){
            return false;
        }
        return true;
   }
});

console.log('a' in p) // TypeError
```

5 construct(target,构造函数的参数对象,newTarget)  
拦截new命令，下面是拦截对象的写法  
```
var p = new Proxy(function () {}, {
  construct: function(target, args) {
    console.log('called: ' + args.join(', '));
    return { value: args[0] * 10 };
  }
});

console.log((new p(1,2,3)).value);  // called: 1, 2, 3
1
// 10
```

6 deleteProperty()  
拦截delete操作，如果这个方法抛出错误或者返回false，当前属性就无法被delete命令删除。
```
var handler = {
  deleteProperty (target, key) {
    if (key[0] === '_') {
        // 如果想要删除的属性的第一个字符为_则报错
        throw new Error(`Invalid attempt`);
    }
    delete target[key];
    return true;
  }
};

var target = { _prop: 'foo',prop: 'f'};
var proxy = new Proxy(target, handler);
delete proxy.prop
console.log(proxy.prop); // undefined
console.log(proxy._prop);  // foo
```

7 defineProperty(target, key, descriptor)

拦截了Object.defineProperty()操作  
```
var handler = {
  defineProperty (target, key, descriptor) {
    // 方法内部没有任何操作，只返回false，导致添加新属性总是无效
    return false;
  }
};
var target = {};
var proxy = new Proxy(target, handler);
proxy.foo = 'bar' // 不会生效
```

8 getPrototypeOf()
拦截获取对象原型。具体来说，拦截下面这些操作  

    Object.prototype.__proto__
    Object.prototype.isPrototypeOf()
    Object.getPrototypeOf()
    Reflect.getPrototypeOf()
    instanceof

```
var proto = {};
var p = new Proxy({}, {
  getPrototypeOf(target) {
    return proto;
  }
});
Object.getPrototypeOf(p) === proto // true
```

9 isExtensible()  
拦截Object.isExtensible()操作  
```
var p = new Proxy({}, {
  isExtensible: function(target) {
    console.log("called");
    return true;
  }
});

Object.isExtensible(p)
// "called"
// true
```

10 ownKeys()  
拦截对象自身属性的读取操作。具体来说，拦截以下操作。

    Object.getOwnPropertyNames()
    Object.getOwnPropertySymbols()
    Object.keys()
    for...in循环

```
let target = {
  a: 1,
  b: 2,
  c: 3
};

let handler = {
  ownKeys(target) {
    return ['a'];
  }
};

let proxy = new Proxy(target, handler);
// 拦截了对于target对象的Object.keys()操作，只返回a、b、c三个属性之中的a属性。
Object.keys(proxy)
// [ 'a' ]
```

11 preventExtensions()  
拦截Object.preventExtensions()。该方法必须返回一个布尔值，否则会被自动转为布尔值  
这个方法有一个限制，只有目标对象不可扩展时,proxy.preventExtensions才能返回true  

12 setPrototypeOf()  
拦截Object.setPrototypeOf()方法  
```
只要修改target的原型对象，就会报错
var handler = {
  setPrototypeOf (target, proto) {
    throw new Error('Changing the prototype is forbidden');
  }
};
var proto = {};
var target = function () {};
var proxy = new Proxy(target, handler);
Object.setPrototypeOf(proxy, proto);
// Error: Changing the prototype is forbidden
```

# 3 Proxy.revocable()
返回一个可取消的 Proxy 实例。  
```
let target = {};
let handler = {};
// Proxy.revocable()方法返回一个对象，该对象的proxy属性是Proxy实例，revoke属性是一个函数，可以取消Proxy实例。
let {proxy, revoke} = Proxy.revocable(target, handler);

proxy.foo = 123;
proxy.foo // 123
// 当执行revoke函数之后，再访问Proxy实例，就会抛出一个错误
revoke();
proxy.foo // TypeError: Revoked
```

# 4 this问题
在Proxy代理的情况下，目标对象内部的this关键字会指向Proxy代理
```
const target = {
  m: function () {
    console.log(this === proxy);
  }
};
const handler = {};

const proxy = new Proxy(target, handler);
// 一旦proxy代理target.m，后者内部的this就是指向proxy，而不是target
target.m() // false
proxy.m()  // true
```

有些原生对象的内部属性，只有通过正确的this才能拿到，所以 Proxy 也无法代理这些原生对象的属性
