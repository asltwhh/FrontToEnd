# classList:支持火狐3.6+和chrome
    
    HTML5 新增的一种操作类名的方式，可以让操作更简单也更安全
    为所有元素添加classList属性

原本操作元素类的方法：

```
// 这个div元素具备三个类，我们想要删除user这个类
<div class="bd user disabled">...</div>
var myDiv = document.getElementById("myDiv");
console.log(typeof myDiv.className);

// split(分隔符，分割数量) ：把一个字符串分割为字符数组，这里的分隔符使用正则表达式，s+表示不止一个空格
var className=myDiv.className.split(/\s+/);
console.log(className);
//找到要删掉的类名
var pos=-1,i,len;
for (var i = 0; i < className.length; i++) {
   if(className[i]=="user"){
      pos=i;
      break;
   }
};

// splice(index,num,item1,.....,itemX):从index位置开始删除num个元素，并且从索引index处开始新增元素item1,.....,itemX
className.splice(i,1);

// join(分隔符):把数组中的所有元素放入一个字符串
myDiv.className=className.join(" ");//将余下的类名重新拼装
console.log(myDiv.className);

```

使用classList属性操作类的方法：

    add(value)：
        将给定的字符串值添加到列表中。如果值已经存在，就不添加了。
    contains(value)：
        表示列表中是否存在给定的值，如果存在则返回 true，否则返回 false。 
    remove(value)：
        从列表中删除给定的字符串。
    toggle(value)：
        如果列表中已经存在给定的值，删除它；如果列表中没有给定的值，添加它。

删除类：

    //这一句话即可
    div.classList.remove("user");