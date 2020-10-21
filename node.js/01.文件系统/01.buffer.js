/* var str = "hello,world!";
// 将字符串保存到buffer中
var buf = Buffer.from(str);
console.log(buf); //<Buffer 68 65 6c 6c 6f 2c 77 6f 72 6c 64 21>
console.log(buf.length); // 12
console.log(str.length); // 12

var str1 = "hello,世界！";
// 将字符串保存到buffer中
var buf1 = Buffer.from(str1);
console.log(buf1); //<Buffer 68 65 6c 6c 6f 2c e4 b8 96 e7 95 8c ef bc 81>
console.log(buf1.length); // 15：hello, 6字节   世界！ 9字节
console.log(str1.length); // 9 */

var buf = Buffer.alloc(10);
console.log(buf); //<Buffer 00 00 00 00 00 00 00 00 00 00>
/* buf[0] = 1;
buf[13] = 2;
console.log(buf); // <Buffer 01 00 00 00 00 00 00 00 00 00>
buf[3] = 34;
console.log(buf); // <Buffer 01 00 00 22 00 00 00 00 00 00>
console.log(buf[3].toString(2)); // 100010 */

var buf2 = Buffer.allocUnsafe(10);
console.log(buf2);
