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
                background-color: yellowgreen;
            }
            #s1{
                background-color: yellow;
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
                background-color: yellowgreen;
            }
            #box2{
                width:200px;
                height: 200px;
                background-color: yellow;
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
                background-color: yellow;
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
                background-color: yellow;
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
                background-color: yellow;
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
                background-color: yellow;
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