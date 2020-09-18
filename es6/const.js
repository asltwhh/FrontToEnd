/*const声明一个只读的常量。一旦声明，常量的值就不能改变。*/

const PI = 3.1415926;
console.log(PI);
// PI = 123;  TypeError: Assignment to constant variable

/* const一旦声明变量，就必须初始化，不能以后再赋值*/
// const a ;  SyntaxError: const常量声明时未初始化

/* 
和let相同，const声明的常量仅在块级作用域中有效
	不存在变量提升
	存在暂时性死区，只能在声明的位置后使用
	不可重复声明
*/

{
	// console.log(b);  b还没有初始化
	const b = 123;
	// var b = 456;  已经声明过了，不可以重复声明
}
// console.log(b);  b is not defined

/* const的本质：
	对于简单类型的数据（数值、字符串、布尔值），值保存在变量指向的内存地址中，const保证该内存地址的内容保持不变

	对于复合类型的数据(主要是对象和数组)，指针保存在变量指向的内存地址中，const保证该内存地址中保存的指针不变，至于指针内的数据是否改变就不能完全控制了
*/

const foo={a:1,b:2};
foo.a = 123;  // 指针的内容可以修改
console.log(foo.a);

// foo = {}  报错，指针地址不能修改


/* 冻结对象：使用Object.freeze(对象)
	不能为对象添加新的属性*/
const f = Object.freeze({a:123});
console.log(f.a);
// 严格模式下报错，非严格模式下不起作用,f并不具备属性b
f.b = 345;
console.log(f.b)  // undefined
console.log(f)  // { a: 123 }