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
                background-color: greenyellow;
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
                background-color: yellow;
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