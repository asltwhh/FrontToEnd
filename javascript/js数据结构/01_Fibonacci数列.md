# Fibonacci数列：翻书问题和走台阶问题 
- 共有n个台阶，每次只能上1个台阶或者2个台阶，共有多少种方法爬完台阶。 
- 共有n页书，每次只能翻一页或者两页书，共有多少种方法翻完书。 
- 分析： 
``` 
1个台阶：1种走法 (1)  
2个台阶：2种走法 (1,1)(2) 
3个台阶：3种走法 (1,1,1)(1,2)(2,1) 
4个台阶：5种走法 (1,1,1,1)(2,1,1)(1,2,1)(1,1,2)(2,2) 
5个台阶：8种走法 (1,1,1,1,1)(2,1,1,1)(1,2,1,1)(1,1,2,1)(1,1,1,2)(2,2,1)(2,1,2)(1,2,2)
....
```
- 可以看出这就是一个Fibonacci数列
- n(n>2)个台阶的走法：f(n)=f(n-1)+f(n-2);

#### 1 方法1：
```
function fibonacci(n) {
    if (n == 1) {
        return(1);
    }
    if (n == 2) {
        return 2;
    }
    if (n > 2) {
        return fibonacci(n-1) + fibonacci(n-2);
    }
}
```
- 计算不同n运行的时间
```
console.time('1');
console.log(fibonacci(5));  // 8
console.timeEnd('1');   // 1: 7.430ms


console.time('1');
console.log(fibonacci(35));  // 14930352
console.timeEnd('1');  // 1: 191.629ms
```

- 可以发现时间呈指数形式增加
- 因为f(35) = f(34)+f(33)=f(33)+f(32)+f(32)+f(31)=f(32)+f(31)+f(31)+f(30)+f(31)+f(30)+f(30)+f(29)
    - 等于说它对于每一个n都计算了很多次，所以这样递归当n稍大一些就很慢很慢了
    - 优化：使得每一个n只计算一次
- 我们的优化思路就是不重复计算某一个n的走法数，第一次计算好之后就将其保存好，则就可以避免重复计算了

#### 2 方法2：空间换时间
```
function fibonacci(n) {
    // 创建一个数组保存已经计算的n的结果
    // 初始化这个数组,用0填充
    var result = Array(n+1).fill(0);
    result[1] = 1;
    result[2] = 2;
    for(var i=3; i<n+1; i++) {
        result[i] = result[i-1] + result[i-2];
    }
    return result[n];
}
// 计算不同n运行的时间
console.time('1');
console.log(fibonacci(5));  
console.timeEnd('1');
```

- 计算不同n运行的时间
    - 5：7.901ms
    - 50: 6.127ms
- 可以发现此时极大地节省了时间，此时f(35)=f(34)+f(33),不需要再迭代计算，因为此时f(34)和f(33)已经计算保存在了result中

# 时间复杂度
- 在计算机科学中，时间复杂性，又称时间复杂度，算法的时间复杂度是一个函数，它定性描述该算法的运行时间。
- 使用O表示，是一种粗略的估计,计算时间复杂度主要看循环体执行的次数
- N个数，F(N)
- 赋值：
    - let a = 1; O(1)
    - return 1; O(1)
    - n === 2; O(1)
- O(1) 相对于 O(N)可以忽略
- O(N) 相对于 O(N^2)可以忽略
- O(N^2) 相对于 O(N^3)可以忽略

```
时间复杂度：O(1)+O(1)+O(n-2)*O(1) + O(1) = O(n+1)约等于O(n)
空间复杂度：需要使用一个数组保存结果，所以为O(n+1)

function fibonacci(n) {
    // 创建一个数组保存已经计算的n的结果
    // 初始化这个数组,用0填充
    var result = Array(n+1).fill(0);
    result[1] = 1;  //O(1)
    result[2] = 2;  //O(1)
    // 循环为O(n-2)
    for(var i=3; i<n+1; i++) {
        result[i] = result[i-1] + result[i-2];  //O(1)
    }
    return result[n];  // O(1)
}

```

- 而未被优化的算法的时间复杂度为：

```
时间复杂度O(2^n)
空间复杂度：不需要保存任何结果，为O(1)

function fibonacci(n) {
    if (n == 1) {
        return(1);  //O(1)
    }
    if (n == 2) {
        return 2;   //O(1)
    }
    if (n > 2) {
        return fibonacci(n-1) + fibonacci(n-2);   // 指数级别O(2^n)
    }
}
```
