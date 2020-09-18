# 50 pow(x,n)

- 思想：分而治之
- 例如对于2^10(n=10,偶数)
    - 可以分为2^5,2^5(2^(10/2)),然后n变成了5，奇数
    - 然后又可以分为2^2*2,2^2*2    x^(5/2)*x
    - 然后又可以...
- 总之就是将其不断分解，利用递归的方法 

```
var myPow = function(x,n){
    function pow(x,n){
        if(n === 1){
            return x;
        }
        if(n % 2 === 0){
            let half = mypow(x,n/2);
            return half*half;
        }else{
            let half = mypow(x,n/2);
            return half*half*x;
        }
    }

    if(n === 0 || x === 1){
        return 1;
    }
    if(n < 0){
        return 1/pow(x,n);
    }
    return pow(x,n);
}

```
