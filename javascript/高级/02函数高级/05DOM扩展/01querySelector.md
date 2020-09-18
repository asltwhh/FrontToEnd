#
    querySelector()方法接收一个CSS选择符，返回与该模式匹配的第一个元素，如果没有找到匹配的元素，返回 null

```
//取得 body 元素
var body = document.querySelector("body"); 
//取得 ID 为"myDiv"的元素
var myDiv = document.querySelector("#myDiv"); 
//取得类为"selected"的第一个元素
var selected = document.querySelector(".selected"); 
//取得类为"button"的第一个图像元素
var img = document.body.querySelector("img.button");
```

    querySelectorAll()方法接收一个CSS选择符，返回与该模式匹配的所有元素组成的NodeList对象，如果没有找到匹配的元素，返回空NodeList对象

```
//取得某<div>中的所有<em>元素（类似于 getElementsByTagName("em")）
var ems = document.getElementById("myDiv").querySelectorAll("em"); 
//取得类为"selected"的所有元素
var selecteds = document.querySelectorAll(".selected"); 
//取得所有<p>元素中的所有<strong>元素
var strongs = document.querySelectorAll("p strong");
```