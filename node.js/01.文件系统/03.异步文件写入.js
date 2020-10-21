var fs = require("fs");
fs.open("hello1.txt", "w", function (err, fd) {
  console.log(arguments);
  /* 
  // 两个参数，第一个参数为err,为null表示没出错
  // 第二个参数是文件的描述符
    [Arguments] { '0': null, '1': 3 }
  */
  // 写入内容
  fs.write(fd, "这是异步操作的内容", function (err, byte_num, string) {
    console.log(arguments);
    /* 错误对象  字节数   内容
    [Arguments] { '0': null, '1': 27, '2': '这是异步操作的内容' }
    */

    // 关闭文件
    fs.close(fd);
  });
});
