var fs = require("fs");

// 同步文件的写入
var fd = fs.openSync("hello.txt", "w");
console.log(fd); // 随机返回的值：3
//此时在该目录下就会出现一个hello.txt,文件内容为：今天天气好晴朗
fs.writeSync(fd, "今天天气好晴朗");
//再添加一句：在文件的第30个字节处添加新的内容
fs.writeSync(fd, "今天天气好晴朗", 30);
fs.closeSync(fd);

// 文件的最终结果：今天天气好晴朗         今天天气好晴朗
