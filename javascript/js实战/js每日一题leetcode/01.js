var divide = function(dividend, divisor) {
    if(dividend == 0) return 0;
    var f = 1;
    // 先判断被除数与除数的符号，确定商的符号
    if((dividend < 0 && divisor > 0) || (dividend > 0 && divisor < 0)) f = -1;
    // 将被除数与除数均转化为正数，方便计算
    divisor = Math.abs(divisor);
    dividend = Math.abs(dividend);
    // 记录结果
    var res = 0;
    while(dividend >= divisor){
        var t = divisor;
        // 记录累加的次数
        var temp = 1;
        while(dividend >= t){
            // dividend不断减小，减去除数的倍数
            dividend -= t;
            // 记录累加的次数
            temp += temp;
            // 记录累加的结果
            t += t;
        }
        res += (temp - 1);
        if(res > 2147483647) {
            if(f == 1) return 2147483647;
            else return -2147483648;
        }
    }
    return res * f;
};
console.log(divide(51,3))