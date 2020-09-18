# Date类对象
    Date对象：
        - 在JS中使用Date对象来表示一个时间

创建date对象：

    方法1：使用构造函数
        var d = new Date();
        - 这会直接封装为当前代码执行的时间

      方法2：创建一个指定的时间，在构造函数中传递一个表示时间的字符串参数
        var d1 = new Date("3/30/2020  11:11:11");

日期格式：月/日/年  时:分:秒

    - d.getDate():返回当前日期的日
    - d.getDay():返回当前日期属于星期几,0表示周日，6表示周六
    - d.getMonth():返回当前日期的月份,0表示1月，11代表12月
    - d.getFullYear() :从 Date 对象以四位数字返回年份 
    - d.getHours() 返回 Date 对象的小时 (0 ~ 23)。 
    - d.getMinutes() 返回 Date 对象的分钟 (0 ~ 59)。 
    - d.getMilliseconds() 返回 Date 对象的毫秒(0 ~ 999)。

    - getTime():返回 1970 年 1 月 1 日至今的毫秒数。
        - 获取当前日期对象的时间戳
        时间戳指的就是从格林威治标准时间的1970年1时1日0分0秒到当前时间的毫秒数
            1秒 = 1000毫秒
            - 计算机底层在保存时间时使用的都是时间戳
            - 时间戳转换为间隔年份：d.getTime()/1000/60/60/24/365
            - 注意:d = new Date('1/1/1970 0:0:0');
                    这里的时间时北京东八区的时间,并非格林威治标准时间
                    所以d.getTime() 不是0
        - 获取时间戳的第二种方法：time = Date.now();
            这行代码执行时刻的时间戳
        - 时间戳的用处：
            检测代码的执行时间：start = console.log(Date.now);
                                    代码段
                                  end = console.log(Date.now);
                                  var t = end - start;
            或者：console.time();
                console.timeEnd();

# Math类

    并不是构造函数，它属于一个工具类，它里面封装了数学运算相关的属性和方法

常量：

    Math.PI:圆周率
    Math.E 返回算术常量 e，即自然对数的底数（约等于2.718） 
    Math.LN2 返回 2 的自然对数（约等于0.693）。 
    Math.LN10 返回 10 的自然对数（约等于2.302）。 
    Math.LOG2E 返回以 2 为底的 e 的对数（约等于 1.414）。 
    Math.LOG10E 返回以 10 为底的 e 的对数（约等于0.434）。 
    Math.SQRT1_2： 返回返回 2 的平方根的倒数 
    Math.SQRT2：返回 2 的平方根

函数：

    abs(x) 返回数的绝对值。
    acos(x) 返回数的反余弦值。
    asin(x) 返回数的反正弦值。
    atan(x) 以介于 -PI/2 与 PI/2 弧度之间的数值来返回 x 的反正切值。 
    atan2(y,x) 返回从 x 轴到点 (x,y) 的角度（介于 -PI/2 与 PI/2 弧度之间）。 
    cos(x) 返回数的余弦。
    sin(x) 返回数的正弦。
    tan(x) 返回角的正切。
    log(x) 返回数的自然对数（底为e）。
    exp(x) 返回 e 的指数。
    pow(x,y) 返回 x 的 y 次幂。
    sqrt(x) 返回数的平方根。
    max(x,y,z,....) 返回 x,y,z,... 中的最高值。
    min(x,y,z,....) 返回 x,y,z,... 中的最低值。
    ceil(x) 向上取整  1.1-->2
    floor(x) 向下取整    1.9 --->1
    round(x) 四舍五入取整

random() 返回 一个0 ~ 1 之间的随机数

        - 生成0~a之间的随机数：a*Math.random()
        - 生成0~a之间的随机整数：Math.round(a*Math.random())
        - 生成a~b之间的随机数：a+Math.random()*(b-1)
        - 生成a~b之间的随机整数：Math.round(a+Math.random()*(b-1))

.

    toSource() 返回该对象的源代码。
    valueOf() 返回 Math 对象的原始值。

# 包装类

JS中提供了三个包装类:均为构造函数

    包装类可以将基本数据类型转换为引用数据类型Object
三个包装类

    - String:将基本数据类型的字符串转换为String对象
    - Number:将基本数据类型的数字转换为Number对象
    - Boolean:将基本数据类型的布尔值转换为Boolean对象

    注意：在实际应用中不会使用基本数据类型的对象
        在做比较时可能会存在不可预期的结果

    方法和属性只能添加给对象，不能添加给基本数据类型
    但是使用一些基本数据类型去调用一些方法时，例如强制类型转换
        var a = 123;
        a.toString();
        a.hello = "你好";  
        这里可以添加，但是不能打印，因为基本数据类型不具备属性时，浏览器使用包装类暂时将a转换为了Number对象，所以此时可以调用对象方法或者添加属性再调用完之后，再将其转换为基本数据类型

# 包装类String
字符串在底层是通过字符数组的形式保存的

    可以计算长度，访问其中的某个元素
        - var str = "hello,你好";
        str.length;8
        str[0]:h
方法：

    - charAt():返回某个索引处的元素

    - charCodeAt():返回某个索引处的元素的unicode编码

    - String.fromCharCode(uincode编码):根据字符编码去获取字符
    - str.concat(str1,str2,..):连接字符串
        - 不改变原串

    - indexOf():检索字符串，检查某个元素是否属于str,
        属于则返回元素第一次出现的索引
        否则返回-1

    - lastIndexOf():返回元素最后一次出现的索引，否则返回-1
    - slice(start,end)：提取字符串的片断，并在新的字符串中返回被提取的部分
        - 不改变原串，返回start~(stop-1);
        - 可以传入负数，-1表示最后一个元素

    - substring(start,stop):截取字符串，和slice类似
        - 不可以传入负数，传入负数相当于0，并且自动调整参数位置
            第二个参数小于第一个，会自动交换顺序

    - substr(start,num)：从start开始截取指定数量的字符串
    - split(separator,num)：把字符串分割为num个字符串数组
            - seperator包含在字符串内
            - 如果separator的数量大于num,则会自动删除后面的字符串数组
            - 如果separator的数量小于num，则分为separator+1个字符串数组

    - str.toUpperCase():转大写
        - 不改变原串
    - str.toLowerCase():转小写
        - 不改变原串