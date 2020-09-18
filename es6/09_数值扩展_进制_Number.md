# 二进制和八进制表示法

es5：

    二进制前缀：0b  ,仅火狐和chrome支持
    八进制前缀:0

es6:

    二进制前缀：0b,0B
    八进制前缀：0o,0O

在严格模式下，不允许使用0表示八进制

```
console.log(0b111)
console.log(0o111)
/*
7
73
 */
```

# Number.isNaN(),NUmber.isFinite()

Number.isFinite():检测一个值是否是有限的，不是Infinity
```
// 参数类型不是Number,检测结果均为false
console.log(Number.isFinite(NaN)); // false
console.log(Number.isFinite(Infinity));  // false
console.log(Number.isFinite(-Infinity));  // false
console.log(Number.isFinite('foo')); // false
console.log(Number.isFinite('14')); // false
console.log(Number.isFinite(true)); // false

console.log(Number.isFinite(14)); // true
```

Number.isNaN():检测一个值是否为NaN
```
// 参数类型不是NaN,检测结果均为false,不会做类型转换
console.log(Number.isNaN(NaN)); // true
console.log(Number.isNaN(9/NaN));  // true

console.log(Number.isNaN("NaN"));  // false

console.log(Number.isNaN('true'/0)); // true
console.log(Number.isNaN('true'/'true'));  // true
```

全局函数：isFinite(),isNaN():会先调用Number()方法进行数据类型转换，再检测

# Number.parseInt(),Number.parseFloat();

es6将这两个方法直接给到了类Number中，用法完全一致，只是为了减少全局性的方法

    Number.parseInt === parseInt    // true
    Number.parseFloat === parseFloat  // true

# Number.isInteger()

判断一个数是否是整数

    需要注意的是：在js中整数和浮点数采用相同的存储方法，所以25和25。0被认为是同一个值
        Number.isInteger(25) == Number.isInteger(25.00000000);
    其余，如果参数不是数值，则返回false,不会做类型转换

另外，如果小数的精度达到了小数点后的16个十进制位，则会被认为是整数

    Number.isInteger(3.0000000000000002);  // true

如果一个数的绝对值小于Number.MIN_VALUE(5E-324)的精确度，则会认为是0

    console.log(Number.isInteger(5E-325));  // true

# Number.EPSILON
Number.EPSILON:es6中新增加的一个极小的常量，表示1与大于1的最小浮点数之间的差,也就是js可以表示的最小精度，等于2的-52次方

```
console.log(Number.EPSILON); // 2.220446049250313e-16
console.log(Number.EPSILON === Math.pow(2,-52));  //true 
```

引入这个值是为了在计算浮点数时，设置一个误差范围

```
console.log(0.1+0.2);  // 0.30000000000000004
console.log(0.1+0.2 === 0.3);  // false
function sum (a,b,c) {
    if(a+b - c <= Number.EPSILON){
        return true;
    }
    return false;
}
console.log(sum(0.1,0.2,0.3));   // true
```

# 安全整数和Number.isSafeInteger();

js可以准确表示出(-2^53,2^53)范围内的整数,超出这个范围则不能正确表示

```
console.log(Math.pow(2,53));
console.log(Math.pow(2,53)+1);
/*
9007199254740992
9007199254740992
 */
```

es引入了两个常量：Number.MAX_SAFE_NUMBER和Number.MIN_SAFE_NUMBER

    Number.MAX_SAFE_NUMBER = Math.pow(2,52)-1
    Number.MIN_SAFE_NUMBER = Math.pow(2.-52)+1

Number.isSafeInteger():判断一个数是否处于这个范围内

```
Number.isSafeInteger('a') // false
Number.isSafeInteger(null) // false
Number.isSafeInteger(NaN) // false
Number.isSafeInteger(Infinity) // false
Number.isSafeInteger(-Infinity) // false

Number.isSafeInteger(3) // true
Number.isSafeInteger(1.2) // false
Number.isSafeInteger(9007199254740990) // true
Number.isSafeInteger(9007199254740992) // false

Number.isSafeInteger(Number.MIN_SAFE_INTEGER - 1) // false
Number.isSafeInteger(Number.MIN_SAFE_INTEGER) // true
Number.isSafeInteger(Number.MAX_SAFE_INTEGER) // true
Number.isSafeInteger(Number.MAX_SAFE_INTEGER + 1) // false
```

实际使用这个函数时，需要注意。验证运算结果是否落在安全整数的范围内，不要只验证运算结果，而要同时验证参与运算的每个值。
```
Number.isSafeInteger(9007199254740993)
// false,不是安全整数，会以9007199254740992的形式存储
Number.isSafeInteger(990)
// true
Number.isSafeInteger(9007199254740993 - 990)
// true
9007199254740993 - 990
// 返回结果 9007199254740002
// 正确答案应该是 9007199254740003
```
