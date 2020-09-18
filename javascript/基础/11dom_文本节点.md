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