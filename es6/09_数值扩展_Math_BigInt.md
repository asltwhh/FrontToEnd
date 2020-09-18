# Math对象的扩展
es6在Math对象的基础上新增加了17个与数学相关的方法，均只能在Math对象上调用

### Math.trunc()：
去除一个数的小数部分，返回整数部分

    数值类型：直接去除
    非数值类型：先使用Number()转换为数值类型，再去除

```
    console.log(Math.trunc(12.34));
    console.log(Math.trunc('12.34'))
```

    对于空值或者无法截取整数的值，则直接返回NaN

```
console.log(Math.trunc());//NaN
console.log(Math.trunc('foo'));//NaN
```

### Math.sign()
用来判断一个数到底是正数，负数还是0，非数值对象会使用Number()函数先转换为数值类型

    返回值类型：
        参数为正数：返回1
        负数：-1
        正负0：0
        其他值：NaN


### Math.cbrt()
计算一个数的立方根：非数值对象会使用Number()函数先转换为数值类型

### Math.clz32(参数)
将参数转换为32位无符号整数的形式，然后返回这个32位值里面有多少个前导0

    非数值对象会使用Number()函数先转换为数值类型

```
Math.clz32(0) // 32
Math.clz32(1) // 31
Math.clz32(1000) // 22
Math.clz32(0b01000000000000000000000000000000) // 1
Math.clz32(0b00100000000000000000000000000000) // 2
```

对于小数，该方法只考虑整数部分
```
Math.clz32(3.2) // 30
Math.clz32(3.9) // 30
```

### Math.imul()
返回两个数以32位带符号整数形式相乘的结果，返回的也是一个32位的带符号整数
```
Math.imul(2, 4)   // 8
Math.imul(-1, 8)  // -8
Math.imul(-2, -2) // 4
```

### Math.fround()
返回一个数的32位单精度浮点数形式

    主要是将64位的双精度浮点数转为32位单精度浮点数，如果小数的精度超过24个二进制位，返回值就会不同于原值，否则返回值不变

### Math.hypot(参数1,参数2,...)
返回所有参数的平方和的平方根

    如果参数不是数值类型，则先转换
    只要有一个参数不是数值，返回NaN

```
Math.hypot(3, 4, 'foo'); // NaN
Math.hypot(3, 4, '5');   // 7.0710678118654755
Math.hypot(-3);          // 3
```

### 对数方法:不是数值类型先调用Number()

    Math.exppm1():返回e^x-1
    Math.log1p():返回1+x的自然对数log(1+x)，如果x小于-1则返回NaN
    Math.log10():返回以10为底的x的对数
    Math.log2():返回以2为底的x的对数

### 双曲函数方法

    Math.sinh(x) 返回x的双曲正弦（hyperbolic sine）
    Math.cosh(x) 返回x的双曲余弦（hyperbolic cosine）
    Math.tanh(x) 返回x的双曲正切（hyperbolic tangent）
    Math.asinh(x) 返回x的反双曲正弦（inverse hyperbolic sine）
    Math.acosh(x) 返回x的反双曲余弦（inverse hyperbolic cosine）
    Math.atanh(x) 返回x的反双曲正切（inverse hyperbolic tangent）

### 指数运算

es6新增运算符:**

    x**y表示x的y次幂
    **=：x**=y指的是给x重新赋值为x的y次幂

### BigInt数据类型
BigInt只表示整数，没有位数限制，任何位数的整数均可以精确表示

    BigInt类型的数据必须添加后缀n,和普通的Integer类型作区分

```
// 对于a，b相乘，普通整数无法保持结果的精度，而BigInt类型可以
const a = 2172141653n;
const b = 15346349309n;
console.log(a*b);  //33334444555566667777n
console.log(2172141653 * 15346349309);  //33334444555566670000
```

BigInt与普通整数是两种值，它们之间并不相等

    42n === 42;// false

typeof运算符对于 BigInt 类型的数据返回bigint

    typeof 123n // 'bigint'

BigInt可以使用负号（-），但是不能使用正号（+）

    -42n // 正确
    +42n // 报错

其他类型的值转换为BitInt类型：BitInt()

    用法与Number()一致

将BitInt类型的值转为其他类型：

    Boolean();Number();String()等等，以及其他的隐式转换方法

BitInt类型存在+-*,**,并且用法和Number类型一致。但是除法运算/会舍掉小数部分，只返回整数

```
console.log(3n/2n);//1n
console.log(3/2)//1.5
```




