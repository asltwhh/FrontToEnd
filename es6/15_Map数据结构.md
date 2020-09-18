# Map
JavaScript 的对象（Object），本质上是键值对的集合（Hash 结构），但是传统上只能用字符串当作键。  
为了解决这个问题，ES6 提供了 Map 数据结构。它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键  

    set(键名，键值);
    get(键名);
    has(键名);
    delete(键名);

```
const m = new Map();
const o = {p: 'Hello World'};

m.set(o, 'content')
m.get(o) // "content"

m.has(o) // true
m.delete(o) // true
m.has(o) // false
```

Map 也可以接受一个数组作为参数。该数组的成员是一个个表示键值对的数组。

```
const map = new Map([
  ['name', '张三'],
  ['title', 'Author']
]);

map.size // 2
map.has('name') // true
map.get('name') // "张三"
map.has('title') // true
map.get('title') // "Author"
```

如果对同一个键多次赋值，后面的值将覆盖前面的值。
```
const map = new Map();

map
.set(1, 'aaa')
.set(1, 'bbb');

map.get(1) // "bbb"
```

如果读取一个未知的键，则返回undefined。
```
new Map().get('asfddfsasadf')
// undefined
```

Map结构的实例有以下属性和操作方法：

    size属性返回 Map 结构的成员总数
    Map.prototype.set(key, value)
        set方法返回的是当前的Map对象，因此可以采用链式写法
    Map.prototype.get(key)
        如果找不到key，返回undefined
    Map.prototype.has(key)
        返回一个布尔值，表示某个键是否在当前 Map 对象之中
    Map.prototype.delete(key)
        删除某个键，返回true。如果删除失败，返回false。
    Map.prototype.clear()
        清除所有成员，没有返回值。

```
let map = new Map()
  .set(1, 'a')
  .set(2, 'b')
  .set(3, 'c');
console.log(map); // Map { 1 => 'a', 2 => 'b', 3 => 'c' }
```

# 遍历方法：
Map 结构原生提供三个遍历器生成函数和一个遍历方法。

    Map.prototype.keys()：返回键名的遍历器。
    Map.prototype.values()：返回键值的遍历器。
    Map.prototype.entries()：返回所有成员的遍历器。
    Map.prototype.forEach()：遍历 Map 的所有成员。

```
const map = new Map([
  ['F', 'no'],
  ['T',  'yes'],
]);

for (let key of map.keys()) {
  console.log(key);
}
// "F"
// "T"

for (let value of map.values()) {
  console.log(value);
}
// "no"
// "yes"

for (let item of map.entries()) {
  console.log(item[0], item[1]);
}
// "F" "no"
// "T" "yes"

// 或者
for (let [key, value] of map.entries()) {
  console.log(key, value);
}
// "F" "no"
// "T" "yes"

// 等同于使用map.entries()
for (let [key, value] of map) {
  console.log(key, value);
}
// "F" "no"
// "T" "yes"
```

Map 结构转为数组结构，比较快速的方法是使用扩展运算符（...）
```
const map = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'three'],
]);

[...map.keys()]
// [1, 2, 3]

[...map.values()]
// ['one', 'two', 'three']

[...map.entries()]
// [[1,'one'], [2, 'two'], [3, 'three']]

[...map]
// [[1,'one'], [2, 'two'], [3, 'three']]
```

结合数组的map方法、filter方法，可以实现 Map 的遍历和过滤
先将map转换为数组结构
```
const map0 = new Map()
  .set(1, 'a')
  .set(2, 'b')
  .set(3, 'c');

const map1 = new Map(
  [...map0].filter(([k, v]) => k < 3)
);
// 产生 Map 结构 {1 => 'a', 2 => 'b'}

const map2 = new Map(
  [...map0].map(([k, v]) => [k * 2, '_' + v])
    );
// 产生 Map 结构 {2 => '_a', 4 => '_b', 6 => '_c'}
```

Map 还有一个forEach方法，与数组的forEach方法类似
```
map.forEach(function(value, key, map) {
  console.log("Key: %s, Value: %s", key, value);
});
```

forEach方法还可以接受第二个参数，用来绑定this。
```
forEach方法的回调函数的this，就指向reporter
let map = new Map([[1,2],[3,4]]);
const reporter = {
  report: function(key, value) {
    console.log("Key: %s, Value: %s", key, value);
  }
};

map.forEach(function(value, key, map) {
  this.report(key, value);
}, reporter);

/*
Key: 1, Value: 2
Key: 3, Value: 4
 */
```

# Map转换为其他数据结构

1 Map转为数组：[...Map]  
2 数组转为Map:new Map(array)  
3 Map转为对象：
```
let strMap = new Map();
let obj = Object.create(null);
for (let [k,v] of strMap) {
    obj[k] = v;
}
```

4 对象转为Map
```
let obj = {"a":1, "b":2};
let map = new Map(Object.entries(obj));
```

5 Map转为JSON：  
(1)Map的键名都是字符串，可以转为对象JSON
```
let myMap = new Map().set('yes', true).set('no', false);
JSON.stringify(strMapToObj(strMap))
// '{"yes":true,"no":false}'
```
(2)Map的键名有非字符串，可以转为数组JSON
```
function mapToArrayJson(map) {
  return JSON.stringify([...map]);
}

let myMap = new Map().set(true, 7).set({foo: 3}, ['abc']);
mapToArrayJson(myMap)
// '[[true,7],[{"foo":3},["abc"]]]'
```

# WeakMap 
结构与Map结构类似，也是用于生成键值对的集合  
WeakMap与Map的区别有两点:  

    1 WeakMap只接受对象作为键名（null除外）
    2 WeakMap的键名所指向的对象，不计入垃圾回收机制。

WeakMap只有四个方法可用：get()、set()、has()、delete()。