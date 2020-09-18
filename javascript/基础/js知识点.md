# 目录  <div id="0"></div>    
[一、变量基础](#01)  
[二、数据类型](#02)  
[三、运算符](#03)  
[四、条件语句](#04)  
[五、对象](#05)  
[六、函数](#06)  
[七、原型对象](#07)  
[八、数组](#08)   
[九、Date_Math包装类](#09)  
[十、正则](#10)  
[十一、Dom简介](#11)  
[十二、Dom文本节点](#12)      
[十三、Dom事件](#13)  
[十四、Bom](#14)  
[十五、类属性](#15)  
[十六、二级菜单](#16)  
[十七、json](#17)  
[十八、属性描述对象](#18)  
[十九、js回调队列与事件循环及异步操作](#19)  
[二十、DOM接口](#20)  
[二十一、Document节点](#21)  
[二十二、Element节点](#22)  
[二十三、属性的操作](#23)  
[二十四、Css操作](#24)  
[二十五、Mutation](#25)  
[二十六、事件](#26)  

# 一、变量基础[∧](#0)<div id="01"></div>
### 1 引入
- 控制浏览器弹出警告框：alert("这是我的第一行JS代码")；
- 让计算机在页面中输出一个内容：document.write("你看我出来吗")；
- 向控制台输出一个内容：console.log("你猜我在那里出来")；
### 2 JS文件的编写位置：
- 外部引入JS文件：
```
<script type="text/javascript" src="js/script.js" >
    /*此时内部的代码没有用*/
    alert('我是内部的js文件')
</script>
```
- 直接在script标签中写入代码：
```
<script>
    /*此时这个内部的代码才会生效*/
    alert('我是内部的js文件')
</script>
```
- 当不想让超链接点击后发生动作时就可以直接用一个分号代替
```<a href="javascript:;">你也点我一下</a>```
### 3 JS注释：

- 多行注释：/* 被注释的内容 */
- 单行注释：//被注释的内容

### 4 字面量和变量：

- 字面量：一些不可改变的值，比如1,2,3,4等等
    - 可以直接使用，如：alert(1234544);，不加引号，但是一般我们不会直接使用
- 变量：可以用来保存字面量，而且变量的值是可以任意改变的
    - 变量更加方便我们使用
    - 如：x=1234544;alert(x);
- 一般在开发过程中均是通过变量保存字面量，很少直接使用字面量
    - 声明变量：
        - 使用var关键词声明：var a;
        - 为变量赋值：a=123
        - 声明和赋值同时进行：var b = 678;
        - 通过变量对字面量进行描述：age = 80;
### 标志符
- 在Js中自主命名的都可以称为标志符
    - 例如：变量名，函数名，属性名等
- 命名标志符：
    - 标志符中可以含有字母，数字，下划线和$
    - 标志符不能以数字开头
    - 不能是ES中的关键字或者保留字
    - 一般采用驼峰命名法：首字母小写，每个单词的开头字母大小，其余小写
         - helloWorld aaaBbbCcc
    - JS底层保存标志符时采用的是unicode编码（utf-8)
         - 理论上讲，所有的utf-8中含有的内容均可以作为标志符
         - 中文也可以，但是一般不这么用
            - 能用，但是千万别用，笑死人啦 var 锄禾日当午 = 79;

# 二、数据类型[∧](#0)<div id="02"></div>
### 1 数据类型：字面量的类型

- 在Js中有6中数据类型：
    - String:字符串
    - Number:数值
    - Boolean:布尔值
    - None:空值
    - Undefined:未定义
    - Object:对象
      
      前五种属于几本的数据类型，Object属于引用数据类型

#### String字符串：
- 使用引号引起来
- 使用双引号或者单引号均可，但是不要混着用
- 引号不能嵌套，双引号里面不能放双引号，单引号里面不能放单引号
- 引号的转义：在字符串中使用\作为转义字符
    - 当表示一些特殊符号时可以使用\转义
    - \"表示双引号
    - \'表示单引号
    - \n表示换行
    - \t表示制表符
    - \\表示\

```
var str = "hello";     hello
str = '我说："今天天气真好"';   我说："今天天气真好"
str = "我说：\"今天天气真好\"";   我说："今天天气真好"
str = '我说：\'今天\\天气真好\'';   我说：'今天\天气真好'
```

#### Number:数值
- 在JS中，所有数值的数据类型均是Number
    - 包括整数和浮点数
- 可以使用运算符typeof检查变量的类型
    - 用法：typeof 变量名
- 特殊的number数值：
    - Number.MAX_VALUE：允许输出的最大的数
          如果输出的结果大于Number.MAX_VALUE，就会表示为Infinity正无穷
          Infinity和-Infinity都是一个字面量
    - Number.MIN_VALUE：允许输出的最小的数，大于0的最小的小数
    - NAN：是一个特殊的数字，表示not a number,但是它的类型是number
注意：JS的浮点数运算的结果可能不精确，所以尽量不要使用JS进行精确度要求较高的运算

#### Boolean
- boolean:布尔值，只有两个值
    - true:表示逻辑真
    - false:表示逻辑假

#### Null：
- 只有一个值：null
    - 专门用来表示空对象
- 使用typeof检查null值时，显示为object

#### Undefined:未定义
- 只有一个值：undefined
    - 未定义的变量，只声明不赋值
- 使用typeof检查undefined值的变量时，显示为undefined

### 2 数据类型强制转换

#### 转换为String
- 方法一：调用被转换数据类型的toString()方法
    该方法不会改变原变量，将转换的结果返回
    null和undefined数据类型不具备toString()方法
- 方法二：调用String()函数
    方法：b = String(a);
    该方法不会改变原变量，将转换的结果返回
    适用于所有数据类型，null和undefined数据类型也具备
- 方法三：其他类型值+""
    先将其他类型转换为字符串，然后拼接为新的字符串

#### 转换为number
- 方式一：使用Number()函数
    - 字符串-->number：
        - 若是纯数字，则直接转为数字；
        - 若包含非数字内容，则转为NaN
        - 若字符串是空串或者全是空格，转为0
    - boolean-->number:
        - true:1
        - false:0;
    - null-->number:  0
    - undefined-->number: NaN
- 方法二：字符串转数字：
    - parseInt()：把字符串中的有效整数取出来转换为整数
    - parseFloat():把字符串中的有效小数取出转换为浮点数
        - 如果对于非String使用parseInt、parseFloat,它会先将其转换为String,然后再转换为int或者float
- 方法三：其他类型 - 0；其他类型 * 1；其他类型 / 1
    - 先将其他类型转换为number，然后计算得到number
- 方法四：+其它数据类型

#### 转为boolean
- 使用Boolean()函数:
    - null--->false
    - undefined:false
    - number:除了0和NaN其余均为true
    - String:除了""外其余均为true
    - object-->true
- !!其他类型的值：
    - 其他类型先转换为boolean类型，再取非，再取非

### 3 其他进制的数字
- 16进制的数字：以0x开头：0x123
    - console.log(0x55):输出时以10进制输出
- 8进制数字，以0开头
- 2进制，以0b开头
    - 不是所有浏览器均支持,火狐和chrome支持，用的很少
    - 存在有的浏览器将他看作10进制解析,有的将其作为8进制
    - 为了区分，则在parseInt中加入一个新的参数指定数字的进制
          - a = parseInt('070',10);
          - console.log(a);  // 70

# 三、运算符[∧](#0)<div id="03"></div>
### 1 运算符
- 运算符也叫操作符，可以对一个或者多个值进行运算
    - 比如：typeof就是运算符，可以获取一个值的类型
    - 运算符均会返回结果,返回值属于字符串
    - 不会影响原变量的值
####  算术运算符
- +：
    - 任何数字与NaN运算的结果均为NaN
    - 当对boolean值进行运算时，会先将boolean值转换为number类型，然后再进行运算
    - 当对string值运算时：相当于拼接两个字符串
        - 其他类型 + string:先将其他类型转换为字符串，然后拼接为新的字符串
        - 所以利用这种方式也可以将其他值转换为字符串：其他值+""
- - * /：
    - number - * / 其他类型:
        - 先将其他类型转换为number，然后计算得到number
        - 所以可以使用这种方法转换number的数据类型：
        - 其他类型 - 0；其他类型 * 1；其他类型 / 1;
- %:
    - 取余数运算
    - number % 其他类型:
        - 先将其他类型转换为number，然后计算得到number

#### 一元运算符
- 一元运算符：只需要一个操作数
    - 例如 +正号(没啥变化) -负号(符号取反)
- 对于非number类型的值会先将其转换为number类型，然后在运算
    - 所以这里又存在一个隐式的转换number的方式：+其它数据类型
        - +"123"  +true +null +undefined

#### 自增运算符
- 自增：++
    - （1） a++ （2）++a
        - 均会使得变量在自身的基础上增加1
        - 不同的是两者的返回值不同
            - a = 1;  b = a++;  b = 1;   a++的值等于自增前的值
            - a = 1;  b = ++a;  b = 2;   ++a的值等于自增后的值
        - 非number值自增：先将其转换为number，再操作
- 自减：--    同++

#### 逻辑运算符
- ！非
    - 用来对一个值进行非运算
    - true<-->false
    - !!结果为原值,所以我们可以利用这个特点将其他类型转换为boolean类型
         - 其他类型先转换为boolean类型，再取非
- && 与
    - 对符号两侧的值进行逻辑运算并返回结果：两个值中只要有一个false就返回false
    - 第一个值为false,就不会再检查第二个值
    - 第一个值为true，还会再检查第二个值
- || 或:只要有一个true就返回true
    - 第一个值为false,还会再检查第二个值
    - 第一个值为ture，就不会载检查第二个值 

**&& 的非布尔值的情况**

- 会先将其转换为布尔值，然后进行逻辑运算，最后返回原值
- 返回的是原值，不是布尔值
        - var result = 2 && 1;//返回1
        - result = 1 && 2; //返回2
    - 第一个值为false,则直接返回false
    - 第一个值为true,则直接返回第二个值

**|| 的非布尔值的情况**

- 会先将其转换为布尔值，然后进行逻辑运算，最后返回原值
- 返回的是原值，不是布尔值
    - var result = 2 || 1;//返回2
    - result = 1 || 2; //返回2
- 第一个值为false,则直接返回第二个值
- 第一个值为true,则直接返回true

#### 赋值运算符
- = :将右侧的值赋值给符号左侧的变量
- += :右侧的值加上左侧的值，将结果赋值给左侧的值，等价于a = a + 数值
- -= *= /= %=：用法同+=

#### 关系运算符
- 通过关系运算符可以比较两个数值的大小关系
    - 数值情况：> < == >= <=
        - 关系成立返回true,否则返回false
    - 非数值情况：
        - 特殊的：
            - 如果符号两侧的值均为字符串时
            - 不会将其转换为数字进行比较，而会按位比较字符的unicode编码
            - 可以借用它对英文进行排序,比较中文没有意义
        - 其余：
            - 将非数值转换为数值，再进行处理
            - 任何值和NaN做任何比较均为false

```
console.log("11" < "5"); //true，比较的是unicode编码
// 1--unicode:31  5--unicode:35  第一位比较："1"<"5"

// 所以在比较两个字符串型的数字时，一定要先将其分别转换为数字，再进行比较
console.log(Number("11")>Number("5"));   // true
```

#### 相等运算符
- ==：比较两个值是否相等,相等返回true,否则返回false
    - 不同类型比较：
        - 先转换为同等类型，再进行比较，具体转换为哪一类，未知
        - undefined 衍生自null,所以这两者相等，
            - undefined == null --->true
        - NaN 和任何值均不相等，包括它本身
            - isNaN(变量名)：判断一个变量是否是NaN
- !=:不相等返回true,否则返回false
    - 一旦类型不一致，也会先做类型变换
- ===：全等
    - 用来判断两个值是否全等，和相等类似
    - 不会做类型转换，如果类型不同，直接返回false

#### 条件运算符
    条件运算符，也叫三元运算符
        语法：条件表达式?语句1：语句2;
            条件语句结果为true,则执行语句1，并返回执行结果
                否则执行语句2，返回执行结果
                var a = 30,b = 20,c = 50;
                a > b ?alert('a大'):alert('b大');
            条件表达式结果为非布尔值，会先将其转换为boolean值
                "hello"?alert('语句1'):alert('语句2');

### 2 运算符的优先级
- 先* /再+ -
- 在Js中有一个符号优先级的表：
    - 在表中，越往上的位置处优先级越高
    - 如果优先级相同则从左往右依次计算
    - 这个表不需要记，如果优先级不明确，使用括号辅助即可

# 四、条件语句[∧](#0)<div id="04"></div>
# 语句的执行：
- 语句是按照自上向下的顺序一条一条执行的，在JS 中可以使用{}块分组语句
    - 同一个{}中的语句叫做一个代码块
    - 要么都执行，要么都不执行
    - 代码块后面不写分号;
    - JS 中的代码块只具有分组的功能，没有其他的用途，不会将内外的内容隔离

# if语句——流程控制语句
- 语法一：
```
if(条件表达式){
    语句...
}
```
    - 只能控制紧随其后的语句
    - 所以如果想执行多条语句，就需要将语句加入一个代码块
    - 即使只有一条语句，也建议 写上{}
- 语法二：
```if(条件表达式){
    语句...
}else{
 *  语句...
}
```
- 语法三：
```if(条件表达式){
    语句...
}else if(条件表达式){
    语句...
}else if(条件表达式){
    语句...
}else{
    语句...
}
```
### if练习1：
- prompt函数可以弹出一个提示框，该提示框中存在一个文本框
    - 用户可以在文本框中输入一段内容，该函数需要一个字符串作为参数
    - 该字符串将会作为提示框的提示文字
        - 该函数返回值为string,
        - 在关系运算符中我们知道如果其中有一个值为number,则不用事先转变
        - 但是如果两种均为string,则需要先进行number类型的变换
- 练习1：根据成绩决定给小明什么奖励

```
while(true){
    var score = prompt("请输入小明的期末成绩(0-100)：");
    if(score > 100 || score < 0 || isNaN(score) || score==""){
        alert("输入不合理，请重新输入！");
    }else{
        if(score== 100){
        alert("跑车，给你");
        //在单独的if语句中不能使用break,这里的break是对于while循环起作用的
        break;
        }else if(score >= 80 && score <= 99){
            alert("iphone，拿走");
            break;
        }else if(score >= 60 && score <= 79){
            alert("参考书，鼓励一下");
            break;
        }else{
            alert("胖揍一顿");
            break;
        }
    }
} 
```

### if练习2
- 练习2：女生嫁人，三个条件：高180以上，富：1000万以上，帅：500以上
    - 三个条件均满足：我一定要嫁给他
    - 满足一个：将就嫁吧
    - 均不满足：不嫁

```
    var height = prompt("请输入你的身高(CM)：");
    var money = prompt("请输入你的财富(万)：");
    var face = prompt("请输入你的颜值(px)：");
    
    alert(height+','+money+','+face);
    if(height > 180 && money > 1000 && face > 500){
        alert("我一定要嫁给他");
    }else if(height > 180 || money > 1000 || face > 500){
        alert("将就嫁吧");
    }else{
        alert("不嫁");
    }
```

### if练习3
- 输入三个数：num1,num2,num3比较大小，并从小到大输出
- 由于之后需要比较三者的大小，属于string 与 string 的关系比较，所以得先转换
- 否则就会变成逐位的编码比较，这里使用+正号隐式转换

```
var num1 = + prompt("请输入第一个数");
var num2 = + prompt("请输入第二个数");
var num3 = + prompt("请输入第三个数");

if(num1<num2 && num1<num3){
    //num1最小
    if(num2<num3){
        //num2小
        alert(num1+','+num2+','+num3);
    }else{
        //num3小
        alert(num1+','+num3+','+num2);
    }
}else if(num2<num1 && num2<num3){
    //num2最小
    if(num1<num3){
        //num1小
        alert(num2+','+num1+','+num3);
    }else{
        //num3小
        alert(num2+','+num3+','+num1);
    }
}else{
    //num3最小
    if(num1<num2){
        //num1小
        alert(num3+','+num1+','+num2);
    }else{
        //num2小
        alert(num3+','+num2+','+num1);
    }
}
```

# switch语句
- 条件分支语句也叫switch语句
- 语法：
```
switch(条件表达式){
    case 表达式:
        语句...
        break; 跳出switch语句
    case 表达式:
        语句...
        break;
    default:
        语句...
        break;
}
```
- 执行流程：
    - 依次将case后的表达式的值和switch后面的条件表达式的进行全等比较
        - 若相等，则从当前case处开始执行代码
        - 若不相等，则继续向下比较
        - 如果所有的结果均不相等，则执行default后面的语句

### switch练习1：
- 对于成绩大于60的输出合格，低于60的输出不合格
    - 将成绩大于60的按照条件输出，将成绩小于60的直接写进default

```
var score = 10;
switch(true){
    case score >= 60 && score <= 100:
        console.log("合格");break;
    case score < 60 && score > 0:
        console.log("不合格");break;
    default:
        console.log("输入有误，请重新输入！");break;
}
```

### switch练习2
- 从键盘接收整数参数，如果该数为1-7,则打印对应的星期，否则打印非法参数
```
var n = +prompt("请输入一个整数(1-7)");
switch(n){
    case 1:alert("Monday");break;
    case 2:alert("Tuesday");break;
    case 3:alert("Wesday");break;
    case 4:alert("Thirsday");break;
    case 5:alert("Friday");break;
    case 6:alert("Santorday");break;
    case 7:alert("Sunday");break;
    default:alert("非法参数");break;
}
```

# while语句
- while循环：
```
    while(条件表达式){
        语句...
    }
```
- do-while循环：
```
     do{
        语句...
    }while(条件表达式)
```

### while练习：
- 投资的年利率为5%,试求从1000块增加到5000块需要花费多少年

```
    var money = 1000,num = 0;
    do{
        money *= 1.05;
            num++;
//          alert(money+' '+num);
    }while(money<5000)
    console.log("一共需要"+num+"年");
```

# for循环

    语法：for(初始化条件表达式;条件表达式;更新表达式){
        语句...
    }

### for循环练习1：
- 打印1-100之间所有7的倍数的个数及和
```
/*var count = 0,sum = 0;
for(var a=1; a <= 100; a++){
    if(a%7 == 0){
        count++;
        sum += a;
    }
}
console.log("7的倍数有"+count+"个,总和为"+sum);
```

### for循环练习2：
- 练习2：水仙花数：每一个位上的数字的三次幂只和等于它本身
```

//  如1^3+5^3+3^3=153
/*  var i = 1;
for(;i<1000;i++){
    a = i % 100 % 10; //个
    b = parseInt(i / 10) % 10; //十
    c = parseInt(i / 100);  //百
    if(a*a*a + b*b*b + c*c*c == i){
        console.log(i);
    }
}
```

### for循环练习3：
- 输入一个数，判断是否是质数
- 方法1：质数只能被1和它自身整除，1不是质数也不是合数，质数必须是大于1的自然数
```    
var num = +prompt("请输入一个数");
var count=0;
if(num==1){
    console.log("1不是质数也不是合数");
}else{
    for(j=2;j<num;j++){
        // 判断当前的数除以2-(num-1)之间的数，能否除尽
        if(num%j==0){
            // 存在可以除尽的情况时，给count+1
            count++;
            break;
        }
    }
    if(count==0){
        //若count为0，则表明num不能除尽除了1和它自身之外的数，判断为质数
        console.log(num+"是质数");
    }else{
        console.log(num+"不是质数");
    }
}
```

- 使用一个状态值flag标记当前数的状态，默认初始值为质数

```
// 使用计时器判断程序执行的快慢，需要在外部浏览器的控制台查看，hbuilder不支持
/*  console.time('test'); // 开启一个计时器，需要一个计时器作为参数，即为计时器起名
var flag = true;
var num = +prompt("请输入一个数");
if(num==1){
    console.log("1不是质数也不是合数");
}else if(num<1){
    console.log("非法输入");
}else{
    for(j=2;j<num;j++){
        // 判断当前的数除以2-(num-1)之间的数，能否除尽
        if(num%j==0){
            flag = false;
            break;
        }
    }
    if(flag == true){
        //若count为0，则表明num不能除尽除了1和它自身之外的数，判断为质数
        console.log(num+"是质数");
    }else{
        console.log(num+"不是质数");
    }
}
```

- 再次改进，减少运行的时间，提高代码的效率
```
console.time('test');
var i = 2;
var count;
for(;i<100;i++){
    count = 0;
    // 4除不尽2以上的数，9除不尽3以上的数，16除不尽4以上的数，...
    // 所以这里使用Math.sqrt(i)开方
    for(j=2;j<Math.sqrt(i);j++){
        if(i%j==0){
            count++;  // 4.1ms
            // 一旦存在可以被非1和它本身的数整除的情况，则可以判断这不是质数，就不需要再计算后面的了
            break;  // 1.2ms
            //将j<i修改为j<Math.sqrt(i)之后：0.6ms
        }
    }
    if(count==0){
//                  console.log(i+"是质数");
    }else{
//                  console.log(i+"不是质数");
    }
}
```

# 嵌套的for循环
- 练习1：通过程序，在页面中给出如下的图形
```
* 
**
***
****
*****

*****
*****
*****
*****
*****

*****
****
***
**
*
```
- 外部循环次数决定图形的高度，内部循环次数决定图像的宽度

```
for(var i=1;i<=5;i++){
    for(var j=1;j<=i;j++){
        // &nbsp;表示一个空格
        document.write('*&nbsp;&nbsp;&nbsp;');
    }
    document.write('<br />')
}
document.write('<br />')

for(var i=1;i<=5;i++){
    for(var j=1;j<=5;j++){
        document.write('*&nbsp;&nbsp;&nbsp;');
    }
    document.write('<br />')
}
document.write('<br />')

for(var i=1;i<=5;i++){
    for(var j=1;j<=5-i+1;j++){
        document.write('*&nbsp;&nbsp;&nbsp;');
    }
    document.write('<br />')
}
```

- 练习2：打印99乘法表
```
    
 */
for(var i=1;i<=9;i++){
    for(var j=1;j<=i;j++){
        document.write('<span>'+i+'*'+j+'='+(i*j)+'</span>');
    }
    document.write('<br />');
}
```

# break和 continue
- break:
    - 退出switch或者循环语句，不能用于单独存在的if语句中
        - 如果if语句嵌套在switch或者loop中，则可以使用
    - break只对距离其最近的循环或者switch起作用，退出
        - 可以为循环语句创建label,做法：label:循环语句
    - break:label;指定结束哪一个for循环，外部for循环终止，内部也会终止

```
outer:
for(var i=1;i<5;i++){
    console.log(i+" @外层循环");
    inner:
    for(var j=1;j<5;j++){
        //这里可以用break,这里的break是相对于for循环使用的
        // 指定break想终止哪一个for循环
        break outer;
        console.log("内层循环");
    }
}
```

- continue:
    - continue:结束本次循环(所有与它最近的for循环内部的语句均不再执行)
        - 继续执行下一次循环，不能用于独立的if语句
    - continue:label;指定结束哪一个for循环的本次循环结束
        - 外部for循环的本次循环终止，内部也会终止

```
outer:
for(var i=1;i<5;i++){
    console.log(i+" @外层循环");
    inner:
    for(var j=1;j<5;j++){
        //这里可以用continue,这里的continue是相对于for循环使用的
        // 指定continue想终止哪一个for循环的本次循环
        continue outer;
        console.log(i+"内层循环");
    }
    console.log(i)
}
```

# 五、对象[∧](#0)<div id="05"></div>
- Object：引用型数据类型
    - 对象属于一种复合的数据类型，在对象中可以保存多个不同数据类型的属性

#### 1 对象的分类：

- 内建对象：根据ES标准定义的对象，在任何的ES的实现中均可以使用
    - 比如Math,String,Number,Boolean,Function,....

- 宿主对象：y由JS的运行环境提供的对象
    - 目前主要指由浏览器提供的对象
    - 比如DOM(文档对象类型)和BOM(浏览器对象类型)
    - console、document就是宿主对象

- 自定义对象：开发人员自己创建的对象
    - 创建对象：
        - 使用new关键字调用的函数，是构造函数constructor
        - 构造函数是专门创建对象的函数
        - 使用typeof查看一个对象的类型，返回的是Object
            - 查看对象中有哪些内容：console.log(对象名)
    - 添加属性：
        - 在对象中保存的值称为属性，语法：
        - 对象.属性名=属性值;
    - 查看属性值：
        - console.log(对象名.属性名); 
        - 如果读取的对象中没有该属性，不会报错，会返回undefined;
        - 修改对象的属性值：console.log(对象名.属性名);  覆盖掉之前的值
        - 删除对象的属性：delete 对象.属性名;
#### 2 创建对象

- 使用new关键字调用的函数，是构造函数constructor
    - 构造函数是专门创建对象的函数
- 使用typeof查看一个对象的类型，返回的是Object

```
var obj = new Object();
obj.name = "臭臭";
obj.gender = "男";
obj.age = 18;
console.log(obj.name);
// 修改属性值
obj.name = "香香";
// 删除属性
delete obj.name;
```

#### 3 属性名和属性值

- **属性名**  
    - 不强制要求遵守标志符的规范，什么都可以使用
        - 但是尽量按照标志符的规范来

    - 如果要使用特殊的属性名，不能采用.的方式，需要使用另一种方式
        - 对象["属性名"] =  属性值;
        - 使用这种方式存入的属性值，访问时也需要使用该方式查看
        - 这种方式更加灵活，在[]中可以直接传递一个变量，这样变量值就是属性值
            - 直接修改变量值，就可以修改属性值
    - !!!!!!属性名使用变量传递时，必须使用[]!!!!!!!!

- **属性值**：
    - 可以是任意的数据类型，可以是前五种，也可以是Object
    - （当然可以是函数，因为函数也是一种对象）

    - 检查对象中是否还有某个属性：
        - in 运算符，如果存在则返回true，否则返回false
            - "属性名" in 对象;

#### 4 基本数据类型和引用数据类型
- 基本数据类型：String Boolean Number Null Undefined
    - JS 中的变量均是保存在栈内存中的
        - 基本数据类型的值直接在栈内存中存储
        - 值与值之间是独立存在，修改其中一个不会影响另一个   
- 引用数据类型：Object
    - 对象是保存在堆内存中的
        - 每创建一个新的对象，就会在内存中辟出一个新的空间
        - 而变量保存的是对象的内存地址（对象的引用)
        - 当通过一个对象修改属性时，另一个也会受到影响- 
- 当比较两个基本数据类型的值时，就是比较值
- 而比较引用数据类型时，比较的是对象的内存地址
    - 就算两个对象的内容一样，但是还是false,因为内存地址不同

#### 5 对象字面量
- 使用对象字面量创建一个对象：var obj={};
    - 这样的方式更加简单
    - 并且这个方法可以在创建对象时直接指定对象的属性
```
obj={
      属性名：属性值,
      属性名：属性值,
      ...
}
```
- 属性名和属性值是一组一组的明值对结构,最后一个不用写逗号,

# 六、函数[∧](#0)<div id="06"></div>

- 函数也是一个对象,所以函数对象具有普通对象的所有功能（比如添加属性)
- 函数中可以封装一些功能（代码）,在需要时可以执行这些代码（功能）;
- 函数可以保存一些代码，在需要的时候调用

#### 1 创建函数对象:

- 方法1：使用构造函数创建，这种做法很少用
    - var fun = new Function();
        - 将要封装的代码以字符串的形式传递给构造函数
        -  封装到函数中的代码不会立即执行，只会在函数调用时执行
    - 调用函数：函数对象();
    - 为函数添加属性：
        - fun.属性名 = 属性值;
    - 注意：函数中默认有一个属性name,函数名.name默认返回函数的名字；

- 方法2：使用函数声明创建函数([]表示可选，可写可不写)
```
function 函数名([形参1,形参2,...,形参N]){
    语句...
}
```

- 方法3：使用函数表达式创建一个函数,这更相当于是一个赋值语句
```
var 函数名 = function([形参1,形参2,...,形参N]){
    语句...
};
```
- 创建一个匿名函数，并将其赋值给一个变量

#### 2 形参和实参
- ！！！！在函数()声明形参就相当于在函数内部声明了对应的变量！！！！！！
- 调用函数时可以在()内部指定实参，实参会赋值给函数中对应的形参- 
    - 调用函数时解析器不会检查实参的类型
    - 实参有可能是任意的数据类型
    - 如果有可能接收到非法参数，就需要在函数内部对于实参的类型进行检查- 
    - 调用函数时解析器不会检查实参的数量，多余实参不会被赋值
    - 如果实参的数量小于形参的数量，则没有对应的形参将是undefined

```
实参可以是一个函数：
function fun(a){
    a(obj); //传入函数后，该函数会自动以obj为参数，实现调用
}
function info(o){
    console.log('我是'+o.name+',我'+o.age+'岁了，我是'+o.gender+'生，我住在'+o.address);
}
fun(info); // info函数对象，直接使用函数对象
fun(isOdd()); // 调用isOdd()函数的返回值
```

#### 3 返回值
- return 后的值会作为函数的执行结果
    - return语句之后的代码不会被执行
    - return; 表明return的值为undefined,就相当于没有return
- 返回值可以是任意的数据类型，函数也可以，函数也是对象

#### 4 立即执行函数
- 匿名函数需要使用()包围起来，否则会报错
    - 调用匿名函数：(匿名函数)();
    - 像这种函数就叫做立即执行函数：
- 函数定义完，立即被调用
    - 只会执行一次

```
//调用匿名函数
(function(a,b){
    alert("我是一个匿名函数");
    console.log("a = "+a);
    console.log("b = "+b);
})(123,456);
```

#### 5 对象属性值设置为函数
- 如果一个函数作为一个对象的属性值，则该函数称为该对象的方法
    - 调用该函数，就称调用方法
    - 例如document.write()就是调用document的write()方法

```
var obj = {
    name:"孙悟空",
    age:18,
    // 对象的属性值可以是一个函数，此时fun = function(){}就是对象obj的一个方法
    fun:function(){
        console.log(obj.name);
    }
}
// 调用方法
obj.fun();
```

#### 6 枚举对象
- 使用for...in 语句:有几个属性，循环体执行几次
```
for(var 变量 in 对象){
 console.log(变量);  看看有哪些属性，变量是属性名
}
```

#### 7 作用域

- 作用域：指的是一个变量的作用范围
- 两种作用域：

- **全局作用域**

- 直接编写在script标签中的JS代码，都在全局作用域
    - 在页面打开时创建，在页面关闭时销毁
    - 在全局作用域中，有一个全局对象window,可以直接使用
    - 在全局作用域中，创建的变量都会变成window对象的属性保存
        - 创建的函数都会作为window对象的方法保存
        - 所以说我们所谓的函数都是window对象的方法
    - 全局作用域中的变量都是全局变量
        - 在页面的任意部分均可以使用

- **函数作用域**

- 调用函数时创建函数作用域，函数调用完之后，作用域销毁
    - 每调用一次，就会创建一个新的函数作用域
    - 函数作用域中，可以访问到全局变量和函数

- 在全局作用域中，不能访问函数作用域中的变量和函数
- 当函数作用域中操作变量时，会先在自身作用域中寻找
    - 如果有就直接使用，如果没有，就在上一级作用域中寻找,直到全局作用域中都没有就报错
- 如果想在函数中直接访问全局作用域中的变量a时，可以使用window.a

- **函数作用域的提前声明：**
    - 在函数作用域中也存在声明提前的特性
        - 在函数作用域中，使用var声明的变量会提前声明
        - 使用function 函数名(){}  声明的函数会在函数作用域中所有其他代码执行之前被创建
    - 在函数中，不使用var声明的变量都会成为全局变量

```
var a = 123;
// 在形参中加入的参数相当于在函数中使用var声明变量
function fun(a){
    alert(a);   // 所以这里应该是undefined
    a = 456;    // 这里的a只改变函数内部声明的a的值
}
fun();
alert(a);  // 所以这里的a还是123
```

#### 8 函数和变量的提前声明
```
var a = 1;
function a(a){
    console.log(a);
}
a(1);  // 会输出什么呢？？？

这段代码的执行与提前声明有关，实际上这段代码的执行顺序为：
var a;
function a(a){
    console.log(a);
}
a = 1;
a(1);  //TypeError: a is not a function
```
  
- **变量的提前声明早于函数**  
    - **变量的声明提前：**
        - 使用var关键字声明的变量，会在所有代码执行之前被声明
            - var a = 123;
            - 执行顺序：var a;  console.log("a = "+a);  a = 123;
        - 但是如果不使用var声明，则不会提前执行
            - a = 123;
            - 执行顺序： console.log("a = "+a);  a = 123;
        - 由于a没有提前定义，会报错，如果写window.a则不会报错，会输出undefined
        - 因为对象的属性值若用前未定义会输出undefined,单纯的变量使用前未声明会报错

    - **函数的声明提前：**
        - 使用  function 函数名(){}  声明的函数会在所有代码执行之前被创建
            - 所以可以在函数声明前调用该函数
        - 使用  函数名 = function(){}  创建的函数不会被提前执行
            - 所以不可以在函数创建之前使用该函数

#### 9 debug
- 在代码段前面添加断点，然后逐步执行，观察变量的值的变化情况

```
alert(d);
var a = 10;
var b = "hello";
c = true;
function fun(){
    alert("hello");
}
var d = 35;

本段代码：
1. 声明var:fun(函数在此时已经执行，所以之后如果不调用不会再执行), 
    a,b,d=undefined,这时全局变量中并没有c的存在
2. 逐步执行，alert(d)
3. a = 10,b = "hello"
4. c = true  此时全局变量中才会出现c
5. d = 35;
```

# this
- 解析器(浏览器)在调用函数时，每次都会向函数内部传递一个隐含的参数——this
    - this指向的是函数执行的上下文对象
- 根据函数调用的方式不同，this会指向不同的方式
    - 以函数形式调用：window
    - 以方法的形式调用时：this是该方法所属的对象
    - 以构造函数的形式调用时，this是该构造对象(见15构造函数)
    - 使用call和apply调用时，this是指定的对象(见08数组：07)
    - 在DOM的事件响应函数中，事件响应函数是给谁绑定的，this就是谁(11DOM:06全选练习1)

```
var name = "全局";
function fun(){
    // 这里使用this.name可以保证输出调用对象所包含的name属性值
    // 如fun()时输出"全局",obj.sayName()输出"孙悟空",obj2.sayName()输出"沙和尚"
    console.log(this.name);   
}
//以函数形式调用
fun(); // this指代window 

var obj = {
    name:"孙悟空",
    sayName:fun
};
var obj2 = {
    name:"沙和尚",
    sayName:fun
};
// 以方法的形式调用
obj.sayName();  //this指代obj
obj2.sayName();  //this指代obj2
```

#### 10 工厂方法
- 使用工厂方法创建对象：可以大批量创建对象
    - 定义一个函数，传入属性值，在其内部创建一个对象，然后返回对象
    - 需要创建对象时，直接调用该函数即可

```
var obj = {
    name:"孙悟空",
    age:18,
    gender:"男",
    sayName:function(){
        alert(this.name);
    }
};

//          obj.sayName();

function creatPerson(name,age,gender){
    var obj = new Object();
    obj.name = name,
    obj.age = age,
    obj.gender = gender,
    obj.sayName = function(){
        alert(this.name);
    }
    return obj;
}
var obj2 = creatPerson("孙悟空",18,'男'); 
var obj3= creatPerson("白骨精",18,'女'); 
var obj4 = creatPerson("沙和尚",18,'男'); 
console.log(obj2);
obj4.sayName();
```

#### 11 构造函数

- 创建一个构造函数
    - 和普通对象创建的方法一致
    - 但是习惯首字母大写
    - 普通函数直接调用，构造函数需要使用new关键字调用
- 构造函数的执行流程： 
    - 这4个步骤，124都是隐式完成的，并没有显式的代码说明
    ```
        1. 立刻在堆内存中拿出一个区域，创建一个新的对象
        2. 将新建的对象设置为函数的this
            在构造函数中可以使用this来引用新建的对象
        3. 逐行执行函数中的代码
        4. 将新建的对象作为返回值返回
    ```
- 使用同一个构造函数创建的对象称为一类对象，
    - 也将一个构造函数称为一个类
- 将通过一个类创建的对象称为该类的实例
- 实例名 instanceof 类名：检查一个对象是否是一个类的实例
    - 是：返回true,否则返回false;
- 所有的对象均是Object的对象
```
function Person(name,age,gender){
    this.name = name;  //作为构造函数创建对象时，this指代新建的对象
    this.age = age;
    this.gender = gender;
    this.sayName = function(){
        alert("hello,我是"+this.name);
    };
}

// 这里在创建对象时加new就会构造函数，否则就是普通函数
// 一旦加new,则会自动执行124步骤，隐式返回新建的对象
var per = new Person("孙悟空",18,'男');  
var per1 = new Person("白骨精",18,'女');  
var per2 = new Person("沙和尚",18,'男');   
console.log(per.sayName == per1.sayName);
```

# 构造函数2
    在上一个文件中，我们定义了一个Person类，并且产生了几个实例
        但是我们发现，我们每产生一个实例，就需要创建一个
    function(){alert("hello,我是"+this.name);};函数，并将其赋值给sayName

        这些函数看起来都实现了同样的功能
        那这些函数占用的内存空间一样吗，是一个函数吗？

        经过验证，console.log(per.sayName == per1.sayName)--->false
            我们发现他们不一样,这样就耗费了内存空间，并且增加了运行时间，
            所以需要改进

        考虑将function(){alert("hello,我是"+this.name);};函数定义于类之外，
            然后直接将其赋值给sayName属性;

```
// 创建Person类
console.time('test');
function Person(name,age,gender){
    this.name = name;  //作为构造函数创建对象时，this指代新建的对象
    this.age = age;
    this.gender = gender;
    this.sayName = fun;
}

function fun(){
    alert("hello,我是"+this.name);
}

// 创建实例
var per = new Person("孙悟空",18,'男');  
var per1 = new Person("白骨精",18,'女');  
var per2 = new Person("沙和尚",18,'男');   
console.log(per.sayName == per1.sayName);
console.timeEnd('test');
```

    但是这样的方法还是存在一个问题就是：
        将函数定义在了全局域中，所以就不能在全局域中再定义一个名为这样的函数，污染了全局域的命名空间
    这个问题可以参见07中的01.原型对象的处理办法

七、原型对象[∧](#0)<div id="07"></div>
# 引入
prototype:原型对象  --->类型：对象

      对于函数而言，prototype就是它的一个属性，但是这个属性是一个对象类型的
            fun = function(){
                  prototype:{}  //对象类型的
            }

      对于我们创建的每一个函数，浏览器均会为其添加prototype属性
            每个函数的prototype对象都是不一样的

      如果函数以“构造函数”方式创建对象时，该对象都会具备一个隐含的属性__proto__
      注意__proto__是实例化对象的属性
            该属性直接指向了构造函数的原型对象
      如果函数作为普通函数调用，prototype没有任何作用
          此时虽然函数还是具备prototype属性，但是调用其创建的对象不具备__proto__属性，从而就不具备公共区域了

原型对象的好处：

      原型对象就相当于一个公共区域，所有同一个类的实例均可以访问该对象
            所以我们可以将对象中共有的内容设置到原型对象中

      当我们访问一个对象的属性时，如果不存在就会去原型对象中寻找，找到就会直接使用
            这样就可以改进构造函数2中遗留的问题，将那个函数放在prototype中
            不会造成全局域命名空间的污染

      检查对象中是否包含某个属性：
          属性 in 对象
              存在为true,否则返回false

      对于对象中存在的属性，我们想知道该属性属于对象本身还是原型对象
            - hasOwnProperty:检查对象本身是否具有某个属性
                  对象名.hasOwnProperty("属性名");
                  有返回true,否则返回false

      原型对象也是对象，所以它也有原型

      当我们在使用一个对象的属性和方法时，会先在自身中寻找，
            如果没有，则会去原型对象中寻找
            如果原型有则直接使用，如果没有则去原型的原型中寻找
                  直到找到Object对象的原型，因为Object的原型没有原型,为null
            如果在Object的原型中没有找到，则返回undefined

```
                  function MyClass(){
                  }
                  // 向MyClass原型中添加属性
                  MyClass.prototype.name = "我是原型中的名字";
                  var mc = new MyClass();

                  // 检查一个对象中是否包含某个属性用in,检查一个类中是否包含某个属性用instanceof
//                console.log("name" in mc); // true
//                console.log(mc.hasOwnProperty("name"));//false

                  // 以hasOwnProperty属性为例
                  // 1. 检查该属性是否属于对象mc --->false
                  console.log(mc.hasOwnProperty("hasOwnProperty"));
                  // 2. 检查该属性是否属于对象mc的原型对象 --->false 
                  console.log(mc.__proto__.hasOwnProperty("hasOwnProperty")); // false
                  // 3. 检查该属性是否属于对象mc的原型对象的原型中 --->true
                  console.log(mc.__proto__.__proto__.hasOwnProperty("hasOwnProperty"));
                  // 康康我们mc属性有几个上层的原型,返回null,表示
                  // mc.__proto__.__proto__中的第二个__proto就是Object的原型
                  // 若是再加一个.__proto__就会报错
                  console.log(mc.__proto__.__proto__.__proto__);
```

# toString

      直接在页面中打印对象时输出的是对象的toString()方法的返回值
            console.log(per) == console.log(per.toString());

      而一般我们自己定义的函数中并不具备toString函数，所以就会自动调用原型中的toString()方法

      原型中的toString()方法中固定了对象输出时的样子[Object Object]

      如果我们希望在输出对象时不输出[Object Object]，可以为对象本身添加一个toString()方法
            per.toString = function(){
             }
      这样每次输出时就会首先调用对象自身的toString方法

      但是这样修改还是存在一个问题，如果我们重新创建一个对象，还是会输出[Object Object]
      因为该对象也不具备toString方法

      所以我们应该将toString方法放在对象per的原型__proto__中，
            per.toString = function(){
            }
      或者放在Person类的prototype属性中
            Person.prototype.toString = function(){
            }
      这样所有该类的对象打印时就是同一个风格了

```
                  function Person(name,age,gender){
                        this.name = name;
                        this.age = age;
                        this.gender = gender;
                   }
                   var per = new Person("孙悟空",18,"男");
                   // 此时对象自身不具备toString函数，就会调用原型中的，输出[Object Object]
                   var result = per.toString();
                   console.log("result = "+result);

                   // 给对象自定义一个toString函数
                   per.__proto__.toString = function(){ 
                        return "Person[name = "+this.name+",age = "+this.age+ ",gender = "+this.gender+"]";
                   }

                   // 这下对象在输出时就会首先调用自身的toString函数
                   var result = per.toString();
                   console.log("result = "+result);
                   console.log(per); 

                   var per2 = new Person("猪八戒",28,"男");
                   console.log(per2);
```

# 垃圾回收

垃圾回收(GC):

      - 程序运行过程中也会产生垃圾
            垃圾积攒过多会导致程序运行慢，所以需要垃圾回收机制处理程序运行过程中产生的垃圾

      - 由于对象在创建的时候会占据一个内存空间
            而一旦一个对象没有任何变量或者属性对其进行引用(不存在变量，属性和方法)，
            我们将永远无法操作该对象时，这个对象就变成了垃圾
            这种对象过多会占用大量的内存空间，导致程序运行变慢
            所以我们就需要清理这种垃圾
如何清理：

      JS中具备自动垃圾回收机制，会自动将这些垃圾从内存中销毁
      我们不需要也不能进行垃圾回收的操作
      我们需要做的只是将不再使用的对象设置为null即可

# 八、数组[∧](#0)<div id="08"></div>
# 引入

数组：也是一个对象

    和普通的对象一样也是用来存储值的

    不同的是，普通对象使用字符串作为属性名，数组使用数字作为索引操作数组元素的
        当然也可以使用arr.name = "cucu";但是这样写没有意义

    索引从0开始，存储性能比普通对象好
        所以在开发过程中经常使用数组来存储一些数据
数组中的元素可以是任意类型:

    String,Number,null,undefined,boolean,Object,function
        undefined和null都是空值,,,

创建数组对象

    - 方法1:使用构造函数创建数组：
        var arr = new Array(); //空数组

        可以同时添加元素(多个)，将需要添加的元素作为构造函数的参数传入，使用逗号隔开
            var arr = new Array("hello",12,true,undefined,null,obj,function(){}); 

        只传入一个数值时，就是指定了数组的长度：
            var arr2 = new Array(12); //指定arr2的元素个数为12

        只传入一个非数值时，就是创建了一个长度为1的数组：
            var arr2 = new Array("hello");

    - 方法2:使用字面量创建,可以直接在其中添加元素
        var arr = [];
        var arr = ["hello",12,true,undefined,null];

数组嵌套：

        二维数组：
            arr = [[1,2,3],[4,5,6]];

使用typeof检查一个数组时，会返回object,表明数组也是一个对象

其他方法：

        - 向数组中添加元素：
            数组名[索引] = 值;

        读取数组中的元素：
            console.log(数组名[索引]);
            读取到不存在的索引，不会报错，返回undefined;

        修改和查看数组的元素个数(长度)：
            arr.length:返回的是数组中元素(包括空元素)的个数，即元素的最大索引+1;

        修改：arr.length = num;
            如果修改的值大于元素的个数，补空
            如果修改的值小于元素的个数，删除多余的元素

        向数组的尾部添加元素
        arr[arr.length] = 值;

    - 连续数组：每个索引都具备值
    - 非连续数组：其中的一些索引对应的值为空
        arr[0] = 12;arr[1] = 34;arr[10] = 45;
        中间的3,4,5,6,7,8,9为空，输出为12,34,,,,,,,,,45
        这种不好，占用了多余的空间

# 数组的四个方法
    - push(元素1,元素2,...);
        向数组末尾添加一个或多个元素，并且返回数组中元素的个数
    - pop()
        删除数组的最后一个元素，并且返回被删除的元素
    - unshift(元素1,元素2,...)
        向数组的开头添加一个或更多元素，并返回新的长度
    - shift()
        删除并且返回数组的第一个元素

# 数组的遍历
    var arr = ['孙悟空','猪八戒','沙和尚'];
    // 方法1：使用for循环
    for(var i=0; i<arr.length; i++){
        console.log(arr[i]);
    }

# 回调函数
    forEach(回调函数):
        - 遍历数组的一个方法，只支持Ie8以上的浏览器
            所以如果希望兼容IE8,则不推荐使用这个方法，直接使用for循环遍历可
        - 需要一个函数作为参数
            - 这种函数由我们创建但不由我们调用的，称为回调函数
            - 数组中有几个元素函数就会执行几次,每次执行时，浏览器会将遍历到的元素以实参的形式传递进来
        我们可以定义形参将其读取
        - 浏览器会在回调函数中传递三个参数：
            第一个参数:每次遍历的元素
            第二个参数:索引
            第三个参数:遍历的数组对象

```
var arr = ['孙悟空','猪八戒','沙和尚'];
function fun(){
}
arr.forEach(function(value,index,obj_arr){
    console.log(value+index); 
    console.log(typeof obj_arr);
    console.log(obj_arr == arr);
});
```

# slice和splice

slice:从某个已有的数据返回选定的元素

    slice(start,end):
        索引从start~(end-1)
        不会影响原数组的元素组成，将截取的元素封装到一个新的数组中
        第二个参数可以省略不写，表示start~所有
        可以使用负数表示从数组尾端开始计算，如，-1表示倒数第一个元素

splice:从index位置开始删除num个元素，并且从索引index处开始新增元素item1,.....,itemX

    splice(index,num,item1,.....,itemX):
        - 返回被删除的元素
        - index和num必须，item可选
        - 这个方法会改变原数组

##### 练习：方法1
```
练习：去除数组中重复的数字：方法1：
            var arr = [1,2,3,2,1,3,4,2,5];
            var arr1 = [];
            
            for(var i=0; i<arr.length; i++){
                // 先将元素加进arr1中
                arr1.push(arr[i]);
                var count = 0;
                for(var j=0; j<arr1.length; j++){ 
                    // 遍历arr1,如果发现arr[i]与arr1中相同元素的个数大于1，则说明arr1
                    // 中之前已经加入了此元素，所以将此轮循环中的元素pop出即可。
                    if(arr[i] == arr1[j]){
                        count++;
                    }
                }
                if(count > 1){
                    arr1.pop(arr[i]);
                }
            } 
```

##### 练习：方法2：
```
    首先取出第一个元素，分别和arr中的元素进行比较，
    一旦发现相同的就删掉该索引处的元素，使用splice可以直接对于原数组产生影响
             var arr = [1,2,3,2,2,2,2,2,1,3,4,2,5];
            var arr1 = [];
            for(var i=0; i<arr.length; i++){
                for(var j=i+1; j<arr.length; j++){ 
                    if(arr[i] == arr[j]){
                        arr.splice(j,1); 
                        // 当删除当前j所在的元素后，后边的元素会自动补位，不会再比较这个元素
                        // 需要再比较一次j所在位置的元素，所以需要再--一次
                        j--; 
                    }
                }
            }
            console.log(arr);
```

# call和apply

call()和apply():  可以任意更改this

    - 都是函数对象的方法，均需要通过函数对象调用
    - 当对函数调用call()和apply()都会调用该函数
        - 在调用call和apply时可以将一个对象指定为第一个参数
          此时这个对象将会成为函数执行时的this,也就是说我们可以任意更改this

call()

    - call方法可以将函数fun的实参在对象之后依次传递:
        function fun(a,b){}
        fun.call(obj,2,3)  //this就是obj,a=2,b=3

apply()

    - apply方法需要将实参装在一个数组中，然后将其放在对象之后：
        apply(obj,[2,3]) // this就是obj,a=2,b=3

this的情况：

    - 以函数形式调用时：this永远都是window
    - 以方法的形式调用时：this是调用方法的对象
    - 以构造函数的方法调用时，this是新创建的对象
    - 使用call和apply调用时，this是指定的对象

```
            name = "window";
            var obj = {
                name:"obj",
                sayName:function(){
                    alert(this.name);
                }
            };
            var obj2 = {name:"obj2"};
            function fun(a,b){
                console.log(this);
                console.log("a = "+a);
                console.log("b = "+b);
//              alert(this.name);
            }
            // 不加obj参数之前，this指代window
            /*fun.call();
            fun.apply(); */

            // 加入了obj参数后，this对象直接参数obj，obj2
            /*fun.call(obj);
            fun.apply(obj2);*/

            /*obj.sayName();  //this是obj
            obj.sayName.apply(obj2);  //指定this变成了obj2*/

            /*fun.call(obj,1,2);
            fun.apply(obj2,[1,2]);*/
```

# arguments

    在调用函数时，浏览器均会为其传递两个默认的参数
        - this:函数的上下文对象
        - arguments:封装实参的对象：

！！！！即使不定义形参，也可以通过arguments使用实参！！！！
arguments:

    - arguments是一个类数组对象,和数组很像，但不是数组
    - 当我们调用函数时，所传递的实参均会封装到arguments中
        可以通过索引操作对象，也可以获取长度,获取的长度是传入的实参的个数 
            与形参的数量无关，即使不定义形参，也可以通过arguments使用实参

获取实参内容：

        方法：arguments[index],从0开始
            例如：arguments[0]:第一个实参
            arguments[1]:第二个实参

callee属性：

    这个属性对应一个函数对象，就是当前正在执行的函数的对象

```
            function fun(a,b){
                console.log(arguments instanceof Array);
                console.log(arguments.length);
                console.log(arguments[1]);
                console.log(arguments.callee);  // 相当于fun对象
                console.log(arguments.callee == fun); //true
            }
            fun(1,2,3);  //arguments.length = 3
```

#九、Date_Math包装类[∧](#0)<div id="09"></div>
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

# 十、正则[∧](#0)<div id="10"></div>
# 正则表达式：
定义字符串的规则

      - 邮件的格式：****@****.com
      - 计算机可以根据正则表达式检查字符串是否符合规则
            将字符串中符合规则的内容提取出来
创建正则表达式对象：

方法1：

      var reg = new RegExp("正则表达式","匹配模式");
            匹配模式：
                  i 忽略大小写
                  g 全局匹配模式
      // 检查字符串中是否包含a或者A,包含返回true,否则返回false
            var reg = new RegExp("ab",'i');
            console.log(reg);   // /ab/i
            console.log(typeof reg);    //object
            var result = reg.test('abcdefg');
            console.log(result);   //false

      var reg = new RegExp(/正则表达式/匹配模式);

方法2：

      使用字面量创建：
            - var 变量 = /正则表达式/匹配模式
            - 这种方式更加简单，但是使用构造函数的方式创建更加灵活
            - 构造函数可以传入一个变量作为正则表达式，所以可以变化

```
      // 创建一个正则表达式，检查一个字符串中是否包含a或者b
      // |表示或者的意思  a|b == [ab]
      reg = /a|b/;
      //或者
      reg = /[ab]/;

      // 任意小写字母
      reg = /[a-z]/;
      // 任意大写字母
      reg = /[A-Z]/;
      // 任意字母
      reg = /[A-z]/;
      // abc或aec或adc
      reg = /a[bed]c/;
      // 除了a或者b  [^ ]
      reg = /[^ab]/;
      // 任意数字
      reg = /[0-9]/;
      //
      var str = 'djhdfb';
      console.log(reg.test(str));  //false
```

正则表达式的方法：

      reg.test(str):检测一个字符串是否符合正则表达式的规则，true,false

# 正则表达式和字符串相关的方法

split(regexp):
      - 可以把一个字符串拆分为一个数组
      - 使用正则表达式拆分字符串
      - 不设置全局匹配也会匹配所有

search(regexp):

      - 返回stringObject 中第一个与 regexp 相匹配的子串的起始位置
      - 没有返回-1
      - 即使设置全局匹配也只会返回第一个的索引

match(regexp):

      根据正则表达式，从一个字符串中将第一个符合条件的内容提取出来
            - 设置匹配模式为全局模式时，可以找到所有    /正则表达式/g
            - match会将匹配到的内容封装到一个数组中返回

```
var reg = new RegExp(/ab/i);
console.log('abdshjfsab'.match(reg)); //[ 'ab', index: 0, input: 'abdshjfsab', groups: undefined ]
console.log(reg.test('abdshjfsab'));  //true
```

replace(regexp,str):

      - 将字符串中第一个符合regexp的内容替换为新的内容
      - 使用全局模式可以替换所有

```
      var str = "1a2b3c4d5e6f7A8B9C";
      var reg = /[a-f]/;
      var result = str.split(reg);

      result = str.search(reg);

      // 找第一个result = ["a2b"]
      var reg1 = /[a-f][1-8][a-f]/i;
      result = str.match(reg2);

      // 找所有符合的 result=["a2b","c4d","e6f","A8B"]
      var reg2 = /[a-f][1-8][a-f]/gi;

      // 将字符串中第一个符合regexp的内容替换为新的内容
      var reg3 = /[a-f]/gi;
      result = str.replace(reg3,'哈哈');
      console.log(result);
```

# 正则表达式语法
量词：

      - 设置一个内容出现的次数,只对前边一个内容起作用
            /(ab){3}/  是否包含ababab  
            /ab{3}/    是否包含bbb

      - {n} : 正好出现n次：
      - {m,n} : 出现m~n次   /{ab{1,3}c}/:abc,abbc,abbbc
      - {m,} : 最少出现m次
      - {,n} : 最多出现n次
      - + : 至少一个，相当于{1，}
      - * : 0个或多个，相当于{0，}
      - ? : 0个或1个，相当于{0,1}
      - 内容1^ : 开头为内容1
      - 内容1$ : 结尾为内容1
      - ?=n内容1 : 其后紧接内容1 
      - ?!内容1  : 其后没有紧接内容1 
      - . : 任意单个字符，  /./ 可以匹配a,b,abc,....,除了换行和行结束符

```
// 检查是否是合法手机号
// 手机号11位，第一位1,第二位[3-9],三位以后任意数字9个,并且需要有结束符，表明长度为11位
var reg = /^1[3-9][0-9]{9}$/;
result = reg.test("13567890987"); //true
```

```
      检查一个字符串中是否包含.,由于.的特殊含义，所以需要使用转义字符\说明我们确实想要寻找.
      \.表示.   , \\ 表示\
      reg = /\./;
      // 在构造函数中需要写：reg = new RegExp("\\."); 检查有没有.
      // 在构造函数中需要写：reg = new RegExp("\\\\"); 检查有没有\
      reg = new RegExp("\\.");
      result = reg.test("dfjmdjsf");// false
      result = reg.test("dfj.mdjsf");// true
      console.log(result);
```

# 元字符
      . 查找单个字符，除了换行和行结束符。 
      \w 查找字母，数字，_   相当于[A-z0-9_]
      \W 除了（字母，数字，下划线）   [^A-z0-9_]
      \d [0-9]   
      \D [^0-9]
      \s 查找空白字符  [ ]
      \S 查找非空白字符   [^ ]
      \b 单词边界 
            reg = /child/; 
            reg.test('hello,children') true
            reg = /\bchild\b/;  
            reg.test('hello,children') false
      \B 匹配非单词边界
      \0 查找 NUL 字符
      \n 查找换行符 
      \f 查找换页符 
      \r 查找回车符 
      \t 查找制表符 
      \v 查找垂直制表符 
      \xxx 查找以八进制数 xxx 规定的字符。 
      \xdd 查找以十六进制数 dd 规定的字符。
      \uxxxx 查找以十六进制数 xxxx 规定的 Unicode 字符。

```
      //字符串前面的0个或者多个空格
      reg = /^\s*/;
      //字符串后面的0个或者多个空格
      reg1 = /\s*$/;
      // 去除前后的空格,使用|,表示存在其中任意一个均可，再使用全局表示符合规则的所有内容
      reg2 = /^\s*|\s*$/g;
      // 字符串中的所有空格
      reg3 = /\s/g;
      // 使用replace将符合规则的内容去除掉
      var result = str.replace(reg3,"");
      console.log(result);
```

# 电子邮件的正则表达式

电子邮件：

      - hello                 .djf              @ abc          .com           .cn
      - 任意大于2位的字母数字下划线   .任意字母数字下划线(可选)@数字或者字母    .任意2~5位字母    .任意2~5位字母(可选)
      - \w{3,}                (\.\w+)*         @[A-z0-9]{1,}  (\.[A-z]{2,5}){1,2}
      - 另外，注意需要给前后添加^,$,否则在符合规则的字符串前后添加新的内容也会符合要求

```
      var reg = /^\w{3,}(\.\w+)*@[A-z0-9]{1,}(\.[A-z]{2,5}){1,2}$/;
      var email = "hello.djf@abc.com";    //true
      email = "1727336114@qq.com";   // true
      email = "1727336114.com";    //false
      email = "@1727336114@qq.com&&&";  //false
      var result = reg.test(email);
      console.log(result);
```

# 十一、Dom简介[∧](#0)<div id="11"></div>
# Dom简介

DOM:Document Object Model 文档对象模型

   JS中通过DOM操作html文档
   文档：整个html网页文档
   对象：将网页中的每一个部分都转换为了一个对象
   模型：表示对象之间的关系
   节点Node:构成html文档的最基本单元

   节点分为四类：也就是四类对象
       文档节点(整个HTML文档)
       元素节点(HTML文档中的html标签)
       属性节点(元素的内容)
       文本节点(html标签中的文本内容)

       <p id="pId">This is a paragraph</p>
           其中：id属于属性节点，This is a paragraph属于文本节点
               p属于元素节点

节点的属性：

                    nodeName   nodetype   nodeValue
    文档节点       #document        9          null
    元素节点       标签名           1          null
    属性节点       属性名           2          属性值
    文本节点       #text            3          文本内容
    通过nodetype的值可以判断节点的类型

# 事件

事件：

   文档或者浏览器窗口中发生的一些特定的交互瞬间
        比如：点击按钮，鼠标移动，关闭窗口
   我们可以在事件对应的属性中设置一些JS代码，这样当事件被触发时，这些代码就会执行

```
<body>
        <!--1 单击事件响应onclick
            像1,2这样直接把函数内容或者需要响应的函数写在结构中，出现了耦合，不推荐使用
            推荐方法3：将结构写在body中，需要响应的事件写在JS中
        -->
        <button id="btn1" onclick="alert('烦人');">我是按钮1</button>
        <!--2 双击事件相应ondblclick   dbl(double)-->
        <button id="btn2" ondblclick="btn2()">我是按钮2</button>
        
        <button id="btn3">我是按钮3</button>
        <script type="text/javascript">
            
            function btn2(){
                alert('讨厌,你点我干啥');
            }
            
            var btn3 = document.getElementById('btn3');
            console.log(btn3);
            btn3.onclick = function(){
                alert('嘎哈呀？？');
            }
        </script>
    </body>
```

# 文檔的加載
浏览器加载页面的顺序：自上向下

    设定这段代码的执行顺序：让其在整个页面加载完成之后再执行
    onload():在整个页面加载完成之后再触发
       为window绑定该事件,当整个页面加载完成之后触发其他的事件

# Dom查询
使用document对象调用：

     document.body:获取Body元素
     document.documentElement:获取html根标签
     document.all:页面中的所有元素，返回的是数组
         或者：document.getElementAll;
     document.getElementByTagName("*") 
        通过id属性获取一个元素节点的引用
     document.getElementsByName("name")
        通过name属性获取一组元素节点对象
        因为一个文档中的 name 属性可能不唯一
             （如 HTML表单中的单选按钮通常具有相同的 name 属性）
             所有 getElementsByName() 方法返回的是元素的数组
             而不是一个元素。
     document.getElementsByTagName(tagname) 
        通过标签名获取一组元素节点对象
        因为一个标签可能使用多次

使用具体的元素对象调用：获取子节点

     getElementsByTagName(tagname):
        返回当前节点的指定标签名
     childNodes:当前节点的所有子节点
             还包括换行造成的标签之间的空白文本节点
             但是在IE8及以下的浏览器中不会包含由于换行造成的空白文本节点
         children:获取当前节点的所有子元素，即不包括空白文本节点
             所有浏览器兼容
     firstChild:当前节点的第一个子节点
             还包括换行造成的标签之间的空白换行产生的文本节点
         firstElementChild:当前节点的第一个子元素节点，不包括空白换行文本节点
             兼容IE9+      
     lastChild:当前节点的最后一个子节点
             还包括换行造成的标签之间的空白文本节点
         lastElementChild:当前节点的最后一个子元素节点，不包括空白换行文本节点
             兼容IE9+

使用具体的节点调用：获取兄弟节点和父节点

     parentNode:当前节点的父节点
     previousSibling:前一个兄弟节点
             还包括换行造成的标签之间的空白文本节点
         previousElementSibling:前一个兄弟元素，不包括换行
             兼容IE9+
     nextSibling:后一个兄弟节点
         nextElementSibling:后一个兄弟元素，不包括换行
             兼容IE9+

```
<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
        <title>DOM查询练习</title>
        <!--文件名一旦是中文名，从hbuilder打开ie,不能正常显示样式-->
        <link rel="stylesheet" type="text/css" href="css/dom查询.css"/>
        <script type="text/javascript">
            /
              定义一个函数，专门为指定元素绑定单击响应函数
              参数：
                   idStr:要绑定的单级响应函数的对象的id属性值
                   fun:事件的回调函数，当单击元素时，该函数会被触发
             /
            function myClick(idStr,fun){
                var btn = document.getElementById(idStr);
                btn.onclick = fun;
            }
            window.onload=function()
            {
                //1.查找#bj结点
                var btn01 = document.getElementById('btn01');
                btn01.onclick = function(){
                    var bj = document.getElementById('bj');
                    // 打印bj内部的html代码
                    alert(bj.innerHTML);
                }
                //2.查找所有li结点
                var btn02 = document.getElementById('btn02');
                btn02.onclick = function(){
                    // 根据标签名获取一组元素对象
                    var lis = document.getElementsByTagName('li');
                    // 打印数组的长度以及index为2的元素的内部文字
                    alert(lis.length + lis[2].innerHTML);
                }
                //3.查找name=gender的所有结点
                var btn03 = document.getElementById('btn03');
                btn03.onclick = function(){
                    var inputs = document.getElementsByName('gender');
                    // 打印数组的长度以及index为0的元素的value属性
                    /
                      读取元素的某个属性：元素对象.属性名
                      注意：class属性不能如此读取，class是保留字
                           元素对象.className
                      /
                    alert(inputs.length + inputs[0].className);
                }
                //4.查找#city下的的所有li结点
                var btn04 = document.getElementById('btn04');
                btn04.onclick = function(){
                    var c = document.getElementById('city');
                    var lis = c.getElementsByTagName('li');
                    // 
                    alert(lis.length+lis[0].innerHTML);
                }
                //5.返回#city下的所有子结点
                var btn05 = document.getElementById('btn05');
                btn05.onclick = function(){
                    var c = document.getElementById('city');
//                  var child_nodes = c.childNodes;
                    // childNodes还会获取到标签之间由于换行产生的空白文本
                    // 这里自动将其作为了文本标签获取到了
                    // 如果希望使用这个方法又不会获取到空白，就需要在html中将内容写在一行
                    // 但是在IE8及以下的浏览器中不会包含由于换行造成的空白文本节点
//                  alert(child_nodes.length);   //换行了  9
                    var child = c.children;
                    alert(child.length);   //4
//                  for(var i=0; i<child_nodes.length; i++){
//                      alert(child_nodes[i]);
//                  }  
                }
                //6.返回#phone的第一个子结点
                var btn06 = document.getElementById("btn06");
                btn06.onclick = function(){
                    var phone = document.getElementById("phone");
                    var fc = phone.firstChild;
                    /firstChild 当前节点的第一个子节点
                      还包括换行造成的标签之间的空白文本节点/
                    fc = phone.firstElementChild;
                    /firstElementChild 当前节点的第一个子元素节点
                      不包括换行造成的标签之间的空白文本节点
                      兼容IE9+/
                    alert(fc.innerHTML);
                    
                }
                //7.返回#android的前一个兄弟结点(previousSibling)
                myClick("btn07",function(){
                    var ad = document.getElementById('android');
                    var ps = ad.previousSibling;
                    /
                      previousSibling包含空白文本节点和兄弟元素
                      previousElementSibling只包含兄弟元素
                     /
                    ps = ad.previousElementSibling;
                    alert(ps);
                })
                //8.读取#username的value属性值
                myClick("btn08",function(){
                    var un = document.getElementById('username');
                    var unv = un.value;
                    alert(unv);
                })
                //9.设置#username的value属性值
                myClick("btn09",function(){
                    var un = document.getElementById('username');
                    un.value = "abcdefg";
                    var unv = un.value;
                    alert(unv);
                })
                //10.返回#bj的父结点(parentNode)
                myClick("btn10",function(){
                    var bj = document.getElementById('bj');
                    var pn = bj.parentNode;
                    alert(pn.innerHTML); // 获取元素的内容，包含标签和文本
                    alert(pn.innerText); // 获取元素内部的文本内容,不包含标签
                });
                //11.返回#bj的文本值
                myClick("btn11",function(){
                    var bj = document.getElementById('bj');
                    //
                    alert(bj.innerText);
                    // 或者
                    alert(bj.innerHTML);
                    // 或者   获取bj中的文本节点
                    var fc = bj.firstChild;
                    alert(fc);
                    alert(fc.nodeValue);
                })
                //12.补充,获取body标签
                myClick("btn12",function(){
                    /方法1:
                    由于使用getElementsByTagName方法获取到的是一个数组
                     但是很明显一个html文件中只会有一个Body,所以这里使用一个[0]
                     获取它的第一个元素/
                    var bd = document.getElementsByTagName('body')[0];
                    /方法2：使用document.body属性/
                    bd = document.body;
                    alert(bd);
                })
                //13.获取html标签
                myClick("btn13",function(){
                    /
                      方法1：
                     /
                    var html = document.getElementsByTagName('html')[0];
                    /方法2：使用document.htmlElement属性/
                    html = document.documentElement;
                    alert(html);
                })
            };    
        </script>
    </head>

    <body>
        <div id="total">
            <div class="inner">
                <p>你喜欢哪个城市?</p>
                <ul id="city">
                    <li id="bj">北京</li>
                    <li>上海</li>
                    <li>深圳</li>
                    <li>南京</li>
                </ul>
                <br/></br/>
                <p>你喜欢哪款单机游戏?</p>
                <ul id="game">
                    <li id="hj">红警</li>
                    <li>实况</li>
                    <li>飞车</li>
                    <li>魔兽</li>
                </ul>
                <br/></br/>
                <p>你手机操作系统是?</p>
                <ul id="phone">
                    <li>IOS</li>
                    <li id="android">android</li>
                    <li class="li3">windows phone</li>
                </ul>
            </div>
            <div class="inner1">
                gender:
                <input class="hello" type="radio" name="gender" value="male">male
                <input class="hello" type="radio" name="gender" value="female">female
                <br/><br/>
                name:
                <input type="text" name="name" id="username" value="abcde">
            </div>
        </div>
        <div id="btnlist">
            <div><button  id="btn01">查找#bj结点</button></div>
            <div><button  id="btn02">查找所有li结点</button></div>
            <div><button  id="btn03">查找name=gender的所有结点</button></div>
            <div><button  id="btn04">查找#city下的的所有li结点</button></div>
            <div><button  id="btn05">返回#city下的所有子结点</button></div>
            <div><button  id="btn06">返回#phone的第一个子结点</button></div>
            <div><button  id="btn07">返回#Android的前一个兄弟结点</button></div>
            <div><button  id="btn08">读取#username的value属性值</button></div>
            <div><button  id="btn09">设置#username的value属性值</button></div>
            <div><button  id="btn10">返回#bj的父结点</button></div>
            <div><button  id="btn11">返回#bj的文本值</button></div>
            <div><button  id="btn12">获取body标签</button></div>
            <div><button  id="btn13">获取html标签</button></div>
        </div>
    </body>
</html>
```

```
图片切换的练习
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
        <style>
            {
                margin:0px;
                padding: 0px;
            }
            #outer{
                width:500px;
                margin:500px auto;
                background-color: green#fff;
                padding: 10px;
                text-align: center;
            }
            img{
                padding-top: 10px;
            }
        </style>
        <script type="text/javascript">
            window.onload = function(){
                /
                  点击按钮切换图片
                  也就是要修改img标签的src属性
                 /
                var prev = document.getElementById('prev');
                var next = document.getElementById('next');
                
                // 获取id为info的p标签
                var info = document.getElementById("info");
                // 获取img标签
                var img = document.getElementsByTagName("img")[0];
                // 创建一个数组保存文件的路径
                var imgArr = ["img/1.jpg","img/2.jpg","img/3.jpg","img/4.jpg"];
                // 创建一个变量保存当前正在显示的图片的索引
                var index = 0;
                // 为p标签添加提示文字
                info.innerHTML = "一共"+imgArr.length+"张图片，这是第"+(index+1)+'张';
                //分别为两个按钮添加单击响应函数
                prev.onclick = function(){
                    /
                      切换到上一张，索引自减
                     /
                    // 切换图片就是修改img标签的src属性
                    index--;
                    if(index<0){
                        index = imgArr.length-1;
                    }
                    img.src = imgArr[index];
                    // 修改p标签的提示文字
                    info.innerHTML = "一共"+imgArr.length+"张图片，这是第"+(index+1)+'张';
                }
                next.onclick = function(){
//                  alert('下一张');
                    /
                      切换到下一张，索引自增
                     /
                    // 切换图片就是修改img标签的src属性
                    index++;
                    if(index > imgArr.length-1){
                        index = 0;
                    }
                    img.src = imgArr[index];
                    // 修改p标签的提示文字
                    info.innerHTML = "一共"+imgArr.length+"张图片，这是第"+(index+1)+'张';
                }
            }
        </script>
    </head>
    <body>
        <div id="outer">
            <p id="info"></p>
            <img src="img/1.jpg" alt="rabbit" />
            <button id="prev">上一张</button>
            <button id="next">下一张</button>
        </div>
        
    </body>
</html>
```

```
全选练习    
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>全选练习</title>
        <script type="text/javascript">
            window.onload = function(){
                
                // 首先获取四个button对象
                var checkedAllBtn = document.getElementById("checkedAllBtn");
                var checkedNoBtn = document.getElementById("checkedNoBtn");
                var checkedRevBtn = document.getElementById("checkedRevBtn");
                var sendBtn = document.getElementById("sendBtn");
                
                // 获取全选/全不选对象
                var checkedAllBox = document.getElementById("checkedAllBox");
                
                // 获取四个多选框对象items
                var items = document.getElementsByName("items");
                
                // 1.#checkedAllBtn全选
                /
                  点击按钮之后四个多选框全被选中
                 /
                checkedAllBtn.onclick = function(){
                    //遍历items
                    for(var i=0;i<items.length; i++){
                        // 使用checked属性，可以获取和设置多选框的选中状态
                        // 设置为true,即选中
                        items[i].checked = true;
                    }
                    // 当单击全选按钮之后，将全选/全不选也设置为选中状态
                    checkedAllBox.checked = true;
                }
                
                
                // 2.#checkedNoBtn
                
                checkedNoBtn.onclick = function(){
                    
                    //遍历items
                    for(var i=0;i<items.length; i++){
                        items[i].checked = false;
                    }
                    // 当单击全不选按钮之后，将全选/全不选也设置为未选中状态
                    checkedAllBox.checked = false;
                }
                
                
                // 3.#checkedRevBtn
                
                checkedRevBtn.onclick = function(){
                    
                    //遍历items
                    for(var i=0;i<items.length; i++){
                        if(items[i].checked){
                            items[i].checked = false;
                        }else{
                            items[i].checked = true;
                        }   
                    }
                    
                    // 当单击items之后，所有复选框均处于选中状态，则将全选/全不选设置为选中
                    // 当单击items之后，所有复选框均处于未选中状态，则将全选/全不选设置为未选中
                    /if(items[0].checked && items[1].checked && items[2].checked && items[3].checked){
                        checkedAllBox.checked = true;
                    }else{
                        checkedAllBox.checked = false;
                    }/
                    
                    // 或者：
                    checkedAllBox.checked = true;
                    for(var j=0 ; j<items.length ; j++){
                        if(!items[j].checked){ 
                            // 只要有一个不是全选状态，则将全选/全不选设置为false
                            checkedAllBox.checked = false;
                            break;
                        }
                    }
                }
                
                
                // 4.#sendBtn
                /
                  点击按钮后，提交选中的多选框的value属性值弹出
                 /
                
                sendBtn.onclick = function(){
                    
                    //遍历items
                    for(var i=0;i<items.length; i++){
                        // 判断多选框是否选中
                        if(items[i].checked){
                            alert(items[i].value);
                        }           
                    }
                }
                
                
                // 5.#checkedAllBox
                /
                  当它选中时，其余的多选框也全选中
                  当它不选中时，其余的多选框也不选中
                 /
                
                
                checkedAllBox.onclick = function(){
                    /alert(this); //this是input元素对象,也就是checkedAllBox
                    alert(this == checkedAllBox); //true
                    在事件的响应函数中，响应函数是给谁绑定的，this就是谁
                     /
                    if(checkedAllBox.checked){
                        checkedAllBtn.onclick();
                    }else{
                        checkedNoBtn.onclick();
                    }
                    // 或者
                    /
                      for(var i=0;i<items.length; i++){
                           items[i].checked = checkedAllBox.checked;
                           // 或者
                           items[i].checked = this.checked;
                      }
                     /
                }
                
                
                // 6.#items
                /
                  在点击了全选/全不选按钮后，所有复选框均全选状态
                  去掉任何一个复选框的全选状态，全选/全不选需要改变为未选中状态
                 /
                
                
                for(var i=0;i<items.length; i++){ 
                    items[i].onclick = function(){
                        /
                          首先将全选/全不选设置为true,然后进入for循环判断
                               一旦找到一个为false的复选框，则将全选/全不选设置为false
                         /
                        checkedAllBox.checked = true;
                        for(var j=0 ; j<items.length ; j++){
                            if(!items[j].checked){ 
                                // 只要有一个不是全选状态，则将全选/全不选设置为false
                                checkedAllBox.checked = false;
                                break;
                            }
                        }
                    }
                }
            }
        </script>
    </head>
    <body>
        <!--添加表单项-->
        <from method="post" action="">
            你爱好的运动是：
            <input type="checkbox" id="checkedAllBox"/>全选/全不选
            <br />
            <input type="checkbox" name="items" value="足球"/>足球
            <input type="checkbox" name="items" value="篮球"/>篮球
            <input type="checkbox" name="items" value="羽毛球"/>羽毛球
            <input type="checkbox" name="items" value="乒乓球"/>乒乓球
            <br />
            <input type='button' id="checkedAllBtn" value="全 选" />
            <input type='button' id="checkedNoBtn" value="全不选" />
            <input type='button' id="checkedRevBtn" value="反 选" />
            <input type='button' id="sendBtn" value="提 交" />
            
        </from>
    </body>
</html>
```

# dom查询的其他方法
获取所有类名为box1的元素对象

    根据元素的class属性值查询一组元素节点对象
    getElementsByClassName()
       根据元素的类属性获取一组元素对象
       这个方法返回的是一个元素节点属性
       兼容IE9+
   目前还需要兼容IE8，所以这个方法少用

获取box1元素下的div

    document.querySelector()
      需要一个选择器的字符串(可以是类名，也可以是id)作为参数
      可以根据一个css选择器来查询一个元素节点对象
      兼容IE8+
      此方法只会返回第一个元素
    var divs = document.querySelectorAll(".box1 div")

    document.querySelectorAll():
      返回一组符合选择器条件的元素对象
      即使只有一个元素对象符合要求，也会返回一个NodeList
      兼容IE8+
    var box1 = document.querySelectorAll("#box1")[0];

# Dom增刪改
document调用：

    createElement(tagName) 创建元素节点
       返回创建好的对象
    createTextNode(str) 创建文本节点
元素对象调用：
    
    父节点.appendChild(子节点) 
      把新的子节点添加到指定节点
           // 或者
           还可以通过innerHTML增加子节点，但是这种方法会改变所有的子节点
           一旦其他的子节点绑定了事件就会受到影响
               例如，添加一个列表项：使用+=符号
                   city.innerHTML += "<li>广州</li>";

    父节点.insertBefore(new子节点，指定子节点) 
      在指定的子节点前面插入新的子节点
    父节点.replaceChild(new子节点，指定子节点) 
      替换指定子节点
    父节点.removeChild(子节点) 
       删除子节点
        若是未知子元素的父元素，则可以通过parentNode先获取父节点:
            子节点.parentNode.removeChild(子节点) 

    createAttribute() 创建属性节点。  
    getAttribute() 返回指定的属性值。 
    setAttribute() 把指定属性设置或修改为指定的值。 

```
Dom增刪改例子：
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
        <link rel="stylesheet" href="css/dom增删改.css" />
        <script type="text/javascript">
            
            // 为btn对象增加单击事件函数
            function myClick(idStr,fun){
                var btn = document.getElementById(idStr);
                btn.onclick = fun;
            }
            
            window.onload = function(){
                // 1.创建一个"广州"节点,添加到#city下
                myClick("btn01",function(){
                    
                    // 创建广州节点<li>广州</li>
                    // 1:创建广州元素节点 2：创建广州文本节点 3：将文本节点添加到li中
                    var li = document.createElement("li");
                    
                    // li.innerHTML = "广州";代替下面两句
                    var str = document.createTextNode("广州");
                    li.appendChild(str);
                    
                    // 将广州节点添加到city下
                    var city = document.getElementById("city");
                    city.appendChild(li);
                })
                
                // 2.将"广州"节点插入到#bj前面
                
                myClick("btn02",function(){
                    // 创建广州节点<li>广州</li>
                    // 1:创建广州元素节点 2：创建广州文本节点 3：将文本节点添加到li中
                    var li = document.createElement("li");
                    var str = document.createTextNode("广州");
                    li.appendChild(str);
                    
                    // 将"广州"节点插入到#bj前面
                    var bj = document.getElementById("bj");
                    var city = document.getElementById("city");
                    city.insertBefore(li,bj); 
                })
                
                // 3.使用"广州"节点替换#bj节点
                
                myClick("btn03",function(){
                    // 创建广州节点<li>广州</li>
                    // 1:创建广州元素节点 2：创建广州文本节点 3：将文本节点添加到li中
                    var li = document.createElement("li");
                    var str = document.createTextNode("广州");
                    li.appendChild(str);
                    
                    // 使用"广州"节点替换#bj节点
                    var bj = document.getElementById("bj");
                    var city = document.getElementById("city");
                    city.replaceChild(li,bj);
                })
                
                //4.删除#bj节点
                myClick("btn04",function(){
                    
                    var bj = document.getElementById("bj");
                    var city = document.getElementById("city");
                    city.removeChild(bj);
                    
                    /
                      若是未知子元素的父元素，则可以通过parentNode先获取父节点
                      bj.parentNode.removeChild(bj);
                     /
                })
                
                //5.读取#city内的HTML代码
                myClick("btn05",function(){
                    
                    var city = document.getElementById("city");
                    alert(city.innerHTML);
                })
                
                // 6.设置#bj内的HTML代码
                
                myClick("btn06",function(){
                    
                    var bj = document.getElementById("bj");
                    bj.innerHTML = "BeiJing";
                })
                
                // 6.通过innerHTML添加“广州”节点
                
                myClick("btn07",function(){
                    
                    var city = document.getElementById("city");
                    city.innerHTML += "<li>广州</li>";
                })
            }
        </script>
        
    </head>
    <body>
        <div id="total">
            <div id="inner">
                <p>你喜欢哪个城市?</p>
                <ul id="city">
                    <li id="bj">北京</li>
                    <li>上海</li>
                    <li>东京</li>
                    <li>首尔</li>
                </ul>
            </div>
            <div id="btnList">
                <div><button id="btn01">创建一个"广州"节点,添加到#city下</button></div>
                <div><button id="btn02">将"广州"节点插入到#bj前面</button></div>
                <div><button id="btn03">使用"广州"节点替换#bj节点</button></div>
                <div><button id="btn04">删除#bj节点</button></div>
                <div><button id="btn05">读取#city内的HTML代码</button></div>
                <div><button id="btn06">设置#bj内的HTML代码</button></div>
                <div><button id="btn07">通过innerHTML添加“广州”节点</button></div>
            </div>
        </div>  
    </body>
</html>
```

```
添加刪除練習例子：
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
        <link rel="stylesheet" href="css/09增删改练习.css" />
        <script type="text/javascript">
            window.onload = function(){
                
                //1.点击超链接之后删除该行员工的信息
                
                // 获取超链接对象
                var allA = document.getElementsByTagName("a");
                for(var i=0 ; i<allA.length ; i++){
                    //for循环在页面加载完成之后会立即执行，为元素a添加响应程序，但不执行
                    // for循环执行到 i =2时不满足条件，停止执行
                    // 响应函数只有在单击时才会执行
                    // 所以在单击之前，i已经变成了2
                    allA[i].onclick = function(){
                        /
                          单击超链接之后删除对应行
                          点击哪个超链接，this就是谁
                         /
                        alert(i);
//                      alert(this);
                        // 获取当前的tr元素
                        var tr = this.parentNode.parentNode;
                        
                        /
                          删除之前弹出一个提示框,confirm提供带有一段消息和一个确认按钮，一个取消按钮的提示框
                          alert只有一个确认按钮
                          confirm会返回true或者false,如果点击确定，返回true
                         /
                        // 获取要删除的员工的名字
                        var td = tr.getElementsByTagName("td")[0];
                        var name = td.innerHTML;
                        
                        var r = confirm("确认删除"+name+"的信息吗？");
                        if(r){
                            // 删除tr元素
                            tr.parentNode.removeChild(tr);
                        }
                        
                        /
                          点击超链接之后，超链接会默认跳转到另一个页面
                          但是此时我们不想它跳转，可以在响应函数的最后添加return false取消该行为
                          或者在html页面中：<a href="javascript:;">delete</a>
                         /
                        return false;
                    }
                }
            
                
                //2.点击submit将员工的信息添加到表格中
                /
                  添加类似于这样的内容：
                  <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Salary</th>
                        <th>&nbsp;</th>
                    </tr>
                 /
                
                // 为提交按钮增加单击事件响应函数
                var addEmpButton = document.getElementById("addEmpButton");
                addEmpButton.onclick = function(){
                    
                    // 获取用户填写的员工信息
                    var empName = document.getElementById("empName").value;
                    var email = document.getElementById('email').value;
                    var salary = document.getElementById('salary').value;
//                  alert(name+email+salary);
                    
                    /
                      简单点的方式：
                      var tr = document.createElement("tr");
                        tr.innerHTML = "<td>"+empName+"</td>"+
                                        "<td>"+email+"</td>"+
                                        "<td>"+salary+"</td>"+
                                        "<td><a href='javascript:;'>delete</a></td>";
                        var tbody = employeetable.getElementsByTagName("tbody")[0];
                        tbody.appendChild(tr);
                        然后为a添加单击事件函数
                        
                        // 注意不能直接使用innerHTML为tbody添加tr,这样会导致其他的tr的事件不能执行
                     /
                    
                    // 创建tr元素
                    var tr = document.createElement("tr");
                    
                    var td1 = document.createElement("td");
                    td1.innerHTML = empName;
                    
                    var td2 = document.createElement("td");
                    td2.innerHTML = email;
                    
                    var td3 = document.createElement("td");
                    td3.innerHTML = salary;
                    
                    var td4 = document.createElement("td");
                    var a = document.createElement('a');
                    a.innerHTML = "delete";
                    a.href = "javascript:;";
                    td4.appendChild(a);
                    
                    tr.appendChild(td1);
                    tr.appendChild(td2);
                    tr.appendChild(td3);
                    tr.appendChild(td4);
                    
                    var employeetable = document.getElementById("employeetable");
                    
                     / 注意我们在创建表格时，直接将tr放在employeetable中
                      但是浏览器会自动为我们添加一个tbody属性，并且将tr放在tbody中
                      如果我们新增加的元素直接放在employeetable中，在浏览器中会和tbody成为同一级
                      虽然显示上没有区别，但可能造成样式的不同
                      所以我们直接将tr放在tbody中/
                     
                    // 获取tbody元素：
                    var tbody = employeetable.getElementsByTagName("tbody")[0];
                    tbody.appendChild(tr);
                    
                    // 为a添加单击事件响应程序
                    a.onclick = function(){
                        var tr = this.parentNode.parentNode;
                        // 获取要删除的员工的名字
                        var td = tr.getElementsByTagName("td")[0];
                        var name = td.innerHTML;
                        
                        var r = confirm("确认删除"+name+"的信息吗？");
                        if(r){
                            // 删除tr元素
                            tr.parentNode.removeChild(tr);
                        }
                    }
                }
            }
        </script>
    </head>
    <body>
        <div id="total">
            <table id="employeetable">
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Salary</th>
                    <th>&nbsp;</th>
                </tr>
                <tr>
                    <td>Lucy</td>
                    <td>lucy@lucy.com</td>
                    <td>10000</td>
                    <td><a href="javascript:;">delete</a></td>
                </tr>
                <tr>
                    <td>Bob</td>
                    <td>boy@boy.com</td>
                    <td>7500</td>
                    <td><a href="deleteEmp?id=002">delete</a></td>
                </tr>
            </table>
            <div id="formDiv">
                <h4>添加新员工</h4>
                <table>
                    <tr>
                        <td class="word">name:</td>
                        <td class="inp">
                            <input type="text" name="empName" id="empName"/>
                        </td>
                    </tr>
                    
                    <tr>
                        <td class="word">email:</td>
                        <td class="inp">
                            <input type="text" name="email" id="email"/>
                        </td>
                    </tr>
                    
                    <tr>
                        <td class="word">salary:</td>
                        <td class="inp">
                            <input type="text" name="salary" id="salary"/>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2" align="center">
                            <button id="addEmpButton">
                                Submit
                            </button>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        
    </body>
</html>
```

# Dom文档写入:document调用

    write()、writeln()、open()和 close()
    相同：都接受一个字符串参数，即要写入到输出流中的文本
    不同：
        write()会原样写入
        writeln()则会在字符串的末尾添加一个换行符（\n）
    在页面被加载的过程中，可以使用这两个方法向页面中动态地加入内容

```
<html> 
    <head> 
    <title>document.write() Example</title> 
    </head> 
    <body> 
        <p>The current date and time is: 
        <script type="text/javascript"> 
        // 有问题，这里的换行符没有起作用
        document.writeln();
        document.write("<strong>" + (new Date()).toString() + "</strong>"); 
        </script> 
        </p> 
    </body> 
</html>

结果：The current date and time is: （日期加粗）Mon Jun 15 2020 23:13:31 GMT+0800 (中国标准时间)
```

    注意还可以使用write()和writeln函数输入js文件

```
<html> 
    <head> 
    <title>document.write() Example 3</title> 
    </head> 
    <body> 
        <script type="text/javascript"> 
        // 注意这里的</script>结束标签需要转义，否则这个结束标签会自动和外部的script开始标签匹配
        document.write("<script type=\"text/javascript\" src=\"file.js\">" + "<\/script>"); 
        </script> 
    </body> 
</html>
```

# 获取，设置和删除元素的属性
    getAttribute("属性名")；
    setAttribute("属性名","属性值");
    removeAttribute("属性名");  //IE6+支持

```
<div id="myDiv" class="bd" title="Body text" selfdefine="我自己定义的"></div>

var div = document.getElementById("myDiv"); 
alert(div.getAttribute("id")); //"myDiv" 
alert(div.getAttribute("class")); //"bd" 
alert(div.getAttribute("title")); //"Body text"
alert(div.getAttribute("selfdefine")); //"我自己定义的"
```

# Dom操作css
通过JS修改元素的样式：

    元素.style.样式名 = 样式值;
       我们通过style属性设置的样式均是内联样式
    （内联样式：<p style="color:red;">hello</p>  中的color>
           所以优先级高，会立即显示
       通过style属性读取到的样式也是内联样式
           不能读取到<style>标签中的样式

    注意：如果CSS样式名中存在-号，这在script中不合法
       需要将这种样式名修改为驼峰命名法
       去掉-号，大写-后的字母

# 获取样式表中的样式

获取元素当前显示的样式：

方法1：元素.currentStyle.样式名

    只支持IE
    只能读取属性，不能修改，
       修改只能用元素.style.样式名

方法2：GetComputedStyle(元素,伪元素(一般写null))

         返回这个元素的样式对象
         IE9+
         对象中封装了当前元素的样式
         只能读取属性，不能修改
               修改只能用元素.style.样式名
         在获取元素的宽度和高度时，只是包含内容区

自定义一个函数来获取当前元素的样式，兼容IE8及以下，并且在其他浏览器中正常显示

    参数：
      obj:获取哪个元素的样式
      cssname:要获取的样式名

    function getStyle(obj,cssname){
        if(window.getComputedStyle){
            //判断window.getComputedStyle
            // 为true,则表示有getComputedStyle属性
            // 为undefined表示没有，则使用currentStyle属性

            // 正常浏览器的方式
            return getComputedStyle(obj,null)[cssname];
        }else{
            // IE8的方式
            return obj.currentStyle[cssname];
        }
    }
可以将这个函数放在一个.js文件中，需要用时将其从外部引入即可

# 其他样式操作的属性

      element.clientHeight  
       - 返回元素的可见高度(包括内容区和内边距),只能获取不能修改
      element.clientWidth  
       - 返回元素的可见宽度(包括内容区和内边距),只能获取不能修改
      
      element.offsetHeight 
       - 返回元素的高度(包含内容区，内边距和边框),只能获取不能修改
      element.offsetWidth 
       - 返回元素的宽度(包含内容区，内边距和边框),只能获取不能修改
      
      element.offsetParent 
       - 获取当前元素的定位父元素,返回的是元素节点对象
       - 获取的是   距离当前元素最近的   开启了定位的(position不是默认的)   祖先元素
           如果所有祖先元素均没有开启定位，则会返回body对象
      
      element.offsetLeft 
       - 当前元素(边框)相对于其定位祖先元素的水平偏移位置
      
      element.offsetTop
       - 当前元素(边框)相对于其定位祖先元素的垂直偏移位置
       
      element.scrollHeight 
       - 获取整个滚动区域的高度。
      element.scrollWidth 
       - 获取整个滚动区域的宽度。
      
      element.scrollLeft 
       - 获取水平滚动条滚动的距离
      element.scrollTop 
       - 获取垂直滚动条滚动的距离
      
      当满足：scrollHeight - scrollTop == clientHeight :垂直滚动条滚动到底部了
           即垂直滚动条的长度 = clientHeight
      当满足：scrollWidth - scrollLeft == clientWidth :水平滚动条滚动到底部了
           即水平滚动条的长度 = clientWidth
      作用：当注册时，经常会需要同意一大堆的协议，所以就会出现垂直滚动条，我们需要将垂直滚动条
           拖动到最下面之后，才可以点击同意按钮，此时就会用到这个判断等式：

```
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
        <style type="text/css">
            *{
                margin: 0px;
                padding: 0px;
            }
            body{
                height:1000px;
            }
            #btn01{
                /*display: block;*/
                margin-top: 500px;
                width:100px;
                height:40px;
                 
            }
            #box3{
                height:300px;
                width:200px;
                background-color: #fff;
                overflow: auto; /*解决高度塌陷问题*/
            } 
            #box4{
                margin-top: 10px;
                height:600px;
                width:400px;
                background-color: #bfa;
            } 
            #box1{
                margin-top: 10px;
                height:100px;
                width:100px;
                background-color: red;
                padding: 10px; 
                border:3px solid black;
            } 
        </style>
        <script type="text/javascript">
            
            window.onload = function(){
                var btn01 = document.getElementById('btn01');
                
                var box1 = document.getElementById('box1');
                var box3 = document.getElementById('box3');
                btn01.onclick = function(){
                    console.log("内容区加内边距高度："+box1.clientHeight);
                    console.log("内容区加内边距宽度："+box1.clientWidth); 
//                  console.log("内容区加内边距加边框 高度："+box1.offsetHeight);
//                  console.log("内容区加内边距加边框 高度："+box1.offsetWidth);
                    /*console.log(box3.scrollHeight);
                    console.log(box3.scrollWidth);
                    console.log(box3.scrollLeft);
                    console.log(box3.scrollTop);*/
                    console.log(box3.scrollHeight-box3.scrollTop);
                }
                console.log(box3.clientHeight); // 可看见的：283  减去了滚动条占据的高度
                console.log(box3.scrollHeight);
//              console.log(getComputedStyle(btn01).height);
//              console.log(box1.offsetParent);  //这里返回body对象，因为其父元素不具备定位
//              console.log(box1.offsetLeft);  //距离body：0px
//              console.log(box1.offsetTop);  // 距离body上边：
//              console.log("内容区宽度："+getComputedStyle(box1).width);
            }
        </script>  
    </head> 
    <body>
        <button id='btn01'>点我一下</button>
        
        <div id="box3">
            <div id="box4">
            
            </div>
        </div>
        
        <div id="box2">
            <div id="box1">
            
            </div>
        </div>
        
    </body>
</html>
```

```
滚动条练习
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
        <style type="text/css">
            #info{
                width:200px;
                height: 200px;
                background-color: #bfa;
                overflow: auto;
            }
        </style>
        <script type="text/javascript">
            window.onload = function(){
                // 当滚定条滚动到底时，表单项可用
                /*
                 * 查看滚动条是否滚动
                 * onscroll()
                 */
                var inputs = document.getElementsByTagName("input")
                var cb = document.getElementById('cb');
                // 查看滚动条是否滚动
                info.onscroll = function(){
                    // 判断是否滚动到底
                    if(info.scrollHeight - info.scrollTop == info.clientHeight){
                        // 使得表单项可用
                        inputs[0].disabled = false;
                        inputs[1].disabled = false;
                    }
                }
                inputs[1].onclick = function(){
                    if(inputs[0].checked == false){
                        confirm('请勾选“同意”选项');
                    }else{
                        confirm('请进行下一步安装');
                    }
                    return false;
                }
            }
        </script>
    </head>
    <body>
        <h3>欢迎亲爱的用户注册</h3>
        <p id="info">
            亲爱的用户，请仔细阅读以下协议，如果你不仔细阅读，你就别注册；
            亲爱的用户，请仔细阅读以下协议，如果你不仔细阅读，你就别注册；
            亲爱的用户，请仔细阅读以下协议，如果你不仔细阅读，你就别注册；
            亲爱的用户，请仔细阅读以下协议，如果你不仔细阅读，你就别注册；
            亲爱的用户，请仔细阅读以下协议，如果你不仔细阅读，你就别注册；
            亲爱的用户，请仔细阅读以下协议，如果你不仔细阅读，你就别注册；
            亲爱的用户，请仔细阅读以下协议，如果你不仔细阅读，你就别注册；
            亲爱的用户，请仔细阅读以下协议，如果你不仔细阅读，你就别注册；
            亲爱的用户，请仔细阅读以下协议，如果你不仔细阅读，你就别注册；
            亲爱的用户，请仔细阅读以下协议，如果你不仔细阅读，你就别注册；
            亲爱的用户，请仔细阅读以下协议，如果你不仔细阅读，你就别注册；
            亲爱的用户，请仔细阅读以下协议，如果你不仔细阅读，你就别注册；
            亲爱的用户，请仔细阅读以下协议，如果你不仔细阅读，你就别注册；
            亲爱的用户，请仔细阅读以下协议，如果你不仔细阅读，你就别注册；
            亲爱的用户，请仔细阅读以下协议，如果你不仔细阅读，你就别注册；
            亲爱的用户，请仔细阅读以下协议，如果你不仔细阅读，你就别注册；
            亲爱的用户，请仔细阅读以下协议，如果你不仔细阅读，你就别注册；
            亲爱的用户，请仔细阅读以下协议，如果你不仔细阅读，你就别注册；
            亲爱的用户，请仔细阅读以下协议，如果你不仔细阅读，你就别注册；
            亲爱的用户，请仔细阅读以下协议，如果你不仔细阅读，你就别注册；
            亲爱的用户，请仔细阅读以下协议，如果你不仔细阅读，你就别注册；
            亲爱的用户，请仔细阅读以下协议，如果你不仔细阅读，你就别注册；
            亲爱的用户，请仔细阅读以下协议，如果你不仔细阅读，你就别注册；
            亲爱的用户，请仔细阅读以下协议，如果你不仔细阅读，你就别注册；
            亲爱的用户，请仔细阅读以下协议，如果你不仔细阅读，你就别注册；
            亲爱的用户，请仔细阅读以下协议，如果你不仔细阅读，你就别注册；
            亲爱的用户，请仔细阅读以下协议，如果你不仔细阅读，你就别注册；
            亲爱的用户，请仔细阅读以下协议，如果你不仔细阅读，你就别注册；
            亲爱的用户，请仔细阅读以下协议，如果你不仔细阅读，你就别注册；
            亲爱的用户，请仔细阅读以下协议，如果你不仔细阅读，你就别注册；
            亲爱的用户，请仔细阅读以下协议，如果你不仔细阅读，你就别注册；
            亲爱的用户，请仔细阅读以下协议，如果你不仔细阅读，你就别注册；
        </p>
        <!--加入disabled属性：
                true/disabled:表单项将不可用，不可点击
                false:表单项恢复正常
        --> 
        <form action="#" method="post">
            <input type="checkbox" id="cb" disabled="disabled"/>我已仔细阅读协议，一定遵守<br />
            <input type="submit" value="submit" disabled="disabled"/>
        </form>
    </body>
</html>
```


# 十二、Dom文本节点[∧](#0)<div id="12"></div>
# 文本节点
    每个可以包含内容的元素最多只能存在一个文本节点
    <div></div> // 不包含文本节点
    <div> </div>   // 存在一个空格，所以包含一个文本节点
    <div>hello,world!</div>   // 存在内容，所以包含一个文本节点

访问文本节点：

    var textNode = div.firstChild;

修改文本节点的值：

    div.firstChild.nodeValue = "床前明月光，疑是地上霜";

创建文本节点：

    var textNode = document.createTextNode("<strong>Hello</strong> world!");

将文本节点添加到div中：

    var element = document.createElement("div");
    element.appendChild(textNode);

分割文本节点

    splitText(offset);

```
var element = document.createElement("div"); 
element.className = "message"; 
var textNode = document.createTextNode("Hello world!"); 
element.appendChild(textNode); 
document.body.appendChild(element); 
// 分割得到的文本节点是一个包含剩余文本的新节点，和原文本节点具备同一个父亲，葫芦娃兄弟
var newNode = element.firstChild.splitText(5); 
// 原文本节点仍然是第一个孩子
alert(element.firstChild.nodeValue); //"Hello" 
alert(newNode.nodeValue); //" world!" 
alert(element.childNodes.length); //2
```

操作文本节点：

    方法：
    appendData(text)：将 text 添加到节点的末尾。
    deleteData(offset, count)：从 offset 指定的位置开始删除 count 个字符。
    insertData(offset, text)：在 offset 指定的位置插入 text。 
    replaceData(offset, count, text)
        用 text替换从offset指定的位置开始到offset+count 为止处的文本。
    splitText(offset)：从 offset 指定的位置将当前文本节点分成两个文本节点。
    substringData(offset, count)：提取从 offset 指定的位置开始到 offset+count 为止
    处的字符串。
    属性：
        length 属性，保存着节点中字符的数目
        nodeValue.length 和 data.length 中也保存着同样的值。

# 十三、Dom事件[∧](#0)<div id="13"></div>
# 事件对象
事件对象：

    当事件的响应函数被触发时，浏览器（IE9-）每次都会将一个事件对象作为
    实参传递给响应函数；在事件对象中封装了当前事件的一切信息，比如
    鼠标的坐标，键盘哪个按键被按下 鼠标滚轮滚动的方向

    使用：event.属性名(IE9-)
    在IE8及以下浏览器中，是将事件对象直接作为window对象的属性保存的
    所以需要使用window.event.属性名(但是火狐不支持)
    为了兼容两者就需要判断
    event = event || window.event;

    clientX 返回当事件被触发时，鼠标指针的水平坐标。
        - 相对于窗口
    clientY 返回当事件被触发时，鼠标指针的垂直坐标。

    pageX,pageY:返回鼠标相对于页面的偏移量
       - 兼容IE9-
       所以如果需要兼容IE8，就不能使用
  
       页面：滚动条滑动，页面顶部也滑动
       窗口：滚动条怎么变化，窗口始终不变

```
div随鼠标移动
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
        <style type="text/css">
            /
              clientX:
              
              /
            {
                margin: 0px;
                padding: 0px;
            }
            body{
                height: 1000px;
                width: 2000px;
            }
            #box1{
                width: 100px;
                height: 100px;
                background-color: red;
                position: absolute;
            }
        </style>
        <script type="text/javascript">
            window.onload = function(){
                // div块随着鼠标移动位置,鼠标在哪，红色方框在哪
                
                // 1.检查鼠标是否移动
                var box1 = document.getElementById("box1");
                document.onmousemove = function(event){
                    
                    // 01.获取到鼠标的坐标
                    event = event || window.event;
                    
                    // 获取鼠标在可见窗口的坐标，滑动滚动条之后，窗口顶部不会变
                    // div偏移量是相对于整个页面而言的，滑动滚动条之后，页面顶部也会滑动
                    // 所以当我们滑动滚动条之后，鼠标和div显示就不在一个位置了，其实参照物不同
                    
                    var left = event.clientX;
                    var top = event.clientY;
                    
                    /
                      改进1：
                      为了解决这个问题，我们选取参照于页面的偏移量计算:pageX pageY
                           var left = event.pageX;
                            var top = event.pageY;
                      但是这个方法不兼容IE8,所以不能使用
                      
                      改进2：
                      我们发现页面的偏移量 = 窗口的偏移量 - 窗口的滚动条滚动的距离
                      
                      但是火狐认为浏览器的滚动条是html的，html.scrollTop
                      chrome认为浏览器的滚动条是body的，body.scrollTop
                      所以需要进行判断：兼容二者
                     / 
                    
//                   console.log(document.documentElement);  返回html元素对象
                    var st = document.body.scrollTop;
                    console.log(st);
                    if(!st){
                        st = document.documentElement.scrollTop;
                    }
                    /
                      或者：var st = document.body.scrollTop || document.documentElement.scrollTop;
                      var sl = document.body.scrollLeft || document.documentElement.scrollLeft;
                     /
                    
                    var sl = document.body.scrollLeft || document.documentElement.scrollLeft;
                    // 02.设置div的偏移量,需要开启box1的绝对定位
                    box1.style.left = left - sl -"px";
                    box1.style.top = top - st -"px";
                } 
            }
        </script>
        
    </head>
    <body>
        <div id="box1"></div>
    </body>
</html>
```

# 事件的冒泡
事件冒泡：

     - 所谓的冒泡：就是事件的向上传导，当后代元素上的事件被触发时，
       其祖先元素的相同事件也会被触发
     - 大部分情况下冒泡是有利的
     - 如果不希望发生事件冒泡，可以通过事件发生对象取消冒泡
       - cancelBubble:true(取消) false(不取消)

```
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
        <style type="text/css">
            #box1{
                width: 200px;
                height: 200px;
                background-color: #fffgreen;
            }
            #s1{
                background-color: #fff;
            }
        </style>
        <script type="text/javascript">
            window.onload = function(){
                
                // 为s1来添加单击响应函数
                var s1 = document.getElementById("s1");
                s1.onclick = function(event){
                    alert("我是span的单击响应函数");
                    event = event || window.event;
                    event.cancelBubble = true;
                }
                
                // 为box1来添加单击响应函数
                var box1 = document.getElementById("box1");
                box1.onclick = function(event){
                    alert("我是div的单击响应函数");
                    event = event || window.event;
                    event.cancelBubble = true;
                }
                
                // 为body来添加单击响应函数
                document.body.onclick = function(){
                    alert("我是body的单击响应函数"); 
                }
            }
        </script>
    </head>
    <body>
        <div id="box1">
            我是box1
            <span id="s1">我是span</span>
        </div>
    </body>
</html>
```

# 事件的委派

事件的委派：

    - 将事件统一绑定给元素的共同的祖先元素，这样当后代元素上的事件触发时
       会一直冒泡到祖先元素的响应函数来处理事件
    - 委派减少了事件绑定的次数，本来我们需要为每一个a绑定事件，并且为后来

```
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
        <script type="text/javascript">
            window.onload = function(){
                // 1. 为每一个超链接绑定一个单击响应函数
            
                var allA = document.getElementsByTagName('a');
                for(var i=0; i<allA.length; i--){
                    allA[i].onclick = function(){
                        alert('我是a的事件响应函数');
                    }
                }
                
                // 2. 每点击一次按钮就增加一个超链接
                var btn01 = document.getElementById("btn01");
                btn01.onclick = function(){
                    // 创建一个li
                    li = document.createElement('li');
                    li.innerHTML = "<a href='javascript:;' class='link'>新添加的超链接</a>"
                    // 将li添加到ul中
                    var u1 = document.getElementById("u1");
                    u1.appendChild(li);
                }
                
                
                
                // 3.为ul绑定单击响应函数
                var u1 = document.getElementById("u1");
                u1.onclick = function(event){
                    /
                      但是由于ul是一个块元素，不仅仅包括超链接文字，还包含空白区域
                           所以点击空白区域也可以触发事件
                      需要一个功能：触发事件的是我们期望的元素，则执行，否则不执行
                     /
                    event = event || window.event;
                    
//                  alert(event.target);  //返回的是触发事件的对象

                    if(event.target.className == "link"){
                        alert("我是ul的单击响应函数");
                    }
                    
                }
            }
        </script>
    </head>
    <body>
        <button id="btn01">添加超链接</button>
        <ul id="u1" style="background-color: red;">
            <li><a href="javascript:;" class="link">超链接1</a></li>
            <li><a href="javascript:;" class="link">超链接2</a></li>
            <li><a href="javascript:;" class="link">超链接3</a></li>
        </ul>
    </body>
</html>
```

# 事件的绑定
1 为元素绑定单击响应函数
方法1：元素名.onclick = function(){}

    绑定几个单击事件响应函数，只有最后一个生效，覆盖了
    使用对象.事件 = function(){}只能为一个对象的一个事件绑定一个响应函数

方法2：
对象.addEventListener(事件str,fun,false):可以绑定多个

       - 参数1：事件的字符串，不要on   "click"
       - 参数2:回调函数，当事件被触发时会被调用
       - 参数3：布尔值，是否在捕获阶段触发事件，一般选false
     - this是 对象
    例如，为btn01绑定多个单击响应函数，不会被覆盖，按照绑定顺序执行
    - 兼容IE9-

方法3：attachEvent():绑定多个

       - 参数1：事件的字符串，要on  "onclick"
       - 参数2:回调函数，当事件被触发时会被调用
     - this是window
    - 不同的是，执行顺序和绑定顺序相反
    - 只兼容IE

如果需要兼容两者，判断处理：

    if(btn01.addEventListener){
       btn01.addEventListener = 
    }else{
       btn01.attachEvent =  
    }

定义一个函数band()去兼容这两种情况

    传入三个参数：
    - 参数1：obj,绑定事件的对象
    - 参数2：事件的字符串，不要on   "click"
    - 参数3:回调函数，当事件被触发时会被调用

    function band(obj,eventStr,fun){   
                // 为了兼容所有浏览器
                if(obj.addEventListener){
                    // 大部分浏览器兼容
                    obj.addEventListener(eventStr,fun,false);
                }else{ 
                    // IE8-
                    obj.attachEvent("on"-eventStr,fun);
                }
    }

```
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
        <script type="text/javascript">
            window.onload = function(){
            
                
                // 1. 使用 对象.onclick方法为btn01创建多个单击响应函数
                var btn01 = document.getElementById("btn01");
                /btn01.onclick = function(){
                    alert(1);
                }
                btn01.onclick = function(){
                    alert(2);
                }/
                // 执行结果：只出现了2
                
                // 2. 使用addEventListener
                /btn01.addEventListener("click",function(){
                    alert(1);
                },false);
                btn01.addEventListener("click",function(){
                    alert(2);
                },false);/
                // 顺序显示，但是IE8-不支持
                
                // 3.使用attachEvent
                /btn01.attachEvent('onclick',function(){
                    alert(1);
                });
                btn01.attachEvent('onclick',function(){
                    alert(2);
                });/
                // 在IE8-中，反序显示  2  1
                // 在IE9,IE10中正序显示 1  2
                // 其余不支持
                
                
                // 4.所以需要定义一个函数band()去兼容这两种情况
                /
                  传入三个参数：
                   - 参数1：obj,绑定事件的对象
                   - 参数2：事件的字符串，不要on   "click"
                   - 参数3:回调函数，当事件被触发时会被调用
                 /
                band(btn01,'onclick',function(){
                    alert(1);
                });
                band(btn01,'onclick',function(){
                    alert(2);
                });
                band(btn01,'onclick',function(){
                    alert(3);
                });  
            };
            function band(obj,eventStr,fun){   
                // 为了兼容所有浏览器
                if(obj.addEventListener){
                    // 大部分浏览器兼容
                    obj.addEventListener(eventStr,fun,false);
//                  alert('listener');
                }else{ 
                    // IE8-
                    obj.attachEvent("on"-eventStr,fun);
//                  alert('attach');
                }
            }
        </script>
    </head>
    <body>
    <button id="btn01">点我一下</button>
    </body>
</html>
```

# 事件的传播
关于这个问题网景点公司和微软公司有不同的见解

       - 微软公司认为事件的传播应该是由内向外传播，也就是说事件触发时
           应该触发当前元素上的事件，然后再冒泡触发其祖父元素的相同事件
       - 网景公司认为事件应该是由外向内传播，先触发祖先元素的事件，最后
           触发元素自身的事件
       - 最后，W3C综合了两个公司的方案，将事件的传播分成了三个阶段
           1. 捕获阶段：由外向内(到目标节点)捕获事件，但是默认不触发事件
           2. 目标阶段：事件捕获到目标元素，在目标节点上触发事件
           3. 冒泡阶段：事件从内由外触发

      - 如果希望在捕获阶段就触发事件，需要
           对象.addEventListener(事件str,fun,true):可以绑定多个
           - 参数1：事件的字符串，不要on   "click"
           - 参数2:回调函数，当事件被触发时会被调用
           - 参数3：布尔值，是否在捕获阶段触发事件,这里选择true
               但是一般情况下我们不这样做
      - 在IE8-中不存在捕获阶段，只有冒泡执行

```
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
        <style type="text/css">
            
            #box1{
                width:300px;
                height: 300px;
                background-color: #fffgreen;
            }
            #box2{
                width:200px;
                height: 200px;
                background-color: #fff;
            }
            #box3{
                width:150px;
                height: 150px;
                background-color: skyblue;
            }
        </style>
        <script type="text/javascript">
            
            window.onload = function(){
                /*
                 * 分别为三个div绑定单击响应函数
                 */
                var box1 = document.getElementById('box1');
                var box2 = document.getElementById('box2');
                var box3 = document.getElementById('box3');
                band(box1,'click',function(){
                    alert('我是box1的响应函数');
                });
                band(box2,'click',function(){
                    alert('我是box2的响应函数');
                });
                band(box3,'click',function(){
                    alert('我是box3的响应函数');
                });
            }
            function band(obj,eventStr,fun){   
                
                if(obj.addEventListener){
                    // 大部分浏览器兼容
                    obj.addEventListener(eventStr,fun,false);
//                  alert('listener');
                }else{ 
                    // IE8-
                    obj.attachEvent("on"+eventStr,fun);
//                  alert('attach');
                }
            }
        </script>
    </head>
    <body>
        <div id="box1">
            <div id="box2">
                <div id="box3">
                    
                </div>
            </div>
        </div>
    </body>
</html>
```

### stopPropagation()
事件到某个节点为止，不再向下传播或者向上冒泡  
事件从父节点到后代节点称作传播，从后代节点到祖先节点称为冒泡  
```
<div id="myDiv">
    哒哒
    <button id='btn'>点我吧</button>
</div>

var div = document.getElementById('myDiv');
div.addEventListener('click',function(){
    console.log('我是div产生的');
},false);
var btn = document.getElementById('btn');
btn.addEventListener('click',function(e){
    console.log('我是btn产生的');
    // 事件不再向上冒泡，不会再执行父节点div中的click函数
    e.stopPropagation();
},false);

<!-- 点击btn后产生的结果：
我是btn产生的
 -->
```

但是它只能阻止这个事件的传播，如果我们为其click函数添加其他的回调函数，则依然会触发  
```
var btn = document.getElementById('btn');
btn.addEventListener('click',function(e){
    console.log('我是btn产生的');
    e.stopPropagation();
},false);
btn.addEventListener('click',function(){
    console.log('我是后面添加的');
},false);
/*
我是btn产生的
我是后面添加的
 */
```

### stopImmediatePropagation()
彻底取消该事件，后面再给该节点添加click函数也不会触发其他的回调函数  
```
var btn = document.getElementById('btn');
btn.addEventListener('click',function(e){
    console.log('我是btn产生的');
    e.stopImmediatePropagation();
},false);
btn.addEventListener('click',function(){
    console.log('我是后面添加的');
},false);
/*
我是btn产生的
 */
```

# 拖拽练习

    目标：使得box1可以被鼠标拖拽
        - 1. 鼠标在元素上按下时，开始拖拽    onmousedown
        - 2. 鼠标移动时，被拖拽元素跟随鼠标移动  onmousemove
        - 3. 鼠标松开时，被拖拽元素固定在当前位置   onmouseup

```
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
        <style type="text/css">
            #box1{
                width: 100px;
                height: 100px;
                background-color: red;
                position: absolute;
            }
            #box2{
                width: 100px;
                height: 100px;
                background-color: #fff;
                position: absolute;
                left:200px;
                top: 200px;
            }
        </style>
        <script type="text/javascript">
            window.onload = function(){
                // 获取鼠标对象
                var box1 = document.getElementById('box1');
                // 感知鼠标键按下
                box1.onmousedown = function(){
                    
                    document.onmousemove = function(event){
                        // 解决兼容问题
                        event = event || window.event;
                        // 鼠标移动时，被拖拽元素跟随鼠标移动
                        // 获取鼠标的坐标
                        var left = event.clientX;
                        var top = event.clientY;
                        // 修改box1的位置
                        box1.style.left = left +"px";
                        box1.style.top = top +"px";
                        
                    }
                    
                    // 鼠标松开事件 需要将事件绑定给document
                    document.onmouseup = function(){
                        // 鼠标松开时，被拖拽元素固定在当前位置
                        // 取消document.onmousemove事件
                        document.onmousemove = null;
                        /*alert('onmouseup触发了');*/
                        // 这里需要将onmouseup事件取消掉，
                        // 否则在其他界面点击也会出现alert的内容
                        document.onmouseup = null;
                    } 
                }
            }
        </script>
    </head>
    <body>
        <div id="box1">
                    
        </div>
        <div id="box2">
                    
        </div>
    </body>
</html>
```
# 拖拽练习改进1：

    目标：使得拖拽时鼠标和元素的相对位置保持不变
        - 之前鼠标指针的位置总会跳转到元素的左上方
    我们的思路：
        在鼠标按下时，先得到鼠标按下时鼠标与元素位置的偏移量：
            偏移量 = 鼠标.clientX-元素.offsetLeft

        在鼠标移动时，获取鼠标的位置，然后再固定元素的位置：
            元素.style.left = 鼠标.clientX - ol +"px";
            元素.style.top = 鼠标.clientX - ot +"px";

```
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
        <style type="text/css">
            #box1{
                width: 100px;
                height: 100px;
                background-color: red;
                position: absolute;
            }
            #box2{
                width: 100px;
                height: 100px;
                background-color: #fff;
                position: absolute;
                left:200px;
                top: 200px;
            }
        </style>
        <script type="text/javascript">
            window.onload = function(event){
                
                // 获取鼠标对象
                var box1 = document.getElementById('box1');
                
                // 感知鼠标键按下
                box1.onmousedown = function(event){
                    
                    // 改进1：
                    event = event || window.event;
                
                    // 求解div的偏移量:鼠标指针和box1的左上方那一点的偏移量
                    /* 由于鼠标在按下时，鼠标的坐标和box1左上方的距离就确定了
                     * 所以在鼠标按下的程序中就可以计算得到偏移量了
                     * 偏移量 = 鼠标.clientX-元素.offsetLeft*/
                    var ol = event.clientX - box1.offsetLeft;
                    var ot = event.clientY - box1.offsetTop;
                
                    document.onmousemove = function(event){
                        // 解决兼容问题
                        event = event || window.event;
                        // 鼠标移动时，被拖拽元素跟随鼠标移动
                        // 获取鼠标的坐标
                        var left = event.clientX;
                        var top = event.clientY;
                        
                        // 改进2：
                        // 修改box1的位置：保证box1和鼠标的相对位置保持不变
                         /* 由于鼠标的位置我们无法控制，所以我们需要控制box1的位置
                          * 又box1总是会偏到鼠标的右下方，所以需要使用减法
                          * 需要将多出的偏移量去掉*/
                        box1.style.left = left - ol +"px";
                        box1.style.top = top - ot +"px";   
                        
                    }
                    
                    // 鼠标松开事件 需要将事件绑定给document
                    document.onmouseup = function(){
                        // 鼠标松开时，被拖拽元素固定在当前位置
                        // 取消document.onmousemove事件
                        document.onmousemove = null;
                        /*alert('onmouseup触发了');*/
                        // 这里需要将onmouseup事件取消掉，
                        // 否则在其他界面点击也会出现alert的内容
                        document.onmouseup = null;
                    } 
                }
            }
        </script>
    </head>
    <body>
        <div id="box1">
                    
        </div>
        <div id="box2">
                    
        </div>
    </body>
</html>
```

# 拖拽练习改进2

    当我们拖拽网页中的文字内容时，浏览器会自动去搜索引擎中搜索内容
     这会导致拖拽异常，这是浏览器的默认行为，如果不希望发生
      return false即可，但是这IE9+

解决IE8-：

    使用setCapture()方法：这个方法一旦给X元素用上
     则这个页面内的其余元素的相同事件也会变成X元素的函数
     即点击任何元素均会响应X元素的函数
     所以就需要在鼠标按下之后就设置：box1.setCapture()
     然后在鼠标弹起之后，释放此次事件的捕获 box1.releaseCapture()

```
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
        <style type="text/css">
            #box1{
                width: 100px;
                height: 100px;
                background-color: red;
                position: absolute;
            }
            #box2{
                width: 100px;
                height: 100px;
                background-color: #fff;
                position: absolute;
                left:200px;
                top: 200px;
            }
        </style>
        <script type="text/javascript">
            window.onload = function(event){
                
                // 获取鼠标对象
                var box1 = document.getElementById('box1');
                
                // 感知鼠标键按下
                box1.onmousedown = function(event){
                    
                    // IE8-
                    if(box1.setCapture){
                        box1.setCapture();
                    }
                    event = event || window.event;
                
                    // 求解div的偏移量:鼠标指针和box1的左上方那一点的偏移量
                    /* 由于鼠标在按下时，鼠标的坐标和box1左上方的距离就确定了
                     * 所以在鼠标按下的程序中就可以计算得到偏移量了
                     * 偏移量 = 鼠标.clientX-元素.offsetLeft*/
                    var ol = event.clientX - box1.offsetLeft;
                    var ot = event.clientY - box1.offsetTop;
                
                    document.onmousemove = function(event){
                        // 解决兼容问题
                        event = event || window.event;
                        // 鼠标移动时，被拖拽元素跟随鼠标移动
                        // 获取鼠标的坐标
                        var left = event.clientX;
                        var top = event.clientY;
                        
                        
                        // 修改box1的位置：保证box1和鼠标的相对位置保持不变
                         /* 由于鼠标的位置我们无法控制，所以我们需要控制box1的位置
                          * 又box1总是会偏到鼠标的右下方，所以需要使用减法
                          * 需要将多出的偏移量去掉*/
                        box1.style.left = left - ol +"px";
                        box1.style.top = top - ot +"px";   
                        
                    }
                    
                    // 鼠标松开事件 需要将事件绑定给document
                    document.onmouseup = function(){

                        // 鼠标松开时，被拖拽元素固定在当前位置
                        // 取消document.onmousemove事件
                        document.onmousemove = null;
                        
                        // IE8-
                        if(box1.releaseCapture){
                            box1.releaseCapture();
                        }
                        /*alert('onmouseup触发了');*/
                        // 这里需要将onmouseup事件取消掉，
                        // 否则在其他界面点击也会出现alert的内容
                        document.onmouseup = null;
                    } 
                    
                    // 改进1:
                    
                    // IE9+
                    return false;
                    
                }
            }
        </script>
    </head>
    <body>
        <p style="position: absolute;">
            我是一段文字
        </p>
        <div id="box1">
                    
        </div>
        <div id="box2">
                    
        </div>
    </body>
</html>
```

# 拖拽练习改进3：

    目标：
        在上面的内容中，我们只是拖动了box1,如果我们需要同样拖动
        box2,就需要复制box1的事件给box2,这太麻烦了

        所以我们考虑提取一个专门用于拖拽的函数
        这样无论以后我们需要拖拽任何的元素，尽可以直接调用drag函数

```
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
        <style type="text/css">
            #box1{
                width: 100px;
                height: 100px;
                background-color: red;
                position: absolute;
            }
            #box2{
                width: 100px;
                height: 100px;
                background-color: #fff;
                position: absolute;
                left:200px;
                top: 200px;
            }
        </style>
        <script type="text/javascript">
            
            /*
                 *  目标：
                 *   在上面的内容中，我们只是拖动了box1,如果我们需要同样拖动
                 *   box2,就需要复制box1的事件给box2,这太麻烦了
                 * 
                 *   所以我们考虑提取一个专门用于拖拽的函数
                 *      这样无论以后我们需要拖拽任何的元素，尽可以直接调用drag函数
                 */
                
            window.onload = function(event){
                
                // 获取鼠标对象
                var box1 = document.getElementById('box1');
                var box2 = document.getElementById('box2');
                var p = document.getElementsByTagName('p');
                drag(box1);
                drag(box2);
            }
            
            function drag(obj){
                obj.onmousedown = function(event){
                    
                    // IE8-
                    if(obj.setCapture){
                        obj.setCapture();
                    }
                    event = event || window.event;
                
                    // 求解div的偏移量:鼠标指针和box1的左上方那一点的偏移量
                    /* 由于鼠标在按下时，鼠标的坐标和box1左上方的距离就确定了
                     * 所以在鼠标按下的程序中就可以计算得到偏移量了
                     * 偏移量 = 鼠标.clientX-元素.offsetLeft*/
                    var ol = event.clientX - obj.offsetLeft;
                    var ot = event.clientY - obj.offsetTop;
                
                    document.onmousemove = function(event){
                        // 解决兼容问题
                        event = event || window.event;
                        // 鼠标移动时，被拖拽元素跟随鼠标移动
                        // 获取鼠标的坐标
                        var left = event.clientX;
                        var top = event.clientY;
                        
                        
                        // 修改box1的位置：保证box1和鼠标的相对位置保持不变
                         /* 由于鼠标的位置我们无法控制，所以我们需要控制box1的位置
                          * 又box1总是会偏到鼠标的右下方，所以需要使用减法
                          * 需要将多出的偏移量去掉*/
                        obj.style.left = left - ol +"px";
                        obj.style.top = top - ot +"px";   
                        
                    }
                    
                    // 鼠标松开事件 需要将事件绑定给document
                    document.onmouseup = function(){

                        // 鼠标松开时，被拖拽元素固定在当前位置
                        // 取消document.onmousemove事件
                        document.onmousemove = null;
                        
                        // IE8-
                        if(obj.releaseCapture){
                            obj.releaseCapture();
                        }
                        /*alert('onmouseup触发了');*/
                        // 这里需要将onmouseup事件取消掉，
                        // 否则在其他界面点击也会出现alert的内容
                        document.onmouseup = null;
                    } 
                    
                    // 改进1:
                    
                    // IE9+
                    return false;
                    
                }
            }
        </script>
    </head>
    <body>
        <p>
            我是一段文字
        </p>
        <div id="box1">
                    
        </div>
        <div id="box2">
                    
        </div>
    </body>
</html>
```


# 滚轮事件

    目标：
    当鼠标滚轮在box1上向下滑动时，box1的长度增大
        当鼠标滚轮向下滑动时，box1的长度减小

    第一步：onmousewheel:感知鼠标滚轮是否滚动
        - 火狐不支持该属性，需要使用DOMMouseScroll 来绑定滚动事件
        并且该事件需要使用addEventListener()函数来绑定
        band(box1,'onmousewheel',fun);

    第二步：判断鼠标滚轮滚动的方向event.wheelDelta
        值大于0表示向上滑动，小于0表示向下滑动
            但是火狐中不支持这个属性
            火狐中使用event.detail:向下滚动：3
                    向上滚：-3

    注意：
    当我们将body的height调大之后，在滑动滚动条之后，整个页面向上滑动了
        导致box1消失在了当前的可见页面中，需要解决这个问题
        这是浏览器的默认行为，需要取消掉 return false

    但是由于火狐中使用的是band函数，其中使用的是addEventLisenter()方法，
        取消默认行为时不能使用return false
        需要使用event来取消默认行为：event.preventDefault();

```
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>滚轮</title>
        <style type="text/css">
            #box1{
                width: 100px;
                height: 100px;
                background-color: red;
            }
        </style>
        <script type="text/javascript">
            
            window.onload = function(){
                /*
                 * 当鼠标滚轮在box1上向下滑动时，box1的长度增大
                 * 当鼠标滚轮向下滑动时，box1的长度减小
                 */
                
                // 1.获取box1对象
                var box1 = document.getElementById('box1');
                
                // 2.为box1绑定一个鼠标滚轮滚动的事件
                /*
                 * onmousewheel:感知鼠标滚轮是否滚动
                 *  - 火狐不支持该属性，需要使用DOMMouseScroll 来绑定滚动事件
                 *      并且该事件需要使用addEventListener()函数来绑定
                 *      band(box1,'onmousewheel',fun);
                 */
                // 3.为除火狐之外的浏览器绑定滚轮事件
                box1.onmousewheel = function(event){
                    
                    /* 当鼠标滚轮在box1上向下滑动时，box1的长度增大
                     * 当鼠标滚轮向下滑动时，box1的长度减小 */
                    
                    event = event || window.event;
                    
                    // 4. 判断鼠标滚轮滚动的方向event.wheelDelta
                    /*值大于0表示向上滑动，小于0表示向下滑动
                     *      但是火狐中不支持这个属性
                     *      火狐中使用event.detail:向下滚动：3
                     *                               向上滚：-3
                     */
//                  alert(event.wheelDelta);
                    if(event.wheelDelta>0){
                        // 向上滑动,box1变短
                        if(box1.clientHeight > 10){
                            // 设置box1的最小高度为10
                            box1.style.height = box1.clientHeight - 10 + "px";
                        }
                    }else{
                        // 向下滑动，box1变长
                        box1.style.height = box1.clientHeight + 10 + "px";
                    }
                    
                    // 5. 取消默认行为
                    return false;
                };
                
                // 3.为火狐绑定滚轮事件
                band(box1,'DOMMouseScroll',function(){
                    /*
                     * 火狐中使用event.detail:向下滚动：3
                     *                      向上滚：-3 */
                    // 4. 判断滚轮的方向
                    if(event.detail < 0){
                        // 向上滑动,box1变短
                        if(box1.clientHeight > 10){
                            // 设置box1的最小高度为10
                            box1.style.height = box1.clientHeight - 10 + "px";
                        }
                    }else{
                        // 向下滑动，box1变长
                        box1.style.height = box1.clientHeight + 10 + "px";
                    }
                    
                    // 5.取消默认行为
                    event.preventDefault();
                });
                
                
                /*
                 * 问题5：
                 * 1,2,3,4步骤结束之后发现一个问题：
                 *      当我们将body的height调大之后，在滑动滚动条之后，整个页面向上滑动了
                 *      导致box1消失在了当前的可见页面中，需要解决这个问题
                 *      这是浏览器的默认行为，需要取消掉 return false
                 * 
                 * 但是由于火狐中使用的是band函数，其中使用的是addEventLisenter()方法，
                 * 取消默认行为时不能使用return false
                 * 需要使用event来取消默认行为
                 */
                
            };
            function band(obj,eventStr,fun){   
                // 为了兼容所有浏览器
                if(obj.addEventListener){
                    // 大部分浏览器兼容
                    obj.addEventListener(eventStr,fun,false);
//                  alert('listener');
                }else{ 
                    // IE8-
                    obj.attachEvent("on"+eventStr,fun);
//                  alert('attach');
                }
            }
        </script>
        
    </head>
    <body style="height: 2000px;">
        <div id="box1" ></div>
    </body>
</html>
```

```
上述冗余代码的改进：
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>滚轮</title>
        <style type="text/css">
            #box1{
                width: 100px;
                height: 100px;
                background-color: red;
            }
        </style>
        <script type="text/javascript">
            /*
             * 1中我们为火狐和其他浏览器定义了两种方法，内容出现了冗余
             *      这里重新整理一下
             */
            window.onload = function(){
                /*
                 * 当鼠标滚轮在box1上向下滑动时，box1的长度增大
                 * 当鼠标滚轮向下滑动时，box1的长度减小
                 */
                
                // 1.获取box1对象
                var box1 = document.getElementById('box1');
                
                // 2.为box1绑定一个鼠标滚轮滚动的事件
                /*
                 * onmousewheel:感知鼠标滚轮是否滚动
                 *  - 火狐不支持该属性，需要使用DOMMouseScroll 来绑定滚动事件
                 *      并且该事件需要使用addEventListener()函数来绑定
                 *      band(box1,'onmousewheel',fun);
                 */
                // 3.为除火狐之外的浏览器绑定滚轮事件
                box1.onmousewheel = function(event){
                    
                    /* 当鼠标滚轮在box1上向下滑动时，box1的长度增大
                     * 当鼠标滚轮向下滑动时，box1的长度减小 */
                    
                    event = event || window.event;
                    
                    // 4. 判断鼠标滚轮滚动的方向event.wheelDelta  支持除了火狐之外的浏览器
                    /*值大于0表示向上滑动，小于0表示向下滑动
                     *      但是火狐中不支持这个属性
                     *      火狐中使用event.detail:向下滚动：3
                     *                               向上滚：-3
                     */
                    
                    if(event.wheelDelta>0 || event.detail < 0){
                        // 向上滑动,box1变短
                        if(box1.clientHeight > 10){
                            // 设置box1的最小高度为10
                            box1.style.height = box1.clientHeight - 10 + "px";
                        }
                    }else{
                        // 向下滑动，box1变长
                        box1.style.height = box1.clientHeight + 10 + "px";
                    }

                };
                
                // 3.为火狐绑定滚轮事件
                band(box1,'DOMMouseScroll',box1.onmousewheel);
                
                
                /*
                 * 问题5：
                 * 1,2,3,4步骤结束之后发现一个问题：
                 *      当我们将body的height调大之后，在滑动滚动条之后，整个页面向上滑动了
                 *      导致box1消失在了当前的可见页面中，需要解决这个问题
                 *      这是浏览器的默认行为，需要取消掉 return false
                 * 
                 * 但是由于火狐中使用的是band函数，其中使用的是addEventLisenter()方法，
                 * 取消默认行为时不能使用return false
                 * 需要使用event来取消默认行为
                 */
                
            };
            function band(obj,eventStr,fun){   
                // 为了兼容所有浏览器
                if(obj.addEventListener){
                    // 大部分浏览器兼容
                    obj.addEventListener(eventStr,fun,false);
//                  alert('listener');
                }else{ 
                    // IE8-
                    obj.attachEvent("on"+eventStr,fun);
//                  alert('attach');
                }
            }
        </script>
        
    </head>
    <body style="height: 2000px;">
        <div id="box1" ></div>
    </body>
</html>
```

# 键盘移动div

    目标：
    按下左键：box1向左移动
    同理：按上下左右，box1向上下左右方向移动

    注意：
        定义一个移动变量，规定移动的速度


```
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
        <script type="text/javascript">
            window.onload = function(){
                /*
                 * 按下左键：box1向左移动
                 * 同理：按上下左右，box1向上下左右方向移动
                 */
                // 获取box1对象
                var box1 = document.getElementById('box1');
                document.onkeydown = function(event){
                    
                    event = event || window.event;
//                  console.log(event.keyCode);

                    // 定义一个移动变量，规定移动的速度
                    var speed = 10;
                    
                    // 如果按下ctrl键加快移动速度
                    if(event.ctrlKey){
                        speed = 50;
                    }
                    
                    // 判断哪个方向键按下
                    if(event.keyCode == 37){
                        //按下左键，box1向左移动
                        box1.style.left = box1.offsetLeft - speed +'px';
                        
                    }
                    if(event.keyCode == 39){
                        //按下右键，box1向右移动
                        box1.style.left = box1.offsetLeft + speed +'px';
                    }
                    if(event.keyCode == 38){
                        //按下上键，box1向上移动
                        box1.style.top = box1.offsetTop - speed +'px';
                    }
                    if(event.keyCode == 40){
                        //按下下键，box1向下移动
                        box1.style.top = box1.offsetTop + speed +'px';
                    }
                
                } 
                    
                document.onkeyup = function(){
                    
                    
                }
            }
        </script>
    </head>
    <body>
        <div id="box1" style="height: 100px;width: 100px;background-color: red;position: absolute;"></div>
    </body>
</html>
```

# 十四、Bom[∧](#0)<div id="14"></div>
# BOM：Broswer Object Module浏览器对象模型

    - 可以通过JS操作浏览器
    - 在BOM中提供了一组对象，完成对浏览器的操作
    - BOM对象：这里描述使用的是大写，实际的对象操作时使用的是小写
      Window
          - 代表整个浏览器的窗口，同时window也是网页作用域中的全局对象
      Navigator
          - 代表当前浏览器的信息，通过该对象可以识别不同的浏览器
      Location
          - 代表当前浏览器的地址栏信息，通过这个对象可以获取地址栏信息或者跳转页面
      History
          - 代表浏览器的历史记录，可以通过该对象操作浏览器的历史记录
          - 由于隐私原因，该对象不能获取具体的历史记录，只能操作浏览器向前或者后退
              而且该操作只在当次访问时有效
      Screen
          - 代表用于的屏幕信息，可以获取到用于的显示器的相关信息，pc端用的少

```
- Navigator、Location、History、Screen均作为window对象的属性存在
可以通过window对象使用，也可以直接使用
    例如window.navigator或者navigator
      
      console.log(window);
      console.log(window.navigator); 
      console.log(navigator); 
      
```

## 1 Navigator:

```
 navigator:代表当前浏览器的信息，通过该对象可以识别不同的浏览器
  - 由于历史原因，navigator中的大部分属性均不可以帮我们识别浏览器

  - 一般我们只会使用userAgent来判断浏览器的信息
      userAgent就是一个字符串，其中包含浏览器的信息，不同的浏览器内容不同

          IE11：Mozilla5.0 (Windows NT 10.0; WOW64; Trident7.0; .NET4.0C; .NET4.0E; rv:11.0) like Gecko
              - 在11中已经将微软和IE相关的标识祛除了，所以基本不能通过UserAgent来识别IE11浏览器
              - 因为IE想说明自身和其他的浏览器无差别了
              - 所以不能通过userAgent判断
          IE8：Mozilla4.0 (compatible; MSIE 8.0; Windows NT 10.0; WOW64; Trident7.0; .NET4.0C; .NET4.0E)
          火狐：Mozilla5.0 (Windows NT 10.0; Win64; x64; rv:74.0) Gecko20100101 Firefox74.0
          chrome:Mozilla5.0 (Windows NT 6.3; WOW64) AppleWebKit537.36 (KHTML, like Gecko) Chrome35.0.1916.138 Safari537.36
```


```
<!DOCTYPE html>
<html>
      <head>
            <meta charset="utf-8" >
            <title><title>
            <script type="textjavascript">
                  var ua = navigator.userAgent;
                  
                   判断是否是火狐浏览器
                  if(firefoxi.test(ua)){
                        alert('你是火狐');
                  }else if(chromei.test(ua)){
                        alert('你是chrome');
                  }else if(MSIEi.test(ua)){
                         IE10-
                        alert('你是IE');
                  }else if("ActiveXObject" in window){
                         这个属性是IE特有的，但是不能使用window.ActiveXObject判断
                         因为IE11发现很多人都使用这个方式判断，就将其返回值设为了false
                         检查window是否包含这个属性，有就是IE，否则就不是
                         由于之前已经用正则字符串判断过IE的其他版本了
                         根据语句的执行顺序，则这种情况下只能是IE11
                        alert('你是IE11');
                  }
                  
            <script>
      <head>
      <body>
            
      <body>
<html>
```

## 2History

```
- 代表浏览器的历史记录，可以通过该对象操作浏览器的历史记录
   - 由于隐私原因，该对象不能获取具体的历史记录，只能操作浏览器向前或者后退
     而且该操作只在当次访问时有效

  - 属性：
     length:当前浏览器从打开到访问的页面的个数
       中间穿插着打开一个界面两次相当于两次
     back():回退到上一个界面，和浏览器的回退按钮一样
     forward():跳转到下一个界面，和浏览器的前进按钮一样
     history.go(number|URL)：number指的是向前跳转number个页面
       -1：向后跳转一个界面
       1：向前跳转一个界面
```

```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>History<title>
    <script type="textjavascript">

      window.onload = function(){
        var btn = document.getElementById('btn');
        btn.onclick = function(){
          console.log(history.length);
          history.back();
          history.forward();
          history.go(2);   直接跳转到test02
        }
      }
      
    <script>
  <head>
  <body>  
    <h1>History<h1>
    <button id="btn">点我一下<button>
    <a href="test01.html">我是超链接<a>
  <body>
<html>
```


## 3Location

```
- 封装了地址栏的信息

- location对象的属性：
    属性名   举例      作用
    hash "#contents" 返回URL中的hash（#号后跟零或多个字符），如果URL
    中不包含散列，则返回空字符串
    host "www.wrox.com:80" 返回服务器名称和端口号（如果有）
    hostname "www.wrox.com" 返回不带端口号的服务器名称
    href "http:/www.wrox.com" 返回当前加载页面的完整URL。而location对象的
    toString()方法也返回这个值
    pathname "/WileyCDA/" 返回URL中的目录和（或）文件名
    port "8080" 返回URL中指定的端口号。如果URL中不包含端口号，则
    这个属性返回空字符串
    protocol "http:" 返回页面使用的协议。通常是http:或https:
    search "?q=javascript" 返回URL的查询字符串。这个字符串以问号开头

- 修改当前页面的url,会生成历史记录

   1.使用完整路径修改
  location = 'http:www.baidu.com';
   2. 使用相对路径修改
  location = '01.BOM---Navigator.html';
  
  assign():跳转到其他界面,作用和location一样
      - 会生成历史记录
  location.assign('http:www.baidu.com');
  
   reload():重新加载当前文档,就是刷新
   但是由于浏览器的一些设置，当我们在文档的文本框中
   输入文字时，刷新也会保存
   为了不保存，可以在reload中加入true,这样会强制清空
   缓存
   location.reload(true);

   replace()：用新的文档代替当前文档，不会生成历史记录
      - 直接取代了当前页面，导致不能返回前一个界面
```

```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title><title>
    <script type="textjavascript">
      
        Location:
         - 封装了地址栏的信息
         - 
      window.onload = function(){
        
        var btn = document.getElementById('btn');
        btn.onclick = function(){
           直接获取当前页面的完整url
          alert(location);
          
           修改当前页面的url,会生成历史记录
          
           1.使用完整路径修改
          location = 'http:www.baidu.com';
           2. 使用相对路径修改
          location = '01.BOM---Navigator.html';
          
           assign():跳转到其他界面,作用和location一样，会生成历史记录
          location.assign('http:www.baidu.com');
          
           reload():重新加载当前文档,就是刷新
          location.reload();
          
          replace()：用新的文档代替当前文档，不会生成历史记录
           直接取代了当前页面，导致不能返回前一个界面
          location.replace('http:www.baidu.com');
        }
      }
    <script>
  <head>
  <body>
    <button id="btn">点我一下<button>
  <body>
<html>
```

## 4定时器
```
- var timer = setInterval(fun,second) ;
  定时调用，将一个函数每隔一段时间(毫秒)执行一次
  会返回一个number类型的数据timer，这个数字表示定时器的唯一标识，1号定时器，2号,...
  
- clearInterval(timer标识)：关闭某个定时器
  它可以接收任何参数，比如none,undefined
  如果参数是有效的定时器标识，则停止该定时器
  如果参数无效，则无任何作用
```

```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title><title>
    <script type="textjavascript">
      window.onload = function(){
        
         获取count对象
        var count = document.getElementById('count');
         使count中的内容自动切换
        var i = 0;
        var timer = setInterval(function(){
          count.innerHTML = i++;
          
           关闭定时器
          if(i == 11){
            clearInterval(1);
          }
        },500);
        
         输出这个定时器的标识符
        console.log(timer);  
      }
    <script>
  <head>
  <body>
    <h1 id="count"><h1>
  <body>
<html>
```

## 5 切换图片练习
```
  开启一个定时器，自动切换图片
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title><title>
    <style type="textcss">
      {
        margin: 0px;
        padding: 0px;
      }
      img{
        display: block;
        height: 500px;
        width: 500px;
        margin: 100px auto;
      }
    <style>
    <script type="textjavascript">
      window.onload = function(){
        获取图片对象
        var img = document.getElementsByTagName('img')[0];
        
         创建一个数组来保存图片的路径
        var imgArr = ["img1.jpg","img2.jpg","img3.jpg","img4.jpg"];
        
         创建一个变量保存当前正在显示的图片的Index，默认为0
        var index = 0;
        
         创建一个变量保存定时器的标识
        var timer;
        
        var btn01 = document.getElementById('btn01');
        btn01.onclick = function(){
          
          
           开启一个定时器，自动切换图片
          
            由于定时器位于按钮1的单击函数中，所以我们每点击一次就会出现开启一个
               定时器，当我们开启多个时，就相当于有10个定时器在切换图片，而由
               于这10个定时器的开启时间不一样，所以就会加快图片切换的速度
            
            并且在这样的情况下由于我们只保存了最新的timer,所以只能关闭最后一次
               开启的定时器，之前的定时器就关不掉了
            
            所以我们需要在开启一个新的定时器之前，关闭之前的定时器，就可以解决问题
           
          
           在给当前元素开启新的定时器之前，需要先关闭该元素上的之前打开的定时器
          clearInterval(timer);
          
          timer = setInterval(function(){
             翻页显示图片
            
            img.src = imgArr[index++];
            if(index >= imgArr.length){
              index = 0;  
            }
             
          },1000);
        }
        
        var btn02 = document.getElementById('btn02');
        btn02.onclick = function(){
           关闭定时器
          clearInterval(timer);  
        }
        
      }
    <script>
  <head>
  <body>
    <img src="img1.jpg" ><br >
    <button id="btn01">开始<button>
    <button id="btn02">结束<button>
  <body>
<html>
```

## 6键盘移动div
```
开启一个定时器控制键盘移动的速度
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title><title>
    <script type="textjavascript">
      window.onload = function() {
        
          按下左键：box1向左移动
          同理：按上下左右，box1向上下左右方向移动
          
          按键结束：停止移动
         
         获取box1对象
        var box1 = document.getElementById('box1');
      
         创建一个变量表示方向，通过修改dir可以直接影响元素的方向
        var dir = 1;
      
         定义一个移动变量，规定移动的速度
        var speed = 10;
      
         开启一个定时器控制box1的移动
        var timer = setInterval(function() {
      
          switch(dir) {
            case 37:
              按下左键，box1向左移动
              box1.style.left = box1.offsetLeft - speed + 'px';
              break;
            case 38:
              按下上键，box1向上移动
              box1.style.top = box1.offsetTop - speed + 'px';
              break;
            case 39:
              按下右键，box1向右移动
              box1.style.left = box1.offsetLeft + speed + 'px';
              break;
            case 40:
              按下下键，box1向下移动
              box1.style.top = box1.offsetTop + speed + 'px';
              break;
          }
      
        }, 50);
      
        document.onkeydown = function(event) {
      
          解决兼容问题
          event = event || window.event;
      
           如果按下ctrl键加快移动速度
          if(event.ctrlKey) {
            speed = 50;
          } else {
            speed = 10;
          }
      
           根据按键确定方向
          dir = event.keyCode;
        }
      
         按键松开时，停止移动
        document.onkeyup = function() {
           设置方向为0
          dir = 0;
        }
      }
    <script>
  <head>
  <body>
    <div id="box1" style="height: 100px;width: 100px;background-color: red;position: absolute;"><div>
  <body>
<html>
```

## 7延时调用
```
开启一个定时器：
      var num = 1
      setInterval(function(){
        console.log(num++);
      },3000); 

延时调用：setTimeout(fun,sec)
      fun不马上执行，隔sec之后再执行，而且只执行一次

停止：clearTimeout()关闭延时调用

```

```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title></title>
    <script type="text/javascript">
    // 3000秒之后调用一次，输出一个1
      setTimeout(function(){
        console.log(1);   
      },3000);
      clearTimeout();     
    </script>
  </head>
  <body>
  </body>
</html>
```

## 8定时器的应用1

```
点击按钮以后box1以特定速度向右移动
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title></title>
    <style type="text/css">
      {
        margin: 0px;
        padding: 0px;
      }
      
      #box1{
        width: 100px;
        height: 100px;
        background-color: red;
        position: absolute;
      }
    </style>
    <script type="text/javascript">
      /
        点击按钮，box1向右移动，移动到left=800px的位置处，停止移动 
       /
      window.onload = function(){
        
        // 获取box1
        var box1 = document.getElementById('box1');
        // 获取btn01
        var btn01 = document.getElementById('btn01');
        
        var timer;
        // 点击按钮以后，box1向右移动，left的值增大
        
        btn01.onclick = function(event){
          event = event || window.event;
          
          clearInterval(timer);
           // 打开一个定时器,执行动画效果
          timer = setInterval(function(){
            ///方法1:
            box1.style.left = box1.offsetLeft + 10 +'px';
            // 当元素移动到800px时，停止执行动画
             if(box1.offsetLeft == 800){
              clearInterval(timer);
             }/
            
            
            /
              方法2：使用我们之前定义的getStyle()函数
              返回left属性值时返回的是px,加10之前需要先将px去掉
              用parseInt属性，后面再给其加上
             /
            var oldValue = parseInt(getStyle(box1,'left'));
            var newValue = oldValue + 13;
            
            // 为了让box1一定停在left=800的位置处，需要在这里做个判断
            if(newValue > 800){
              newValue = 800;
            }
            box1.style.left = newValue + 'px';
            if(newValue == 800){
              clearInterval(timer);
             } 
            
          },30); 
        }
      }
      function getStyle(obj,cssname){
        if(window.getComputedStyle){
          //判断window.getComputedStyle
          // 为true,则表示有getComputedStyle属性
          // 为undefined表示没有，则使用currentStyle属性
          
          // 正常浏览器的方式
          return getComputedStyle(obj,null)[cssname];
        }else{
          // IE8的方式
          return obj.currentStyle[cssname];
        }
      }
    </script>
  </head>
  <body>
    <button id="btn01">点击按钮以后box1向右移动</button>
    <br />
    <div id="box1"></div>
    <div style="width：0;height: 1000px; border-left: 1px black solid;margin-left: 800px;"></div>
  </body>
</html>
```

## 定时器的应用2
```
点击按钮1，box1向右移动，移动到指定的位置处，停止移动 
点击按钮2，box1向左移动，移动到指定的位置处，停止移动
<!DOCTYPE html>
<html>

  <head>
    <meta charset="UTF-8">
    <title></title>
    <style type="text/css">
       {
        margin: 0px;
        padding: 0px;
      }
      
      #box1 {
        width: 100px;
        height: 100px;
        background-color: red;
        position: absolute;
      }
    </style>
    <script type="text/javascript">
      /
        点击按钮1，box1向右移动，移动到指定的位置处，停止移动 
        点击按钮2，box1向左移动，移动到指定的位置处，停止移动
       /
      window.onload = function() {

        // 获取box1
        var box1 = document.getElementById('box1');
        // 获取btn02
        var btn02 = document.getElementById('btn02');
        

        // 点击按钮1以后，box1向右移动，left的值增大
        btn01.onclick = function() {
          clickMove(box1, 800, 10);
        }

        // 点击按钮2以后，box1向左移动
        btn02.onclick = function() {
          clickMove(box1, 0, 10);
        }
      }

      function getStyle(obj, cssname) {
        if(window.getComputedStyle) {
          //判断window.getComputedStyle
          // 为true,则表示有getComputedStyle属性
          // 为undefined表示没有，则使用currentStyle属性

          // 正常浏览器的方式
          return getComputedStyle(obj, null)[cssname];
        } else {
          // IE8的方式
          return obj.currentStyle[cssname];
        }
      }

      var timer;
      /
        clickMove函数:
           参数1：obj,移动哪一个对象
           参数2：target,box1移动的距离，停止移动的位置
           参数3：speed,移动的速度，大于0的值
       /
      function clickMove(obj, target, speed) {
        
        // 獲取目標的當前位置
        var current = parseInt(getStyle(obj, 'left'));
        
        // 判斷box1的位置大於目標位置則將speed取負
        if(current > target){
          speed = -speed;
        }
        
        clearInterval(timer);
        // 打开一个定时器,执行动画效果
        timer = setInterval(function() {
          ///方法1:
              obj.style.left = obj.offsetLeft + speed +'px';
              // 当元素移动到800px时，停止执行动画
               if(obj.offsetLeft == target){
                clearInterval(timer);
               }/

          /
            方法2：使用我们之前定义的getStyle()函数
            返回left属性值时返回的是px,加10之前需要先将px去掉
            用parseInt属性，后面再给其加上
           /
          var oldValue = parseInt(getStyle(obj, 'left'));
          var newValue = oldValue + speed;

          // 为了让box1一定停在left=target的位置处，需要在这里做个判断
          if((newValue > target && speed) > 0 || (newValue < target && speed < 0)) {
            newValue = target;
          }
          obj.style.left = newValue + 'px';
          if(newValue == target) {
            clearInterval(timer);
          }

        }, 30);
      }
    </script>
  </head>

  <body>
    <button id="btn01">点击按钮以后box1向右移动</button>
    <button id="btn02">点击按钮以后box1向左移动</button>
    <br />
    <div id="box1"></div>
    <div style="width：0;height: 1000px; border-left: 1px black solid;margin-left: 800px;"></div>
  </body>

</html>
```

## 8定时器的应用3
```
目标：
    加入一個新的元素，box2,點擊按鈕1box2向右移動
    由於之前我們是定義了一個全局變量timer來記錄定時器的標識的
 所以整個系統中只會存在一個定時器，當我們使用clickMove()為btn03添加
 單擊響應函數時，會導致點擊btn03後，box1不動了
 
 所以我們需要將timer設置為每個需要移動的元素的一個屬性
    obj.timer = setInterval()
    並且在關閉時也指定關閉哪個元素的定時器
      clearInterval(obj.timer)
```

```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title></title>
    <style type="text/css">
       {
        margin: 0px;
      a padding: 0px;
      }
      
      #box1 {
        left: 0;
        width: 100px;
        height: 100px;
        background-color: red;
        position: absolute;
      }
      #box2 {
        width: 100px;
        height: 100px;
        background-color: #fff;
        position: absolute;
        top: 200px;
        left: 0;
      }
    </style>
    <script type="text/javascript">

      window.onload = function() {

        // 获取box1
        var box1 = document.getElementById('box1');
        // 获取box2
        var box2 = document.getElementById('box2');
        
        // 获取btn01
        var btn01 = document.getElementById('btn01');
        // 获取btn02
        var btn02 = document.getElementById('btn02');
        // 获取btn03
        var btn03 = document.getElementById('btn03');
        // 获取btn04
        var btn04 = document.getElementById('btn04');
        

        // 点击按钮1以后，box1向右移动，left的值增大
        btn01.onclick = function() {
          clickMove(box1, 'left', 800, 10);
        }

        // 点击按钮2以后，box1向左移动
        btn02.onclick = function() {
          clickMove(box1, 'width', 0, 10);
        }
        
        // 点击按钮3以后，box2向右移动
        btn03.onclick = function() {
          clickMove(box2, 'height', 800, 10);
        }
        
      }

      function getStyle(obj, cssname) {
        if(window.getComputedStyle) {
          //判断window.getComputedStyle
          // 为true,则表示有getComputedStyle属性
          // 为undefined表示没有，则使用currentStyle属性

          // 正常浏览器的方式
          return getComputedStyle(obj, null)[cssname];
        } else {
          // IE8的方式
          return obj.currentStyle[cssname];
        }
      }

      
      /
        clickMove函数:
           参数1：obj,移动哪一个对象
           參數3：target,box1移动的距离，停止移动的位置
           参数4：speed,移动的速度，大于0的值
       /
      function clickMove(obj, attr, target, speed) {
        
        // 獲取目標的當前位置
        var current = parseInt(getStyle(obj,'left'));
        
        // 判斷box1的位置大於目標位置則將speed取負
        if(current > target){
          speed = -speed;
        }
         
        clearInterval(obj.timer);
        // 打开一个定时器,执行动画效果
        obj.timer = setInterval(function() {
          ///方法1:
              obj.style.left = obj.offsetLeft + speed +'px';
              // 当元素移动到800px时，停止执行动画
               if(obj.offsetLeft == target){
                clearInterval(timer);
               }/

          /
            方法2：使用我们之前定义的getStyle()函数
            返回left属性值时返回的是px,加10之前需要先将px去掉
            用parseInt属性，后面再给其加上
           /
          var oldValue = parseInt(getStyle(obj, 'left'));
          var newValue = oldValue + speed;

          // 为了让box1一定停在left=target的位置处，需要在这里做个判断
          if((newValue > target && speed) > 0 || (newValue < target && speed < 0)) {
            newValue = target;
          }
          obj.style.left = newValue + 'px';
          if(newValue == target) {
            clearInterval(obj.timer);
          } 

        }, 30);
      }
    </script>
  </head>

  <body>
    <button id="btn01">点击按钮以后box1向右移动</button>
    <button id="btn02">点击按钮以后box1向左移动</button>
    <button id="btn03">点击按钮以后box2向右移动</button>
    <br />
    <div id="box1"></div>
    <div id="box2"></div>
    <div style="width：0;height: 1000px; border-left: 1px black solid;margin-left: 800px;"></div>
  </body>

</html>
```

## 8定时器的应用4
```
- 設定一個測試按鈕
  - 改變之前設定的clickMove()函數
    增加一個參數attr,使其既可以改變box2的向left移动,也可以改變动画的宽度width,...
    並且增加一個可選的callback參數，在clickMove()函數執行完之後執行
```

```
<!DOCTYPE html>
<html>

  <head>
    <meta charset="UTF-8">
    <title></title>
    <style type="text/css">
       {
        margin: 0px;
        padding: 0px;
      }
    
      #box2 {
        width: 100px;
        height: 100px;
        background-color: #fff;
        position: absolute;
        top: 200px;
        left: 0;
      }
    </style>
    <script type="text/javascript">
    
      window.onload = function() {

        // 获取box2
        var box2 = document.getElementById('box2');
        
        // 获取btn04
        var btn04 = document.getElementById('btn04');
      
        // 点击按钮4以后，box2向右移动
        btn04.onclick = function() {
          clickMove(box2, 'width', 800, 10, function(){
            // 動畫執行完畢之後執行
            clickMove(box2, 'height', 400, 10, function(){
              
            });  
          });
        }
      }

      function getStyle(obj, cssname) {
        if(window.getComputedStyle) {
          //判断window.getComputedStyle
          // 为true,则表示有getComputedStyle属性
          // 为undefined表示没有，则使用currentStyle属性

          // 正常浏览器的方式
          return getComputedStyle(obj, null)[cssname];
        } else {
          // IE8的方式
          return obj.currentStyle[cssname];
        }
      }

      
      /
        clickMove函数:
           参数1：obj,移动哪一个对象
           参数2：attr,要執行的動畫的樣式，比如left,top,width,height...
           參數3：target,box1移动的距离，停止移动的位置
           参数4：speed,移动的速度，大于0的值
           參數5：callback,這個函數會在動畫執行完之後執行
       /
      function clickMove(obj, attr, target, speed, callback) {
        
        // 獲取目標的當前位置
        var current = parseInt(getStyle(obj, attr));
        
        // 判斷box1的位置大於目標位置則將speed取負
        if(current > target){
          speed = -speed;
        }
         
        clearInterval(obj.timer);
        // 打开一个定时器,执行动画效果
        obj.timer = setInterval(function() {
          ///方法1:
              obj.style.left = obj.offsetLeft + speed +'px';
              // 当元素移动到800px时，停止执行动画
               if(obj.offsetLeft == target){
                clearInterval(timer);
               }/

          /
            方法2：使用我们之前定义的getStyle()函数
            返回left属性值时返回的是px,加10之前需要先将px去掉
            用parseInt属性，后面再给其加上
           /
          var oldValue = parseInt(getStyle(obj, attr));
          var newValue = oldValue + speed;

          // 为了让box1一定停在left=target的位置处，需要在这里做个判断
          if((newValue > target && speed) > 0 || (newValue < target && speed < 0)) {
            newValue = target;
          }
          obj.style[attr] = newValue + 'px';
          if(newValue == target) {
            clearInterval(obj.timer);
            
            // 動畫執行完畢，判斷一旦存在callback函數就執行callback()函數，不存在則不執行
            callback && callback();
          } 

        }, 30);
      }
    </script>
  </head>

  <body>
  
    <button id="btn04">測試按鈕</button>
    <br />
    
    <div id="box2"></div>
    <div style="width：0;height: 1000px; border-left: 1px black solid;margin-left: 800px;"></div>
  </body>

</html>
```

## 8定时器的应用5
```
- 在這幾個問題中我們都使用了之前定義的getStyle()函數和clickMove()函數
    但是如果依照這樣的方式，每次我們需要調用都需要將其賦值到當前的頁面中，不方便
  - 所以我們考慮將其放在一個外部js文件中，然後使用script標籤中的src屬性引入
    這樣就可以解決問題了
```

```
<!DOCTYPE html>
<html>

  <head>
    <meta charset="UTF-8">
    <title></title>
    <style type="text/css">
      * {
        margin: 0px;
        padding: 0px;
      }
    
      #box2 {
        width: 100px;
        height: 100px;
        background-color: #fff;
        position: absolute;
        top: 200px;
        left: 0;
      }
    </style>
    <script type="text/javascript" src="js/tools.js"></script>
    <script type="text/javascript">

      window.onload = function() {

        // 获取box2
        var box2 = document.getElementById('box2');
        
        // 获取btn04
        var btn04 = document.getElementById('btn04');
      
        // 点击按钮4以后，box2向右移动
        btn04.onclick = function() {
          clickMove(box2, 'width', 800, 10, function(){
            // 動畫執行完畢之後執行
            clickMove(box2, 'height', 400, 10, function(){
              
            });  
          });
        }
      }
    </script>
  </head>

  <body>
  
    <button id="btn04">測試按鈕</button>
    <br />
    
    <div id="box2"></div>
    <div style="width：0;height: 1000px; border-left: 1px black solid;margin-left: 800px;"></div>
  </body>

</html>
```

## 9轮播图1

使用超链接切换图片

```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title></title>
    <style type="text/css">
      *{
        margin: 0;
        padding: 0;
      }
      #outer{
        width: 520px;
        height: 510px;
        margin: 50px auto;
        background-color: green#fff;
        padding: 10px 0px;
        position: relative;
        
        /*// 裁剪溢出的内容,使得每次只能显示一个图片*/
        overflow: hidden;
      }
      #imgList{
        /*去除項目符號*/
        list-style: none;
        
        /*這裡不能將寬度定死，因為一旦增加圖片，圖片的整體寬度也應該增加，所以需要使用js確定*/
        /*width: 2080px;*/
        
        /*由于需要改变ul的left属性。所以需要为其开启绝对定位，相应的就需要为div开启相对定位*/
        position: absolute;
        /* 每次向左移动520个像素就显示下一张图片*/
        left: 0px;
        
        
      }
      #imgList li{
        float: left;
        margin: 10px;
      }
      #navDiv{
        position: absolute;
        /*设置位置*/
        bottom: 20px;
        /*设置居中(520-100)/2 = 210
         *但是这样直接计算得到的结果一旦增加超链接的个数，就会导致不居中，所以需要通过js动态确定*/
        /*left: 210px;*/
      }
      #navDiv a{
        
        float: left;
        width: 15px;
        height: 15px;
        background-color: red;
        margin: 0px 5px;
        /*颜色太红了，设置半透明*/
        opacity: 0.5;
        /*兼容ie8的透明*/
        filter: alpha(opacity=50);
      }
      
      #navDiv a:hover{
        background-color: black;
      }
    </style>
    <script type="text/javascript" src="js/tools.js"></script>
    <script type="text/javascript">
      window.onload = function(){
        
        /*
         * 1：改变imgList的宽度
         */
        //設置imgList的寬度
        var imgList = document.getElementById('imgList');
        // 獲取頁面中所有的img標籤 
        var imgArr = document.getElementsByTagName('img');
        // 設置imgList的寬度
        imgList.style.width = imgArr.length*520 + 'px';
//        alert(imgList.style.width);
        
        
        /*
         * 2.设置导航按钮居中
         */
        var navDiv = document.getElementById('navDiv');
        var outer = document.getElementById('outer');
        navDiv.style.left =( outer.offsetWidth - navDiv.offsetWidth )/2 + 'px';
        
        /*
         * 设置超链接的移入样式
         */
        var allA = document.getElementsByTagName('a');
        var index = 0;
        //设置默认选中的效果
        allA[index].style.backgroundColor = 'black';
        
        
        
        /*
         * 3.点击超链接切换到指定图片
         *    点击第一个超链接显示第一个图片
         *    点击第二个超链接显示第二个图片
         *    ...
         * 
         */
        // 为所有的超链接绑定单击响应函数
        for(var i=0; i<allA.length; i++){
          // 执行顺序，加载页面后for循环先执行完之后，点击超链接后再执行单击响应函数
          // 为每一个超链接添加一个num属性
          allA[i].num = i;
          allA[i].onclick = function(){
            // 获取被点击的超链接的索引,并将其设置为Index
            index = this.num;
            // 切换图片
            /*
             * 第一张图片：索引为0，left=0
             * 第二张图片，索引为1，left=-520 * 1
             * ...
             */
//            imgList.style.left = -520 * index + 'px';
            // 修改正在选中的a的背景颜色
            setA();
            
            // 使用clickmove函数切换图片
            clickMove(imgList,'left',-520*index, 20, function(){
              
            });
          }
        }
        // 创建一个方法设置选中的a
        function setA(){
          // 遍历所有的a并将它们的背景颜色设置为红色
          for(var i=0; i<allA.length; i++){
            // 这里设置为空，会直接使用样式表中的默认样式
            allA[i].style.backgroundColor = '';
          }
          // 将选中的a的背景设置为黑色
          allA[index].style.backgroundColor = 'black';
        }
      }
    </script>
  </head>
  <body>
    <!--創建一個外部的div,作為大的容器-->
    <div id="outer">
      <!--創建一個無序列表，保存圖片-->
      <ul id="imgList">
        <li><img src="img/1.jpg"</li>
        <li><img src="img/2.jpg"</li>
        <li><img src="img/3.jpg"</li>
        <li><img src="img/4.jpg"</li>
      </ul>
      <!--创建导航按钮-->
      <div id="navDiv">
        <a href="javascript:;"></a>
        <a href="javascript:;"></a>
        <a href="javascript:;"></a>
        <a href="javascript:;"></a>
      </div>
    </div>
  </body>
</html>
```


## 9轮播图2

使用定时器切换图片
```
<!DOCTYPE html>
<html>

  <head>
    <meta charset="UTF-8">
    <title></title>
    <style type="text/css">
      * {
        margin: 0;
        padding: 0;
      }
      
      #outer {
        width: 520px;
        height: 510px;
        margin: 50px auto;
        background-color: green#fff;
        padding: 10px 0px;
        position: relative;
        /*// 裁剪溢出的内容,使得每次只能显示一个图片*/
        overflow: hidden;
      }
      
      #imgList {
        /*去除項目符號*/
        list-style: none;
        /*這裡不能將寬度定死，因為一旦增加圖片，圖片的整體寬度也應該增加，所以需要使用js確定*/
        /*width: 2080px;*/
        /*由于需要改变ul的left属性。所以需要为其开启绝对定位，相应的就需要为div开启相对定位*/
        position: absolute;
        /* 每次向左移动520个像素就显示下一张图片*/
        left: 0px;
      }
      
      #imgList li {
        float: left;
        margin: 10px;
      }
      
      #navDiv {
        position: absolute;
        /*设置位置*/
        bottom: 20px;
        /*设置居中(520-100)/2 = 210
         *但是这样直接计算得到的结果一旦增加超链接的个数，就会导致不居中，所以需要通过js动态确定*/
        /*left: 210px;*/
      }
      
      #navDiv a {
        float: left;
        width: 15px;
        height: 15px;
        background-color: red;
        margin: 0px 5px;
        /*颜色太红了，设置半透明*/
        opacity: 0.5;
        /*兼容ie8的透明*/
        filter: alpha(opacity=50);
      }
      
      #navDiv a:hover {
        background-color: black;
      }
    </style>
    <script type="text/javascript" src="js/tools.js"></script>
    <script type="text/javascript">
      window.onload = function() {

        /*
         * 1：改变imgList的宽度
         */
        //設置imgList的寬度
        var imgList = document.getElementById('imgList');
        // 獲取頁面中所有的img標籤 
        var imgArr = document.getElementsByTagName('img');
        // 設置imgList的寬度
        imgList.style.width = imgArr.length * 520 + 'px';
        //        alert(imgList.style.width);

        /*
         * 2.设置导航按钮居中
         */
        var navDiv = document.getElementById('navDiv');
        var outer = document.getElementById('outer');
        navDiv.style.left = (outer.offsetWidth - navDiv.offsetWidth) / 2 + 'px';

        /*
         * 设置超链接的移入样式
         */
        var allA = document.getElementsByTagName('a');
        var index = 0;
        //设置默认选中的效果
        allA[index].style.backgroundColor = 'black';

        /*
         * 3.点击超链接切换到指定图片
         *    点击第一个超链接显示第一个图片
         *    点击第二个超链接显示第二个图片
         *    ...
         * 
         */
        var timer;
        // 为所有的超链接绑定单击响应函数
        for(var i = 0; i < allA.length; i++) {
          // 执行顺序，加载页面后for循环先执行完之后，点击超链接后再执行单击响应函数
          // 为每一个超链接添加一个num属性
          allA[i].num = i;
          allA[i].onclick = function() {

            // 关闭自动切换图片的定时器
            clearInterval(timer);
            // 获取被点击的超链接的索引,并将其设置为Index
            index = this.num;
            // 切换图片
            /*
             * 第一张图片：索引为0，left=0
             * 第二张图片，索引为1，left=-520 * 1
             * ...
             */
            //            imgList.style.left = -520 * index + 'px';
            // 修改正在选中的a的背景颜色
            setA();

            // 使用clickmove函数切换图片
            clickMove(imgList, 'left', -520 * index, 20, function() {
              // 点击超链接的动画执行完毕之后，开启自动图片切换动画
              autoChange();
            });

          }

        }

        // 创建一个方法设置选中的a
        function setA() {
          if(index >= imgArr.length - 1) {
            index = 0;
            // 此时显示的最后一张图片，而最后一张图片和第一张图片相同
            // 通过css直接将最后一张图片切换为第一张图片
            imgList.style.left = 0;
          }

          // 遍历所有的a并将它们的背景颜色设置为红色
          for(var i = 0; i < allA.length; i++) {
            // 这里设置为空，会直接使用样式表中的默认样式
            allA[i].style.backgroundColor = '';
          }
          // 将选中的a的背景设置为黑色
          allA[index].style.backgroundColor = 'black';
        }

        /*
         * 创建一个函数开启自动切换图片
         */
        function autoChange() {
          // 开启一个定时器用来定时切换图片
          timer = setInterval(function() {
            index++;
            if(index >= imgArr.length) {
              index = 0;
            }
            // 执行动画切换图片
            clickMove(imgList, 'left', -520 * index, 20, function() {
              //设置选中超链接的样式
              setA();
            });
          }, 3000);
        }
        autoChange();
      }
    </script>
  </head>

  <body>
    <!--創建一個外部的div,作為大的容器-->
    <div id="outer">
      <!--創建一個無序列表，保存圖片-->
      <ul id="imgList">
        <li><img src="img/1.jpg" </li>
          <li><img src="img/2.jpg" </li>
            <li><img src="img/3.jpg" </li>
              <li><img src="img/4.jpg" </li>
                <li><img src="img/1.jpg" </li>
      </ul>
      <!--创建导航按钮-->
      <div id="navDiv">
        <a href="javascript:;"></a>
        <a href="javascript:;"></a>
        <a href="javascript:;"></a>
        <a href="javascript:;"></a>
      </div>
    </div>
  </body>

</html>
```

# 十五、类属性[∧](#0)<div id="15"></div>
# 通过为元素增加类添加样式
```
通过style属性修改Box1的样式
   每次修改一次样式，浏览器就需要渲染一次界面
   这样性能比较差
   而且这种形式不方便修改多种样式
   所以在开发中不建议这样用
            box1.style.width = '200px';
            box1.style.height = '200px';
            box1.style.backgroundColor = '#fff';

使用一行代码同时修改多个样式

   修改box1的class属性,间接修改元素的样式
   这样就实现了只修改一次同时修改多个属性的代码
   此时浏览器只需要重新渲染页面一次，效率高
   使用+=注意添加空格，否则相当于类名变成了b1b2
            box1.className += ' b2';
```

定义三个函数为元素添加类属性：
```
function addClass(obj, cn){
    //先检查obj是否属于cn类，不属于则为其添加
    if(!hasClass(obj, cn)){
        obj.className += " " + cn;
    }
}

//判断一个元素中是否含有指定的class属性值
/*如果有返回true,否则返回false*/
function hasClass(obj, cn){
    var reg = new RegExp('\\b'+cn+'\\b');
    return reg.test(obj.className);
}

//删除一个元素中指定的class属性
function removeClass(obj, cn){
    //先检查obj是否属于cn类，不属于则为其添加
    // 创建一个正则表达式
    var reg = new RegExp('\\b'+cn+'\\b');
    // 使用replace将字符串中第一个符合正则表达式的内容替换为空串
    obj.className = obj.className.replace(reg,'');
}

// toggleClass:切换一个类
/*如果元素中具有该类，则删除
    如果元素中没有该类，则添加*/
function toggleClass(obj, cn){
    // 判断元素中是否有cn
    if(hasClass(obj, cn)){
        removeClass(obj, cn);
    }else{
        addClass(obj, cn)
    }
}
```

```
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>类的操作</title>
        <style type="text/css">
            .b1{
                width: 100px;
                height: 300px;
                background-color: red;
            }
            .b2{
                width: 200px;
                height: 200px;
                background-color: #fff;
            }
        </style>
        <script type="text/javascript">
            window.onload = function(){
                /*
                 * 问题1：点击按钮以后修改box1的样式
                 */
                //获取Btn01
                var btn01 = document.getElementById('btn01');
                var box1 = document.getElementById('box1');
                btn01.onclick = function(){
                    
                    toggleClass(box1, 'b2');
                } 
            }
            
            // 向一个元素中添加指定的class属性值
            /*
             * 参数：
             *      obj：要添加class属性的元素
             *      cn：要添加的class值
             */
            function addClass(obj, cn){
                //先检查obj是否属于cn类，不属于则为其添加
                if(!hasClass(obj, cn)){
                    obj.className += " " + cn;
                }
            }
            
            //判断一个元素中是否含有指定的class属性值
            /*如果有返回true,否则返回false*/
            function hasClass(obj, cn){
                var reg = new RegExp('\\b'+cn+'\\b');
                return reg.test(obj.className);
            }
            
            //删除一个元素中指定的class属性
            function removeClass(obj, cn){
                //先检查obj是否属于cn类，不属于则为其添加
                // 创建一个正则表达式
                var reg = new RegExp('\\b'+cn+'\\b');
                // 使用replace将字符串中第一个符合正则表达式的内容替换为空串
                obj.className = obj.className.replace(reg,'');
            }
            
            // toggleClass:切换一个类
            /*如果元素中具有该类，则删除
                如果元素中没有该类，则添加*/
            function toggleClass(obj, cn){
                // 判断元素中是否有cn
                if(hasClass(obj, cn)){
                    removeClass(obj, cn);
                }else{
                    addClass(obj, cn)
                }
            }
        </script>
    </head>
    <body>
        <button id="btn01">点击按钮以后修改box1的样式</button>
        <br />
        <div id='box1' class="b1"></div>
    </body>
</html>
```

# 十六、二级菜单[∧](#0)<div id="16"></div>
# 二级菜单
```
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
        <style type="text/css">
            * {
                margin: 0;
                padding: 0;
                list-style-type: none;
            }
            
            a,
            img {
                border: 0;
                text-decoration: none;
            }
            
            body {
                font: 12px/180% Arial, Helvetica, sans-serif, "新宋体";
            }
        </style>
        <!--<link rel="stylesheet" type="text/css" href="css/sdmenu.css" />-->
        <link rel="stylesheet" type="text/css" href="css/test.css" />
        <script type="text/javascript" src="js/tools.js"></script>
        <script type="text/javascript">
            window.onload = function(){
                /*
                 * 我们的每一个菜单都是一个div
                 *      当div具备collapsed类时，div就是折叠的状态
                 *          否则div就是展开的状态
                 */
                
                /*
                 * 问题1：点击菜单，切换菜单的显示状态
                 */
                // 获取所有的class为menuSpan的元素
                var menuSpan = document.querySelectorAll('.menuSpan');
                /*alert(menuSpan.length);   长度为4*/
                
                // 定义一个变量保存当前打开的菜单,默认第一个打开
                var openDiv = menuSpan[0].parentNode;
                
                // 为span 绑定单机响应函数
                for(var i=0; i<menuSpan.length; i++){
                    menuSpan[i].onclick = function(){
                        // 获取当前span的父元素,当前整个小的div
                        var parentDiv = this.parentNode;
                        
                        // 关闭或者打开parentDiv
                        toggleClass(parentDiv,'collapsed');
                        
                        // 打开菜单之后，应该关闭之前打开的菜单
                        if(openDiv != parentDiv && !hasClass(openDiv,'collapsed')){
                            // 判断两者如果是同一个div，则不关闭之前打开的div
                            // 因为如果此时两者相同，则toggleClass和addClass相当于
                            //    对该div没有进行任何操作，所以需要判断处理
                            /*addClass(openDiv,'collapsed');
                             由与我们想要做一些菜单关闭的动画，所以像统一使用toggleClass
                             但是由于toggle函数的定义，就存在图片1.png说明的问题
                             不需要移除，所以为if添加条件:判断openDiv是否具备该类，
                                    具备则不进入if判断*/
                            toggleClass(openDiv,'collapsed');
                        }
                        // 然后将openDiv设置为目前更改之后打开的div
                        openDiv = parentDiv;
                    }
                }
            }
        </script>
    </head>
    <body>
        <div id="my_menu" class="sdmenu">
            <div>
                <span class="menuSpan">在线工具</span>
                <a href="#">图像优化</a>
                <a href="#">收藏夹图标生成器</a>
                <a href="#">邮件</a>
                <a href="#">htaccess密码</a>
                <a href="#">梯度图像</a>
                <a href="#">按钮生成器</a>
            </div>
            <div class="collapsed">
                <span class="menuSpan">支持我们</span>
                <a href="#">推荐我们</a>
                <a href="#">链接我们</a>
                <a href="#">网络资源</a>
            </div>
            <div class="collapsed">
                <span class="menuSpan">合作伙伴</span>
                <a href="#">JavaScript工具包</a>
                <a href="#">CSS驱动</a>
                <a href="#">CodingForums</a>
                <a href="#">CSS例子</a>
            </div>
            <div class="collapsed">
                <span class="menuSpan">测试电流</span>
                <a href="#">Current or not</a>
                <a href="#">Current or not</a>
                <a href="#">Current or not</a>
                <a href="#">Current or not</a>
            </div>
        </div>
    </body>
</html>
```

# 十七、json[∧](#0)<div id="17"></div>
JSON
```
      - JS中的对象只有JS认识， 其他语言均不认识
      - 例如：如果服务器使用java编码，我们需要将对象传递给服务器
           时就需要将JS对象转换为Java对象
      - 由于字符串在各种编码中均存在，所以我们就将其转换为字符串
      - JSON就是一种特殊格式的字符串，这个字符串可以被任意语言识别，
           并且转换为任意语言的字符串
      - JSON：
       - 所以，JSON的主要作用就是在不同语言自建交互
       - JavaScript Object Notation JS对象表示法
       - JSON和JS对象的格式一样，只不过JSON字符串中的属性名必须
           加双引号,其他与JS语法一致
      - JSON字符串的分类：
       - JSON对象{}:属性名必须加双引号
       - JSON数组[]:
           - 对象和数组可以嵌套使用
      - JSON中允许 的值：
       - 字符串
       - 数值
       - 布尔值
       - null
       - JSON对象，不包括函数
       - 数组
```

```
// 创建一个JS对象
var obj = {name:'孙悟空',age:18,gender:'男'};
console.log(obj.name);

//创建一个JSON对象
var obj1 = '{"name":"孙悟空","age":18,"gender":"男"}';

//创建一个JSON数组
var arr ='[1,2,3,"孙悟空",true]';

var arr1 = '[1,2,3,obj]';
```

JSON方法：
```
JSON方法：
      - JS中为我们提供了一个类：JSON
           - 这个类可以帮我们实现JS和JSON的相互转换
           - 只兼容IE8+   
      - json字符串---->js对象
           - JSON.parse(jsonStr),返回js对象
      - js对象---->json字符串
           - JSON.stringify(obj3);
```

```
//创建一个JSON对象
var obj1 = '{"name":"孙悟空","age":18,"gender":"男"}';
var obj2 = JSON.parse(obj1);
//console.log(obj2.name);

//创建一个JSON数组
var arr ='[1,2,3,"孙悟空",true]';
var arr1 = JSON.parse(arr);
//console.log(arr1[0]);

// 创建一个js对象
var obj3 = {name:"猪八戒",age:28,gender:"男"};
console.log(obj3.name);
var obj4 = JSON.stringify(obj3);
console.log(typeof obj4);
```

JSON兼容ie7-
```
方法1：
     - eval():可以执行一段字符串形式的JS代码，并将执行结果返回
           - 使用eval执行的字符串中含有大括号，它会将大括号当为代码块
                 不希望如此，则需要使用括号将字符串包围
     - eval函数的功能很强大，可以直接执行一个字符串中的js代码
           - 但是在开发中尽量不要使用，效率低并且不安全
```

```
方法2：
      如果需要兼容ie7-,可以通过引入一个外部的js文件来处理
      这个文件自己定义了一个JSON类，用来在ie7-中转换-->
```

```
<!DOCTYPE html>
<html>
      <head>
            <meta charset="UTF-8">
            <title></title>
            <!--
                  方法2：
                  如果需要兼容ie7-,可以通过引入一个外部的js文件来处理
                  这个文件自己定义了一个JSON类，用来在ie7-中转换-->
            <script type="text/javascript" src="js/json2.js"></script>
            
            <script type="text/javascript">
                  /*
                   * 方法1：
                   * 
                   * JSON :兼容IE7-
                   *    
                   *    - eval():可以执行一段字符串形式的JS代码，并将执行结果返回
                   *          - 使用eval执行的字符串中含有大括号，它会将大括号当为代码块
                   *                不希望如此，则需要使用括号将字符串包围
                   *    - eval函数的功能很强大，可以直接执行一个字符串中的js代码
                   *          - 但是在开发中尽量不要使用，效率低并且不安全
                   */
                  var str = '{"name":"孙悟空","age":18,"gender":"男"}';
                  var str2 = "alert('hello')";
                  // 使用eval将json字符串转换为js对象
                  var obj = eval('(' + str +')');
                  console.log(obj.name);
                  
                  
                  // 方法2
                  var obj2 = JSON.stringify(str);
                  console.log(obj.name);
                  
            </script>   
      </head>
      <body>
      </body>
</html>
```

外部JSON文件
```
//  json2.js
//  2016-05-01
//  Public Domain.
//  NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
//  See http://www.JSON.org/js.html
//  This code should be minified before deployment.
//  See http://javascript.crockford.com/jsmin.html

//  USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
//  NOT CONTROL.

//  This file creates a global JSON object containing two methods: stringify
//  and parse. This file is provides the ES5 JSON capability to ES3 systems.
//  If a project might run on IE8 or earlier, then this file should be included.
//  This file does nothing on ES5 systems.

//      JSON.stringify(value, replacer, space)
//          value       any JavaScript value, usually an object or array.
//          replacer    an optional parameter that determines how object
//                      values are stringified for objects. It can be a
//                      function or an array of strings.
//          space       an optional parameter that specifies the indentation
//                      of nested structures. If it is omitted, the text will
//                      be packed without extra whitespace. If it is a number,
//                      it will specify the number of spaces to indent at each
//                      level. If it is a string (such as "\t" or "&nbsp;"),
//                      it contains the characters used to indent at each level.
//          This method produces a JSON text from a JavaScript value.
//          When an object value is found, if the object contains a toJSON
//          method, its toJSON method will be called and the result will be
//          stringified. A toJSON method does not serialize: it returns the
//          value represented by the name/value pair that should be serialized,
//          or undefined if nothing should be serialized. The toJSON method
//          will be passed the key associated with the value, and this will be
//          bound to the value.

//          For example, this would serialize Dates as ISO strings.

//              Date.prototype.toJSON = function (key) {
//                  function f(n) {
//                      // Format integers to have at least two digits.
//                      return (n < 10)
//                          ? "0" + n
//                          : n;
//                  }
//                  return this.getUTCFullYear()   + "-" +
//                       f(this.getUTCMonth() + 1) + "-" +
//                       f(this.getUTCDate())      + "T" +
//                       f(this.getUTCHours())     + ":" +
//                       f(this.getUTCMinutes())   + ":" +
//                       f(this.getUTCSeconds())   + "Z";
//              };

//          You can provide an optional replacer method. It will be passed the
//          key and value of each member, with this bound to the containing
//          object. The value that is returned from your method will be
//          serialized. If your method returns undefined, then the member will
//          be excluded from the serialization.

//          If the replacer parameter is an array of strings, then it will be
//          used to select the members to be serialized. It filters the results
//          such that only members with keys listed in the replacer array are
//          stringified.

//          Values that do not have JSON representations, such as undefined or
//          functions, will not be serialized. Such values in objects will be
//          dropped; in arrays they will be replaced with null. You can use
//          a replacer function to replace those with JSON values.

//          JSON.stringify(undefined) returns undefined.

//          The optional space parameter produces a stringification of the
//          value that is filled with line breaks and indentation to make it
//          easier to read.

//          If the space parameter is a non-empty string, then that string will
//          be used for indentation. If the space parameter is a number, then
//          the indentation will be that many spaces.

//          Example:

//          text = JSON.stringify(["e", {pluribus: "unum"}]);
//          // text is '["e",{"pluribus":"unum"}]'

//          text = JSON.stringify(["e", {pluribus: "unum"}], null, "\t");
//          // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'

//          text = JSON.stringify([new Date()], function (key, value) {
//              return this[key] instanceof Date
//                  ? "Date(" + this[key] + ")"
//                  : value;
//          });
//          // text is '["Date(---current time---)"]'

//      JSON.parse(text, reviver)
//          This method parses a JSON text to produce an object or array.
//          It can throw a SyntaxError exception.

//          The optional reviver parameter is a function that can filter and
//          transform the results. It receives each of the keys and values,
//          and its return value is used instead of the original value.
//          If it returns what it received, then the structure is not modified.
//          If it returns undefined then the member is deleted.

//          Example:

//          // Parse the text. Values that look like ISO date strings will
//          // be converted to Date objects.

//          myData = JSON.parse(text, function (key, value) {
//              var a;
//              if (typeof value === "string") {
//                  a =
//   /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
//                  if (a) {
//                      return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
//                          +a[5], +a[6]));
//                  }
//              }
//              return value;
//          });

//          myData = JSON.parse('["Date(09/09/2001)"]', function (key, value) {
//              var d;
//              if (typeof value === "string" &&
//                      value.slice(0, 5) === "Date(" &&
//                      value.slice(-1) === ")") {
//                  d = new Date(value.slice(5, -1));
//                  if (d) {
//                      return d;
//                  }
//              }
//              return value;
//          });

//  This is a reference implementation. You are free to copy, modify, or
//  redistribute.

/*jslint
    eval, for, this
*/

/*property
    JSON, apply, call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
    getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
    lastIndex, length, parse, prototype, push, replace, slice, stringify,
    test, toJSON, toString, valueOf
*/


// Create a JSON object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.

if (typeof JSON !== "object") {
    JSON = {};
}

(function () {
    "use strict";

    var rx_one = /^[\],:{}\s]*$/;
    var rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;
    var rx_three = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
    var rx_four = /(?:^|:|,)(?:\s*\[)+/g;
    var rx_escapable = /[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
    var rx_dangerous = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;

    function f(n) {
        // Format integers to have at least two digits.
        return n < 10
            ? "0" + n
            : n;
    }

    function this_value() {
        return this.valueOf();
    }

    if (typeof Date.prototype.toJSON !== "function") {

        Date.prototype.toJSON = function () {

            return isFinite(this.valueOf())
                ? this.getUTCFullYear() + "-" +
                        f(this.getUTCMonth() + 1) + "-" +
                        f(this.getUTCDate()) + "T" +
                        f(this.getUTCHours()) + ":" +
                        f(this.getUTCMinutes()) + ":" +
                        f(this.getUTCSeconds()) + "Z"
                : null;
        };

        Boolean.prototype.toJSON = this_value;
        Number.prototype.toJSON = this_value;
        String.prototype.toJSON = this_value;
    }

    var gap;
    var indent;
    var meta;
    var rep;


    function quote(string) {

// If the string contains no control characters, no quote characters, and no
// backslash characters, then we can safely slap some quotes around it.
// Otherwise we must also replace the offending characters with safe escape
// sequences.

        rx_escapable.lastIndex = 0;
        return rx_escapable.test(string)
            ? "\"" + string.replace(rx_escapable, function (a) {
                var c = meta[a];
                return typeof c === "string"
                    ? c
                    : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
            }) + "\""
            : "\"" + string + "\"";
    }


    function str(key, holder) {

// Produce a string from holder[key].

        var i;          // The loop counter.
        var k;          // The member key.
        var v;          // The member value.
        var length;
        var mind = gap;
        var partial;
        var value = holder[key];

// If the value has a toJSON method, call it to obtain a replacement value.

        if (value && typeof value === "object" &&
                typeof value.toJSON === "function") {
            value = value.toJSON(key);
        }

// If we were called with a replacer function, then call the replacer to
// obtain a replacement value.

        if (typeof rep === "function") {
            value = rep.call(holder, key, value);
        }

// What happens next depends on the value's type.

        switch (typeof value) {
        case "string":
            return quote(value);

        case "number":

// JSON numbers must be finite. Encode non-finite numbers as null.

            return isFinite(value)
                ? String(value)
                : "null";

        case "boolean":
        case "null":

// If the value is a boolean or null, convert it to a string. Note:
// typeof null does not produce "null". The case is included here in
// the remote chance that this gets fixed someday.

            return String(value);

// If the type is "object", we might be dealing with an object or an array or
// null.

        case "object":

// Due to a specification blunder in ECMAScript, typeof null is "object",
// so watch out for that case.

            if (!value) {
                return "null";
            }

// Make an array to hold the partial results of stringifying this object value.

            gap += indent;
            partial = [];

// Is the value an array?

            if (Object.prototype.toString.apply(value) === "[object Array]") {

// The value is an array. Stringify every element. Use null as a placeholder
// for non-JSON values.

                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || "null";
                }

// Join all of the elements together, separated with commas, and wrap them in
// brackets.

                v = partial.length === 0
                    ? "[]"
                    : gap
                        ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]"
                        : "[" + partial.join(",") + "]";
                gap = mind;
                return v;
            }

// If the replacer is an array, use it to select the members to be stringified.

            if (rep && typeof rep === "object") {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    if (typeof rep[i] === "string") {
                        k = rep[i];
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (
                                gap
                                    ? ": "
                                    : ":"
                            ) + v);
                        }
                    }
                }
            } else {

// Otherwise, iterate through all of the keys in the object.

                for (k in value) {
                    if (Object.prototype.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (
                                gap
                                    ? ": "
                                    : ":"
                            ) + v);
                        }
                    }
                }
            }

// Join all of the member texts together, separated with commas,
// and wrap them in braces.

            v = partial.length === 0
                ? "{}"
                : gap
                    ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}"
                    : "{" + partial.join(",") + "}";
            gap = mind;
            return v;
        }
    }

// If the JSON object does not yet have a stringify method, give it one.

    if (typeof JSON.stringify !== "function") {
        meta = {    // table of character substitutions
            "\b": "\\b",
            "\t": "\\t",
            "\n": "\\n",
            "\f": "\\f",
            "\r": "\\r",
            "\"": "\\\"",
            "\\": "\\\\"
        };
        JSON.stringify = function (value, replacer, space) {

// The stringify method takes a value and an optional replacer, and an optional
// space parameter, and returns a JSON text. The replacer can be a function
// that can replace values, or an array of strings that will select the keys.
// A default replacer method can be provided. Use of the space parameter can
// produce text that is more easily readable.

            var i;
            gap = "";
            indent = "";

// If the space parameter is a number, make an indent string containing that
// many spaces.

            if (typeof space === "number") {
                for (i = 0; i < space; i += 1) {
                    indent += " ";
                }

// If the space parameter is a string, it will be used as the indent string.

            } else if (typeof space === "string") {
                indent = space;
            }

// If there is a replacer, it must be a function or an array.
// Otherwise, throw an error.

            rep = replacer;
            if (replacer && typeof replacer !== "function" &&
                    (typeof replacer !== "object" ||
                    typeof replacer.length !== "number")) {
                throw new Error("JSON.stringify");
            }

// Make a fake root object containing our value under the key of "".
// Return the result of stringifying the value.

            return str("", {"": value});
        };
    }


// If the JSON object does not yet have a parse method, give it one.

    if (typeof JSON.parse !== "function") {
        JSON.parse = function (text, reviver) {

// The parse method takes a text and an optional reviver function, and returns
// a JavaScript value if the text is a valid JSON text.

            var j;

            function walk(holder, key) {

// The walk method is used to recursively walk the resulting structure so
// that modifications can be made.

                var k;
                var v;
                var value = holder[key];
                if (value && typeof value === "object") {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }


// Parsing happens in four stages. In the first stage, we replace certain
// Unicode characters with escape sequences. JavaScript handles many characters
// incorrectly, either silently deleting them, or treating them as line endings.

            text = String(text);
            rx_dangerous.lastIndex = 0;
            if (rx_dangerous.test(text)) {
                text = text.replace(rx_dangerous, function (a) {
                    return "\\u" +
                            ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }

// In the second stage, we run the text against regular expressions that look
// for non-JSON patterns. We are especially concerned with "()" and "new"
// because they can cause invocation, and "=" because it can cause mutation.
// But just to be safe, we want to reject all unexpected forms.

// We split the second stage into 4 regexp operations in order to work around
// crippling inefficiencies in IE's and Safari's regexp engines. First we
// replace the JSON backslash pairs with "@" (a non-JSON character). Second, we
// replace all simple value tokens with "]" characters. Third, we delete all
// open brackets that follow a colon or comma or that begin the text. Finally,
// we look to see that the remaining characters are only whitespace or "]" or
// "," or ":" or "{" or "}". If that is so, then the text is safe for eval.

            if (
                rx_one.test(
                    text
                        .replace(rx_two, "@")
                        .replace(rx_three, "]")
                        .replace(rx_four, "")
                )
            ) {

// In the third stage we use the eval function to compile the text into a
// JavaScript structure. The "{" operator is subject to a syntactic ambiguity
// in JavaScript: it can begin a block or an object literal. We wrap the text
// in parens to eliminate the ambiguity.

                j = eval("(" + text + ")");

// In the optional fourth stage, we recursively walk the new structure, passing
// each name/value pair to a reviver function for possible transformation.

                return (typeof reviver === "function")
                    ? walk({"": j}, "")
                    : j;
            }

// If the text is not JSON parseable, then a SyntaxError is thrown.

            throw new SyntaxError("JSON.parse");
        };
    }
}());
```

# 十八、属性描述对象[∧](#0)<div id="18"></div>
# 属性描述对象
每个属性都具备自身的属性描述对象，并且该对象中存在几个特定的属性以及默认值：

    {
    // 属性value的属性描述对象
      value:123,
      // 表示该属性(value)不可修改
      writable: false,
      // 表示该属性不可遍历，使用consolog.log输出不会显示,可遍历后就可输出
      enumerable: true,
      // 决定了是否可以修改属性描述对象。也就是说，configurable为false时，value、writable、enumerable和configurable都不能被修改了。
      configurable: false,
      get: undefined,
      set: undefined
    }
    只要writable和configurable有一个为true，就允许改动。

如果一个属性的enumerable为false，下面三个操作不会取到该属性。

        for..in循环
        Object.keys方法
        JSON.stringify方法

# Object.defineProperty(obj,属性名,属性描述对象)
```
定义obj.age
let obj = {
    name:'dada'
}
Object.defineProperty(obj,'age',{
    value:18,
    writable:false,
    enumerable:false
})
// 由于age属性的描述对象中将enumerable设置为了false，所以不会输出该属性
console.log(obj); // { name: 'dada' }
```

# Object.defineProperties():添加多个属性，并且指定每个属性的属性描述对象
    Object.defineProperties(obj,{
        属性名1：属性描述对象,
        属性名2：属性描述对象,
        ...
    })


# 获取某个属性的属性描述对象
Object.getOwnPropertyDespritor(obj,属性名)  
```
let obj = {
    name:'dada'
}
let des1 = Object.getOwnPropertyDescriptor(obj, 'name');
console.log(des1);
// { value: 'dada', writable: true, enumerable: true, configurable: true }
```

# 冻结对象
Object.preventExtensions(obj):禁止obj添加新的属性  
Object.seal(obj):禁止obj添加新属性以及删除原有属性  
Object.freeze(obj):禁止obj添加新属性、删除旧属性、改变旧属性的值  

# 检测obj是否被冻结
Object.isExtensible(obj):检查对象是否被preventExtensions冻结  
Object.isSealed(obj):检查obj是否是被seal()方法冻结  
Object.isFrozen(obj):检查obj是否被freeze()方法冻结

# 十九、js回调队列与事件循环及异步操作[∧](#0)<div id="19"></div>

js是单线程的，只在一个线程上运行，js同时只能处理一个任务，其他任务均需要排队。  
# 同步任务和异步任务
同步任务：没有被引擎挂起来，在主线程上排队执行的任务。  

    只有当前一个任务执行完毕，才会执行下一个任务
异步任务：被引擎放在一边，不进入主线程，进入任务队列的任务。

    只有当引擎认为某个异步任务可以执行了，该任务才会进入主线程
    排在异步任务后面的代码，不用等待异步任务执行结束再执行，可以马上执行，即异步任务不会造成堵塞

# 任务队列和事件循环

**任务队列**：js运行时，除了一个正在运行的主线程，引擎还提供了一个任务队列，里面存放着需要当前程序处理的异步任务。（根据任务的类型，存在多个队列）  
  
**主线程的执行顺序**：所有同步任务---->满足条件的异步任务(此时异步任务进入主线程就变成了同步任务)---->当任务队列清空，程序执行结束  
  
异步任务的写法通常是**回调函数**：一旦异步任务满足执行条件进入主线程，就会执行对应的回调函数  
  
**事件循环**：只要同步任务执行完毕，引擎就会不停地检查那些挂起来的异步任务是否满足执行条件了。  

# 异步操作的模式

**回调函数**
```
f1执行完后再执行f2:
function f1(callback){
    // ...
    callback();
}
function f2(){
    // ...
}
f1(f2);
```

**事件监听**：通过事件驱动  
```
function f1(){
    setTimeout(function(){
        // ...
        f1.trigger('done');  // 执行完成后，立即出发done事件，从而开始执行f2
    },1000);
}
```

**发布/订阅**:存在一个信号中心，某个任务执行完成，就向信号中心发布一个信号A，其他任务可以向信号中心订阅这个信号A，从而知道自己什么时候可以开始执行，这就叫**发布-订阅模式**。

```
// 首先f2向信号中心订阅done信号：
jQuery.subscribe('done',f2);
// 然后f1进行如下改写：
function f1(){
    setTimeout(function(){
        // ...
        jQuery.publish('done');  // f1执行完成后，向信号中心发布done信号，从而让f2执行
    },1000);
}
// f2执行后，可以取消订阅
jQuery.unsubscribe('done',f2);
```

# 异步操作的流程
**串行执行**：一个任务执行完成后，再执行另一个任务  
```
// 需要6秒才能执行完毕

var items = [1,2,3,4,5,6];   // 存放6个异步任务的执行参数
var results = [];  // 存放所有异步任务执行的结果

// 产生异步任务的函数
function async(arg,callback){
    console.log('参数为'+arg+',1秒返回结果');
    setTimeout(function(){callback(arg*2)},1000);
}

function final(value){
    console.log('完成：',value);
}

function series(item){
    // 串行函数
    if(item){
        // 产生一个异步任务，参数为item
        async(item,function(result){
            results.push(result);
            // 返回中套用执行下一个异步任务
            return series(items.shift());
        });
    }else{
        // 产生了6个异步任务，直到所有异步任务执行完毕，返回所有异步任务的结果
        return final(results);
    }
}
// shift用于删除数组的第一个元素，并且返回该元素
series(items.shift());

/*
参数为1,1秒返回结果
参数为2,1秒返回结果
参数为3,1秒返回结果
参数为4,1秒返回结果
参数为5,1秒返回结果
参数为6,1秒返回结果
完成： [ 2, 4, 6, 8, 10, 12 ]
[Finished in 6.4s]
 */
```
**并行执行**：所有异步任务同时执行，等到全部完成后，才执行final函数  
这里有一个问题：**js如何让多个异步任务同时执行呢？？？？**
```
// 只需要1秒就会执行完毕
var items = [ 1, 2, 3, 4, 5, 6 ];
var results = [];

function async(arg, callback) {
  console.log('参数为 ' + arg +' , 1秒后返回结果');
  setTimeout(function () { callback(arg * 2); }, 1000);
}

function final(value) {
  console.log('完成: ', value);
}

// forEach方法会同时发起六个异步任务，等到它们全部完成以后，才会执行final函数
items.forEach(function(item) {
  async(item, function(result){
    results.push(result);
    console.log(results);
    if(results.length === items.length) {
      final(results);
    }
  })
});

/*
参数为 1 , 1秒后返回结果
参数为 2 , 1秒后返回结果
参数为 3 , 1秒后返回结果
参数为 4 , 1秒后返回结果
参数为 5 , 1秒后返回结果
参数为 6 , 1秒后返回结果
完成:  [ 2, 4, 6, 8, 10, 12 ]
[Finished in 1.4s]
 */
```
**并行与串行的结合**：设置一个门槛n，每次只能并行执行n个异步任务  
```
// 仅需要3秒
var items = [ 1, 2, 3, 4, 5, 6 ];
var results = [];
var running = 0;
var limit = 2;

function async(arg, callback) {
  console.log('参数为 ' + arg +' , 1秒后返回结果');
  setTimeout(function () { callback(arg * 2); }, 1000);
}

function final(value) {
  console.log('完成: ', value);
}

function launcher() {
  while(running < limit && items.length > 0) {
    var item = items.shift();
    async(item, function(result) {
      results.push(result);
      running--;
      if(items.length > 0) {
        launcher();
      } else if(running == 0) {
        final(results);
      }
    });
    running++;
  }
}

launcher();
/*
参数为 1 , 1秒后返回结果
参数为 2 , 1秒后返回结果
参数为 3 , 1秒后返回结果
参数为 4 , 1秒后返回结果
参数为 5 , 1秒后返回结果
参数为 6 , 1秒后返回结果
完成:  [ 2, 4, 6, 8, 10, 12 ]
[Finished in 3.6s]
 */
```

# setTimeout,setTimeInterval
setTimeout和setInterval的运行机制，是将指定的代码移出本轮事件循环，等到下一轮事件循环，再检查是否到了指定时间。如果到了，就执行对应的代码；如果不到，就继续等待。
```
<!--
setTimeout，指定100毫秒以后运行一个任务。但是，如果后面的veryLongTask函数（同步任务）运行时间非常长，过了100毫秒还无法结束，那么被推迟运行的someTask就只有等着，等到veryLongTask运行结束，然后100毫秒才开始计时，时间到了就执行它。
-->
setTimeout(someTask, 100);
veryLongTask();
```

setTimeout(f, 0)会在下一轮事件循环一开始就执行。这种写法的目的是，尽可能早地执行f，但是并不能保证立刻就执行f。**主要还是要等到同步任务执行完后**  
  
例子：
```
var div = document.getElementsByTagName('div')[0];

// 写法一:js的执行速度远远高于DOM，所以会造成大量DOM操作的堵塞
for (var i = 0xA00000; i < 0xFFFFFF; i++) {
  div.style.backgroundColor = '#' + i.toString(16);
}

// 写法二：创建了很多的定时器
var timer;
var i=0x100000;

function func() {
    // 函数执行顺序：第二句--->第三句--->第一句创建了一个新的定时器，并且执行回调函数，进入循环
  timer = setTimeout(func, 0);
  div.style.backgroundColor = '#' + i.toString(16);
  if (i++ == 0xFFFFFF) clearTimeout(timer);
}

timer = setTimeout(func, 0);
```


```
console.log('start');
setTimeout(() => {
    console.log('timeout');
}, 0);
console.log('end');
```

分析：

    首先，console.log('start')入栈(调用栈)，出栈
    setTimeout部分由Web API进行处理，将其放入WebAPI开始计时
    console.log('end')入栈,出栈
    2秒等待结束后，web API将setTimeout的回调函数放入回调队列中
    事件循环会检测当前调用栈中是否为空，为空则将回调队列中的回调函数--->调用栈,执行

# 二十、DOM接口[∧](#0)<div id="20"></div>
# Node接口
所有的DOM节点对象都继承了Node接口，拥有一些共同的属性和方法  
**属性：**

    Node.prototype.nodeType
    Node.prototype.nodeName
    Node.prototype.nodeValue
    Node.prototype.textContent
    Node.prototype.baseURI
    Node.prototype.ownerDocument
    Node.prototype.nextSibling
    Node.prototype.previousSibling
    Node.prototype.parentNode
    Node.prototype.parentElement
    Node.prototype.firstChild，Node.prototype.lastChild
    Node.prototype.childNodes
    Node.prototype.isConnected
**方法：**

    Node.prototype.appendChild()
    Node.prototype.hasChildNodes()
    Node.prototype.cloneNode()
    Node.prototype.insertBefore()
    Node.prototype.removeChild()
    Node.prototype.replaceChild()
    Node.prototype.contains()
    Node.prototype.compareDocumentPosition()
    Node.prototype.isEqualNode()，Node.prototype.isSameNode()
    Node.prototype.normalize()
    Node.prototype.getRootNode()

# NodeList接口和HTMLCollection接口
节点是单个对象，有时需要一种数据结构可以容纳多个节点，DOM就提供了两种节点集合：**NodeList**和**HTMLCollection**  
**NodeList接口：**

NodeList实例是一个类似数组的对象，它的成员是节点对象。通过以下方法可以得到NodeList实例  

    Node.childNodes
    document.querySelectorAll()等节点搜索方法

NodeList实例很像数组，可以使用length属性和forEach方法,for循环。但是，它不是数组，不能使用pop或push之类数组特有的方法  

```
var children = document.body.childNodes;

Array.isArray(children) // false

children.length // 34
children.forEach(console.log)
```

属性和方法：

    NodeList.prototype.length
    NodeList.prototype.forEach()
    NodeList.prototype.item()
    NodeList.prototype.keys()，NodeList.prototype.values()，NodeList.prototype.entries()

**HTMLCollection 接口：**  
HTMLCollection是一个节点对象的集合，只能包含元素节点（element），不能包含其他类型的节点  
它的返回值是一个类似数组的对象，**但是与NodeList接口不同，HTMLCollection没有forEach方法，只能使用for循环遍历**

    Node.childNodes
    document.querySelectorAll()等节点搜索方法
    HTMLCollection.prototype.length
    HTMLCollection.prototype.item()
    HTMLCollection.prototype.namedItem()

# ParentNode接口，ChildNode接口

**ParentNode接口：**  

ParentNode接口表示当前节点是一个父节点，提供一些处理子节点的方法  

    ParentNode.children
    ParentNode.firstElementChild
    ParentNode.lastElementChild
    ParentNode.childElementCount
    ParentNode.append()，ParentNode.prepend()

由于只有元素节点（element）、文档节点（document）和文档片段节点（documentFragment）拥有子节点，因此只有这三类节点会拥有ParentNode接口。  

**ChildNode 接口：**  
ChildNode接口表示当前节点是一个子节点，提供一些相关方法。

    ChildNode.remove()
    ChildNode.before()，ChildNode.after()
    ChildNode.replaceWith()

如果一个节点有父节点，那么该节点就拥有了ChildNode接口  

# 二十一、Document节点[∧](#0)<div id="21"></div>
# Document节点
Document节点对象代表整个文档，每张网页都具备自己的document对象  
**获取document对象：**  

    正常网页：直接document或者window.document
    iframe框架里面的网页：使用iframe节点的contentDocument属性
    Ajax操作返回的文档：使用XMLHttpRequest对象的responseXML属性

document对象继承了**EventTarget**接口和**Node**接口，并且混入了**ParentNode**接口，所以在document对象上就可以调用这些接口的方法  
  
document还有很多自己的属性和方法  
  
**属性**  

    快捷方式属性
        document.defaultView
        document.doctype
        document.documentElement
        document.body，document.head
        document.scrollingElement
        document.activeElement
        document.fullscreenElement
    节点集合属性:除了document.styleSheets,其他集合属性返回的都是HTMLCollection实例
        document.links
        document.forms
        document.images
        document.embeds，document.plugins
        document.scripts
        document.styleSheets
    文档静态信息属性
        document.documentURI，document.URL
        document.domain
        document.location
        document.lastModified
        document.title
        document.characterSet
        document.referrer
        document.dir
        document.compatMode
    文档状态属性
        document.hidden
        document.visibilityState
        document.readyState
    document.cookie
    document.designMode
    document.currentScript
    document.implementation
  
**方法**
  
    document.open()，document.close()
    document.write()，document.writeln()
    document.querySelector()，document.querySelectorAll()
    document.getElementsByTagName()
    document.getElementsByClassName()
    document.getElementsByName()
    document.getElementById()
    document.elementFromPoint()，document.elementsFromPoint()
    document.createElement()
    document.createTextNode()
    document.createAttribute()
    document.createComment()
    document.createDocumentFragment()
    document.createEvent()
    document.addEventListener()，document.removeEventListener()，document.dispatchEvent()
    document.hasFocus()
    document.adoptNode()，document.importNode()
    document.createNodeIterator()
    document.createTreeWalker()
    document.execCommand()，document.queryCommandSupported()，document.queryCommandEnabled()
    document.getSelection()

# 二十二、Element节点[∧](#0)<div id="22"></div>
# Element节点
Element节点对象对应网页的 HTML 元素  
  
每一个 HTML 元素，在 DOM 树上都会转化成一个Element节点对象  

Element对象继承了Node接口，因此Node的属性和方法在Element对象都存在  
  
**不同的HTML元素对应的元素节点不同，元素节点不是一种对象，是许多种对象，每种对象除了继承Element对象的属性和方法，还具备自己独有的属性和方法**，例如元素a和元素button的构造函数就不同  
  
**实例属性**  

**1 元素特性的相关属性**

    Element.id
    Element.tagName
    Element.dir
    Element.accessKey
    Element.draggable
    Element.lang
    Element.tabIndex
    Element.title

**2 元素状态的相关属性**  

    Element.hidden
    Element.contentEditable，Element.isContentEditable

**3 其他属性**

    Element.attributes
    Element.className，Element.classList
    Element.dataset
    Element.innerHTML
    Element.outerHTML
    Element.clientHeight，Element.clientWidth
    Element.clientLeft，Element.clientTop
    Element.scrollHeight，Element.scrollWidth
    Element.scrollLeft，Element.scrollTop
    Element.offsetParent
    Element.offsetHeight，Element.offsetWidth
    Element.offsetLeft，Element.offsetTop
    Element.style
    Element.children，Element.childElementCount
    Element.firstElementChild，Element.lastElementChild
    Element.nextElementSibling，Element.previousElementSibling

**实例方法**


    属性相关方法：
        getAttribute()：读取某个属性的值
        getAttributeNames()：返回当前元素的所有属性名
        setAttribute()：写入属性值
        hasAttribute()：某个属性是否存在
        hasAttributes()：当前元素是否有属性
        removeAttribute()：删除属性
    Element.querySelector()
    Element.querySelectorAll()
    Element.getElementsByClassName()
    Element.getElementsByTagName()
    Element.closest()
    Element.matches()
    事件相关方法：
        Element.addEventListener()：添加事件的回调函数
        Element.removeEventListener()：移除事件监听函数
        Element.dispatchEvent()：触发事件
    Element.scrollIntoView()
    Element.getBoundingClientRect()
    Element.getClientRects()
    Element.insertAdjacentElement()
    Element.insertAdjacentHTML()，Element.insertAdjacentText()
    Element.remove()
    Element.focus()，Element.blur()
    Element.click()

# 二十三、属性的操作[∧](#0)<div id="23"></div>
# Element.attributes属性
所有的**元素对象**都具备arttributes属性，返回一个类似数组的对象，成员是该元素标签的属性节点对象  

```
<body bgcolor="#fff" onload="">
console.log(document.body.attributes[0]);
console.log(document.body.attributes.bgcolor);
console.log(document.body.attributes['ONLOAD'])

/*
onload=""
bgcolor="#fff"
onload=""
*/
```

例子中的三种方法均返回的是一个属性对象：该对象具备两个属性：value和name
```
document.body.attributes[1].name  //bgcolor
document.body.attributes[1].value  //#fff
```

# 元素的标准属性

每种标签元素均具备各自的标准属性，这是由HTML元素的标准决定的  
比如标签元素a具备标准属性：id和href ; 标签元素img具备标准属性：src ;  
**这些属性都是可读且可写的**
  
例如：为表单添加提交网址和提交方法  
```
var f = document.forms[0];
f.action = 'submit.php';
f.method = 'POST';
```
  
但是，**使用delete并不能删除属性**

# 属性操作的标准方法
  
    所以元素节点提供六个方法，用来操作属性(包括自定义属性)：
    getAttribute()
    getAttributeNames()
    setAttribute()
    hasAttribute()
    hasAttributes()
    removeAttribute()

# dataset属性
有时，需要在HTML元素上附加数据，供JavaScript脚本使用。一种解决方法是**自定义属性**  
可以使用setAttribute(属性名,属性值)设定  
```
<div id="mydiv" foo="bar">

var n = document.getElementById('mydiv');
n.getAttribute('foo') // bar
n.setAttribute('foo', 'baz')
```
还有一种简单地办法就是：使用标准提供的**data-属性名**在HTML中自定义属性，然后在js中使用：元素对象.dataset.属性名 获取属性  
```
<div id="mydiv" data-foo="bar">
var n = document.getElementById('mydiv');
n.dataset.foo // bar
n.dataset.foo = 'baz'
```
删除一个data-*属性，可以直接使用delete命令  
  
除了dataset属性，也可以用getAttribute('data-foo')、removeAttribute('data-foo')、setAttribute('data-foo')、hasAttribute('data-foo')等方法操作data-*属性  
  
data-后面的属性名有限制，只能包含字母、数字、连词线（-）、点（.）、冒号（:）和下划线（_)。  
而且，属性名不应该使用A到Z的大写字母，比如不能有data-helloWorld这样的属性名，而要写成data-hello-world。

# 二十四、Css操作[∧](#0)<div id="24"></div>
# CSS与JS的分工
CSS负责页面的视觉效果，JS负责与用户的行为互动，下面介绍如何通过JS操作CSS  
**CSS属性名是JavaScript保留字，则规则名之前需要加上字符串css，比如float写成cssFloat**
  
Element.style返回的只是行内样式，并不是该元素的全部样式  
通过样式表设置的样式，或者从父元素继承的样式，无法通过这个属性得到  
元素的全部样式要通过window.getComputedStyle()得到  
  

# CSSStyleDeclaration 接口

    CSSStyleDeclaration接口用来操作元素的样式
    三个地方部署了这个接口：
        元素节点的style属性（Element.style）
        CSSStyle实例的style属性
        window.getComputedStyle()的返回值

```
// style属性的值是一个 CSSStyleDeclaration 实例
// Css中的属性命名中的-在JS中需要去除，并且从第二个单词开始首字母大写
var divStyle = document.querySelector('div').style;

divStyle.backgroundColor = 'red';
divStyle.border = '1px solid black';
divStyle.width = '100px';  // 设置时必须包括单位

divStyle.backgroundColor // red
divStyle.border // 1px solid black
divStyle.width // 100px
```

### CSSStyleDeclaration 实例属性

1 CSSStyleDeclaration.cssText:读写当前规则的所有样式声明文本

```
var divStyle = document.querySelector('div').style;
// cssText的属性值不用改写 CSS 属性名
divStyle.cssText = 'background-color: red;'
  + 'border: 1px solid black;'
  + 'height: 100px;'
  + 'width: 100px;';
```

删除一个元素的所有行内样式，最简便的方法就是设置cssText为空字符串
```
divStyle.cssText = '';
```

2 CSSStyleDeclaration.length:返回一个整数值，表示当前规则包含多少条样式声明
```
// HTML 代码如下
// <div id="myDiv"
//   style="height: 1px;width: 100%;background-color: #CA1;"
// ></div>
var myDiv = document.getElementById('myDiv');
var divStyle = myDiv.style;
divStyle.length // 3
```

3 CSSStyleDeclaration.parentRule:返回当前规则所属的那个样式块（CSSRule 实例）。如果不存在所属的样式块，该属性返回null  

### CSSStyleDeclaration 实例方法

    CSSStyleDeclaration.getPropertyPriority():
        接受 CSS 样式的属性名作为参数，返回一个字符串，表示有没有设置important优先级
    CSSStyleDeclaration.getPropertyValue():
        方法接受 CSS 样式属性名作为参数，返回一个字符串，表示该属性的属性值。
    CSSStyleDeclaration.item()
        接受一个整数值作为参数，返回该位置的 CSS 属性名
    CSSStyleDeclaration.removeProperty():
        接受一个属性名作为参数，在 CSS 规则里面移除这个属性，返回这个属性原来的值
    CSSStyleDeclaration.setProperty()
        设置新的 CSS 属性。该方法没有返回值:
                第一个参数：属性名，该参数是必需的。
                第二个参数：属性值，该参数可选。如果省略，则参数值默认为空字符串。
                第三个参数：优先级，该参数可选。如果设置，唯一的合法值是important，表示 CSS 规则里面的!important。

# CSS 模块的侦测
由于浏览器的不同，不同浏览器的不同版本对于属性和方法的支持度都存在差异，所以需要检测某个CSS属性是否存在：  
存在返回'',否则返回undefined  
```
document.body.style['backgroundColor']
document.body.style['background-color']
```

# CSS 对象
为 JavaScript 操作 CSS 提供一些工具方法,这个对象目前有两个静态方法  

    CSS.escape()
    CSS.supports()

# window.getComputedStyle()
返回浏览器计算后得到的最终规则,最终样式信息指的是各种CSS规则叠加后的结果  
它接受一个节点对象作为参数，返回一个CSSStyleDeclaration实例，包含了指定节点的最终样式信息  
```
var div = document.querySelector('div');
var styleObj = window.getComputedStyle(div);
styleObj.backgroundColor
```

#CSS 伪元素
window.getComputedStyle(节点对象,伪元素);
```
var test = document.querySelector('#test');

var result = window.getComputedStyle(test, ':before').content;
var color = window.getComputedStyle(test, ':before').color;
```

# StyleSheet 接口
代表网页的一张样式表，包括link元素加载的样式表和style元素内嵌的样式表  
  
document对象的styleSheets属性，可以返回当前页面的所有StyleSheet实例,它是一个类数组的对象
  
### sheet属性
```
// HTML 代码为 <style id="myStyle"></style>
// myStyleSheet就是获取到这个style样式,它有很多的属性
var myStyleSheet = document.getElementById('myStyle').sheet;
// 例如将它的disabled属性设置为true,则该标签内定义的样式全部失效，不显示
myStyleSheet.disabled = true;
myStyleSheet instanceof StyleSheet // true
```

### StyleSheet实例属性
    StyleSheet.disabled：表示该样式表是否处于禁用状态
    Stylesheet.href：返回样式表的网址，对于内嵌样式表，该属性返回null。该属性只读。
    StyleSheet.media属性返回一个类似数组的对象（MediaList实例），成员是表示适用媒介的字符串
    StyleSheet.title属性返回样式表的title属性
    StyleSheet.type属性返回样式表的type属性，通常是text/css
    StyleSheet.parentStyleSheet属性返回包含了当前样式表的那张样式表。如果当前样式表是顶层样式表，则该属性返回null
    StyleSheet.ownerNode属性返回StyleSheet对象所在的 DOM 节点，通常是<link>或<style>
    CSSStyleSheet.cssRules属性指向一个类似数组的对象（CSSRuleList实例），里面每一个成员就是当前样式表的一条 CSS 规则。
    CSSStyleSheet.ownerRule：有些样式表是通过@import规则输入的，它的ownerRule属性会返回一个CSSRule实例，代表那行@import规则

### 实例方法
    CSSStyleSheet.insertRule(规则str,插入位置)方法用于在当前样式表的插入一个新的 CSS 规则。
    CSSStyleSheet.deleteRule(移除的规则所在的位置)：在样式表里面移除一条规则

# 实例：js添加样式表
网页添加样式表有两种方式。一种是添加一张内置样式表，即在文档中添加一个style节点  
```
// 写法一
var style = document.createElement('style');
style.setAttribute('media', 'screen');
style.innerHTML = 'body{color:red}';
document.head.appendChild(style);

// 写法二
var style = (function () {
  var style = document.createElement('style');
  document.head.appendChild(style);
  return style;
})();
style.sheet.insertRule('.foo{color:red;}', 0);
```
另一种是添加外部样式表，即在文档中添加一个<link>节点，然后将href属性指向外部样式表的 URL。  
```
var linkElm = document.createElement('link');
linkElm.setAttribute('rel', 'stylesheet');
linkElm.setAttribute('type', 'text/css');
linkElm.setAttribute('href', 'reset-min.css');

document.head.appendChild(linkElm);
```
  
# CSSRuleList 接口
一个类似数组的对象，表示一组 CSS 规则，成员都是 CSSRule 实例   
**获取 CSSRuleList 实例，一般是通过StyleSheet.cssRules属性**  
```
// HTML 代码如下
// <style id="myStyle">
//   h1 { color: red; }
//   p { color: blue; }
// </style>
var myStyleSheet = document.getElementById('myStyle').sheet;
var crl = myStyleSheet.cssRules;
crl instanceof CSSRuleList // true
```
CSSRuleList 实例里面，每一条规则（CSSRule 实例）可以通过rules.item(index)或者rules[index]拿到  
```
crl[0] instanceof CSSRule // true
// 获取该实例中的规则数
crl.length // 2
```
  
# CSSRule 接口
一条 CSS 规则包括两个部分：CSS 选择器和样式声明。下面就是一条典型的 CSS 规则。  
JavaScript 通过 CSSRule 接口操作 CSS 规则。  
一般通过 CSSRuleList 接口（StyleSheet.cssRules）获取 CSSRule 实例。  
```
// HTML 代码如下
// <style id="myStyle">
//   .myClass {
//     color: red;
//     background-color: #fff;
//   }
// </style>
var myStyleSheet = document.getElementById('myStyle').sheet;
var ruleList = myStyleSheet.cssRules;
var rule = ruleList[0];  // 获取到了一个CSSRule实例
rule instanceof CSSRule // true
```

### CSSRule 实例的属性
    CSSRule.cssText属性返回当前规则的文本
    CSSRule.parentStyleSheet：返回当前规则所在的样式表对象
    CSSRule.parentRule属性返回包含当前规则的父规则，如果不存在父规则（即当前规则是顶层规则），则返回null。
    CSSRule.type属性返回一个整数值，表示当前规则的类型。
            1：普通样式规则（CSSStyleRule 实例）
            3：@import规则
            4：@media规则（CSSMediaRule 实例）
            5：@font-face规则

### CSSStyleRule 接口
为普通的样式规则部署的  
**属性：**

    CSSStyleRule.selectorText属性返回当前规则的选择器。
    CSSStyleRule.style属性返回一个**对象**（CSSStyleDeclaration 实例），代表当前规则的样式声明，也就是选择器后面的大括号里面的部分。

### CSSMediaRule 接口
如果一条 CSS 规则是@media代码块，那么它除了 CSSRule 接口，还部署了 CSSMediaRule 接口  
**属性：**  

    media属性：返回代表@media规则的一个对象（MediaList 实例）
    conditionText属性：返回@media规则的生效条件。

#  window.matchMedia()
        基本用法
        MediaQueryList 接口的实例属性
        MediaQueryList 接口的实例方法

# 二十五、Mutation Observer API[∧](#0)<div id="25"></div>
# 概述
Mutation Observer API用来监视DOM变动，DOM的任何变动，比如增删节点、属性变化、文本内容变化，这个API都会得到通知  
Mutation Observer是异步触发，需要等到DOM变动操作都结束之后才会触发，这样就可以避免DOM变动频繁

    比如我们需要在DOM文档中插入200个<p>,如果每次插入都触发，那就会出发200个Mutation Observer的插入事件，从而造成浏览器的卡顿。
    所以只会选择在200次插入操作结束后再触发一次Mutation Observer

**Mutation Observer的特点**

    它把DOM变动记录封装在一个数组中进行处理，并非单个去处理
    可以指定观察某种DOM操作的变动，也可以观察全部的DOM变动操作

# MutationObserver构造函数
创造观察器实例，同时指定这个实例的回调函数：
```
// 这个callback函数会在每次DOM变动后调用
var observer = new MutationObserver(callback);
```
这个回调函数接收两个参数：变动数组和观察器实例
```
var observer = new MutationObserver(function (mutations, observer) {
  mutations.forEach(function(mutation) {
    console.log(mutation);
  });
});
```

# MutationObserver的实例方法
  
### observe(所要观察的DOM节点，指定所有观察的特定变动)

    观察器所能观察的DOM变动类型有三种：
        childList：子节点的变动（指新增，删除或者更改）。
        attributes：属性的变动。
        characterData：节点内容或节点文本的变动。
    需要观察哪个类型的DOM变动，就在options中将其设置为true


```
var article = document.querySelector('article');
var options = {
    'childList':true,
    'attributes':true,
    'characterData':true
}
// observer是之前创建的观察器实例
observer.observe(article,options);
```

除了变动类型，options还可以指定以下属性：

    subtree:是否将该观察器应用于该节点的后代节点
    attributeOldValue:表示观察attributes变动时，是否需要记录变动前的属性值
    characterDataOldValue：布尔值，表示观察characterData变动时，是否需要记录变动前的值。
    attributeFilter：数组，表示需要观察的特定属性（比如['class','src']）

```
// 开始监听文档根节点（即<html>标签）的变动
mutationObserver.observe(document.documentElement, {
  attributes: true,
  characterData: true,
  childList: true,
  subtree: true,   //将该监听器用于后代节点
  attributeOldValue: true,    // 记录节点属性变动前的值
  characterDataOldValue: true   // 记录节点文本变动前的值
});
```

```
var insertedNodes = [];
var observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    for (var i = 0; i < mutation.addedNodes.length; i++) {
      insertedNodes.push(mutation.addedNodes[i]);
    }
  });
  console.log(insertedNodes);
});
observer.observe(document, { childList: true, subtree: true });
```

### disconnect(),takeRecords()
观察器实例1.disconnect()：停止观察器实例1的观察，调用该方法后，DOM再发生变动，也不会触发观察器
  
takeRecords():清除变动记录，不再处理未处理的变动，返回保存未处理变动的数组
```
// 保存所有没有被观察器处理的变动
var changes = mutationObserver.takeRecords();

// 停止观察
mutationObserver.disconnect();
```

# MutationRecord对象
DOM每次发生变动都会生成一条变动记录(MutationRecord实例),该实例包含了与变动相关的所有信息  
**属性：**

    type：观察的变动类型（attributes、characterData或者childList）。
    target：发生变动的DOM节点。
    addedNodes：新增的DOM节点。
    removedNodes：删除的DOM节点。
    previousSibling：前一个同级节点，如果没有则返回null。
    nextSibling：下一个同级节点，如果没有则返回null。
    attributeName：发生变动的属性。如果设置了attributeFilter，则只返回预先指定的属性。
    oldValue：变动前的值。这个属性只对attribute和characterData变动有效，如果发生childList变动，则返回null。

# 应用示例

### 子元素的变动

```
html文档：
<div id="mydiv">
    hello
    <a href="#">哒哒</a>
</div>


// 确定观测器的回调函数
var callback = function(mutations){
    mutations.map(function(mutation){
        // 在后台打印变动类型和变动目标，变动目标就是在哪个节点的内容发生了变化
        console.log(mutation.type);
        console.log(mutation.target);
    })
}
// 产生观测器
var observer = new MutationObserver(callback);
// 确定观测类型
var options = {
    'childList':true,
    'subtree':true
}
// 对html文档的body标签添加观测
observer.observe(document.body,options);

// 在文档内部添加一个p标签，观测输出
var div = document.getElementById('mydiv');
var p = document.createElement('p');
p.innerText = 'dadadada';
div.appendChild(p);

/*
childList
<div id="mydiv">
 */
```

### 属性的变动
观测html中的div标签，并且改变div标签的height属性
```
<div id="mydiv">
    hello
    <a href="#">哒哒</a>
</div>


var callback = function (records) {
  records.map(function (record) {
    console.log(record.type);
    console.log('Previous attribute value: ' + record.oldValue);
  });
};

var reserver = new MutationObserver(callback);

var element = document.getElementById('mydiv');

var options = {
  'attributes': true,
  'attributeOldValue': true
}

reserver.observe(element, options);

// 在文档内部添加一个p标签，观测输出
var div = document.getElementById('mydiv');
div.innerText += '你好呀，哈哈哈哈哈';
div.style.height = '300px';
div.style.height = '200px';

<!--
attributes
Previous attribute value: null
attributes
Previous attribute value: height: 300px;
 -->
```

### 取代DOMContentLoaded事件
网页加载时，DOM节点的生成会产生记录，所以只要观察DOM的变动，就可以在第一时间触发相关事件，所以就不需要使用DOMContentLoaded事件  

# 二十六、事件[∧](#0)<div id="26"></div>
# EventTarget接口
DOM的事件监听和触发都定义在EventTarget接口，所有的节点对象都具备这个接口  
  
**该接口提供了三个实例方法：**

    addEventListener:绑定事件的监听函数
    removeEventListener:移除事件监听函数
    dispatchEvent:触发事件
  
### EventTarget.addEventListener(type,listener[,useCapture])
在当前节点处定义一个特定事件的监听函数，一旦事件发生，就会执行该函数  
该事件的参数：

    type:事件的名称
    listener:监听函数，事件发生时会自动调用该函数
    useCapture:布尔值，表示监听函数是否在捕获阶段触发，默认为false

```
function hello(){
    console.log('Hello,world');
}
var button = document.getElementById('btn');
button.addEventListener('click',hello,false);
```

监听函数内部的this指向当前事件所在的对象  
```
html:
<p id='para'>hello</p>
js:
var para = document.getElementById('para');
para.addEventListener('click',function(e){
    // this指向了para
    console.log(this.nodeName);  //p
},false);
```

### EventTarget.removeEventListener(type,listener,useCapture)
移除当前节点或者对象上定义的监听函数  
```
para.removeEventListener('click',listener,false);
```

### EventTarget.dispatchEvent(Event实例)
在当前节点上触发指定事件，从而触发监听函数的执行  
```
// 触发para的click事件
var para = document.getElementById('para');
para.addEventListener('click',hello,false);
var event = new Event('click');
para.dispatchEvent(event);
```





