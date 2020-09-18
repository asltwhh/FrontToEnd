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
        background-color: yellow;
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
        background-color: yellow;
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
        background-color: yellow;
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
        background-color: greenyellow;
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
        background-color: greenyellow;
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