# Symbol:
es6引入的一种新的原始数据类型，表示独一无二的值，是js的第七种数据类型

    Symbol值通过symbol函数生成，将Symbol类型的值作为对象的属性名，就不会产生属性名冲突的尴尬

Symbol()函数接受一个字符串作为参数，表示对于Symbol实例的描述，区分各个值

```
let s = Symbol('a');
console.log(s);  // Symbol(a)
console.log(typeof s)  //symbol
```

使用同一个字符串描述两个Symbol实例，得到的结果也是不同的

```
let s = Symbol('a');
let s1 = Symbol('a');
console.log(s);  // Symbol(a)
console.log(s1);  //Symbol(a)
console.log(s === s1);  // false
```

如果 Symbol 的参数是一个对象，就会调用该对象的toString方法，将其转为字符串，然后才生成一个 Symbol 值。
```
const obj = {
  toString() {
    return 'abc';
  }
};
const sym = Symbol(obj);
sym // Symbol(abc)
```

Symbol 值可以显式转为字符串。
```
let sym = Symbol('My symbol');

String(sym) // 'Symbol(My symbol)'
sym.toString() // 'Symbol(My symbol)'
```

Symbol值可以转换为布尔值。但是不能转换为数值
```
let sym = Symbol();
Boolean(sym) // true
!sym  // false

Number(sym) // TypeError
sym + 2 // TypeError
```

# 2 Symbol.prototype.description

创建Symbol时添加描述
```
const sym = Symbol('foo');
```

读取描述需要将Symbol显式转换为字符串
```
const sym = Symbol('foo');
String(sym);  //'Symbol(foo)'
sym.toString() // "Symbol(foo)"
```

直接使用description属性读取,可以得到直接的描述：
```
sym.description; // 'foo'
```

# 3 作为属性名的Symbol
由于每一个 Symbol 值都是不相等的，这意味着 Symbol 值可以作为标识符，用于对象的属性名，就能保证不会出现同名的属性。
```
let mySymbol = Symbol();

// 第一种写法
let a = {};
a[mySymbol] = 'Hello!';

// 第二种写法
let a = {
  [mySymbol]: 'Hello!'
};

// 第三种写法
let a = {};
Object.defineProperty(a, mySymbol, { value: 'Hello!' });

// 以上写法都得到同样结果
a[mySymbol] // "Hello!"
```

注意：Symbol值作为对象属性时，不能使用点运算符，必须使用[]

# Symbol属性名的遍历:Object.getOwnPropertySymbols()
Symbol作为属性名，但是在for..in,for..of循环、Objects.keys(),Object.getOwnPropertyNames(),JSON.Stringigy()中均会将其忽略掉，只能通过Object.getOwnPropertySymbols()方法获取指定对象的所有Symbol属性名

    这个方法会返回一个数组，成员是当前对象的所有用作属性名的Symbol值

```
const obj = {};
let a = Symbol('a');
let b = Symbol('b');

obj[a] = 'Hello';
obj[b] = 'World';

const objectSymbols = Object.getOwnPropertySymbols(obj);

objectSymbols
// [Symbol(a), Symbol(b)]
```

Reflect.ownKeys():可以返回所有类型的键名，包括常规键名和Symbol键名

```
let obj = {
  [Symbol('my_key')]: 1,
  enum: 2,
  nonEnum: 3
};

Reflect.ownKeys(obj)
//  ["enum", "nonEnum", Symbol(my_key)]
```

# Symbol.for(str)
它接受一个字符串作为参数，然后搜索有没有以该参数作为名称的 Symbol 值。如果有，就返回这个Symbol值，否则就新建一个以该字符串为名称的 Symbol 值，并将其注册(登记)到全局。
```
let s1 = Symbol.for('foo');
let s2 = Symbol.for('foo');

s1 === s2 // true,都是由同样参数的Symbol.for方法生成的，所以实际上是同一个值。
```

Symbol.for()与Symbol()这两种写法，都会生成新的 Symbol。它们的区别是，前者会被登记在全局环境中供搜索，后者不会。Symbol.for()不会每次调用就返回一个新的 Symbol 类型的值，而是会先检查给定的key是否已经存在，如果不存在才会新建一个值。
```
Symbol.for("bar") === Symbol.for("bar")
// true

Symbol("bar") === Symbol("bar")
// false
```

# Symbol.keyFor()
返回一个已登记的Symbol类型值的key
```
let s1 = Symbol.for("foo");
Symbol.keyFor(s1) // "foo"

let s2 = Symbol("foo");
Symbol.keyFor(s2) // undefined,变量s2属于未登记的Symbol值
```

# 内置的Symbol值

### 1 Symbol.hasInstance
对象的Symbol.hasInstance属性，指向一个内部方法。当其他对象使用instanceof运算符，判断是否为该对象的实例时，会调用这个方法。
```
foo instanceof Foo
相当于：
Foo[Symbol.hasInstance](foo)
```

### 2 Symbol.isConcatSpreadable
对象的Symbol.isConcatSpreadable属性等于一个布尔值，表示该对象用于Array.prototype.concat()时，是否可以展开。

    数组的默认行为是可以展开，Symbol.isConcatSpreadable默认等于undefined。该属性等于true时，也有展开的效果。

```
let arr1 = ['c', 'd'];
['a', 'b'].concat(arr1, 'e') // ['a', 'b', 'c', 'd', 'e']
arr1[Symbol.isConcatSpreadable] // undefined,默认值

let arr2 = ['c', 'd'];
arr2[Symbol.isConcatSpreadable] = false; //为false时不展开
['a', 'b'].concat(arr2, 'e') // ['a', 'b', ['c','d'], 'e']
```

类似数组的对象正好相反，默认不展开。它的Symbol.isConcatSpreadable属性设为true，才可以展开。
```
let obj = {length: 2, 0: 'c', 1: 'd'};
['a', 'b'].concat(obj, 'e') // ['a', 'b', obj, 'e']

obj[Symbol.isConcatSpreadable] = true;
['a', 'b'].concat(obj, 'e') // ['a', 'b', 'c', 'd', 'e']
```

### Symbol.species
指向一个构造函数。创建衍生对象时，会使用该属性。
```
class MyArray extends Array {
}

const a = new MyArray(1, 2, 3);
// b,c属于衍生对象，就不是MyArray的实例，但是由于它本身是一个数组，所以应该是Array的实例,但是这里发现b,c同样是MyArray的实例
const b = a.map(x => x);
const c = a.filter(x => x > 1);

console.log(a)  // MyArray(3) [ 1, 2, 3 ]
console.log(b)  // MyArray(3) [ 1, 2, 3 ]
console.log(c)  // MyArray(2) [ 2, 3 ]
```

就需要修改，使用这个属性,就可以对于衍生对象的错误进行调整了：
```
class MyArray extends Array {
  static get [Symbol.species]() { return Array; }
}

const a = new MyArray(1,2,3);
const b = a.map(x => x);
console.log(a)  // MyArray(3) [ 1, 2, 3 ]
console.log(b)  // [ 1, 2, 3 ]
```

### Symbol.match
指向一个函数。当执行str.match(myObject)时，如果该属性存在，会调用它，返回该方法的返回值。
```
class MyMatcher {
  [Symbol.match](string) {
    return 'hello world'.indexOf(string);
  }
}

'e'.match(new MyMatcher()) // 1
```

### Symbol.replace()

指向一个方法，当该对象被String.prototype.replace方法调用时，会返回该方法的返回值。
```
String.prototype.replace(searchValue, replaceValue)
// 等同于
searchValue[Symbol.replace](this, replaceValue)
```

### Symbol.search()
指向一个方法，当该对象被String.prototype.search方法调用时，会返回该方法的返回值。
```
String.prototype.search(regexp)
// 等同于
regexp[Symbol.search](this)
```

### Symbol.split
指向一个方法，当该对象被String.prototype.split方法调用时，会返回该方法的返回值。
```
String.prototype.split(separator, limit)
// 等同于
separator[Symbol.split](this, limit)
```

### Symbol.iterator
指向该对象的默认遍历器方法。
```
const myIterable = {};
myIterable[Symbol.iterator] = function* () {
  yield 1;
  yield 2;
  yield 3;
};

[...myIterable] // [1, 2, 3]
```
