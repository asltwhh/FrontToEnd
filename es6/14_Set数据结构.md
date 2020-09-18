# Set
es6提供的新的数据结构，类似于数组，但是成员的值是唯一的，没有重复的值

    Set本身提供了一个构造函数，用来生成set数据结构
    初始化一个空集合：
        const s = new Set();
    使用数组初始化集合：
        const s = new Set([1,2,3,4,5,5,5,5,8])

```
const s = new Set();
console.log(s);   // Set {}
[1,2,3,4,5,6,1,2,3,3,3,3].forEach(x => s.add(x));
for (let i of s){
    console.log(i);
}
// 1 2 3 4 5 6

const set = new Set(document.querySelectorAll('div'));
```

数组去重：
```
[...new Set(array)]
Array.from(new Set(array))
```

字符串去重：
```
console.log([...new Set('ababbc')]);//[ 'a', 'b', 'c' ]
console.log([...new Set('ababbc')].join('')); //'abc'
```

size:集合中成员的数量  
add(value):添加值，返回Set结构本身  
delete(value):删除某个值，返回一个布尔值，表示是否成功删除  
has(value):集合中是否存在value  
clear():清空集合，没有返回值  

```
s.add(1).add(2).add(2);
s.size; // 2
s.has(1);//true
s.has(3) // false

s.delete(2);
s.has(2) // false
```

将set转换为数组：
```
Array.from(set);
```

# 遍历操作

Set 结构的实例有四个遍历方法，可以用于遍历成员。

    Set.prototype.keys()：返回键名的遍历器
    Set.prototype.values()：返回键值的遍历器
    Set.prototype.entries()：返回键值对的遍历器
    Set.prototype.forEach()：使用回调函数遍历每个成员

Set 键名和键值是一个值
```
let set = new Set(['red', 'green', 'blue']);

for (let item of set.keys()) {
  console.log(item);
}
// red
// green
// blue

for (let item of set.values()) {
  console.log(item);
}
// red
// green
// blue

for (let item of set.entries()) {
  console.log(item);
}
// ["red", "red"]
// ["green", "green"]
// ["blue", "blue"]
```

forEach(回调函数):对每个成员执行某种操作，没有返回值。
```
let set = new Set([1, 4, 9]);
set.forEach((value, key) => console.log(key + ' : ' + value))
// 1 : 1
// 4 : 4
// 9 : 9
```

数组的map和filter方法也可以间接用于 Set 了,先使用[...set]将集合转换为数组，再进行操作
```
let set = new Set([1, 2, 3]);
set = new Set([...set].map(x => x * 2));
// 返回Set结构：{2, 4, 6}

let set = new Set([1, 2, 3, 4, 5]);
set = new Set([...set].filter(x => (x % 2) == 0));
// 返回Set结构：{2, 4}
```

# WeakSet
结构与 Set 类似，也是不重复的值的集合。但是，它与 Set 有两个区别

    1 WeakSet 的成员只能是对象，而不能是其他类型的值
    2 WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用，也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于 WeakSet 之中。

使用new命令，创建 WeakSet 数据结构
```
const ws = new WeakSet();
```

作为构造函数，WeakSet可以接受一个数组或类似数组的对象作为参数
```
const a = [[1, 2], [3, 4]];
const ws = new WeakSet(a);
// WeakSet {[1, 2], [3, 4]}
```

WeakSet 结构有以下三个方法。

    WeakSet.prototype.add(value)：向 WeakSet 实例添加一个新成员。
    WeakSet.prototype.delete(value)：清除 WeakSet 实例的指定成员。
    WeakSet.prototype.has(value)：返回一个布尔值，表示某个值是否在

```
const ws = new WeakSet();
const obj = {};
const foo = {};

ws.add(window);
ws.add(obj);

ws.has(window); // true
ws.has(foo);    // false

ws.delete(window);
ws.has(window);    // false
```

WeakSet 没有size属性，没有办法遍历它的成员