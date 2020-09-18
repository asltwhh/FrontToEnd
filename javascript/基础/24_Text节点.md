# Text节点：
文本节点表示元素节点和属性节点的文本内容  
通常使用firstChild、nextSibling等属性获取文本节点  
使用Docment节点的createTextNode方法创造一个文本节点  
  
浏览器提供了一个Text构造函数，返回一个文本节点实例，参数就是文本节点的内容  
```
// 空字符串
var text1 = new Text();
// 非空字符串
var text2 = new Text('This is a text node');
```
文本节点除了继承Node接口，还继承了CharacterData接口,下面介绍的大部分方法均是来自CharacterData接口  

# Text节点的属性

    data：等同于NodeValue属性，用于读取文本节点的内容
    wholeText：将当前文本节点与毗邻的文本节点，作为一个整体返回
    length：返回当前文本节点的文本长度
    nextElementSibling：属性返回紧跟在当前文本节点后面的那个同级元素节点
        如果取不到元素节点，则返回null
    previousElementSibling：返回当前文本节点前面最近的同级元素节点
        如果取不到元素节点，则返回null
  
# Text 节点的方法
  
    appendData()：在Text节点尾部追加字符串
    deleteData()：删除Text节点内部的子字符串
        第一个参数为子字符串开始位置
        第二个参数为子字符串长度
    insertData()：在Text节点插入字符串
        第一个参数为插入位置
        第二个参数为插入的子字符串
    replaceData()：用于替换文本
        第一个参数为替换开始位置
        第二个参数为需要被替换掉的长度
        第三个参数为新加入的字符串
    subStringData()：用于获取子字符串
        第一个参数为子字符串在Text节点中的开始位置
        第二个参数为子字符串长度
    remove()：用于移除当前Text节点
    splitText()：将Text节点一分为二，变成两个毗邻的Text节点
        它的参数就是分割位置（从零开始），分割到该位置的字符前结束
        如果分割位置不存在，将报错
  
# DocumentFragment 节点
  
DocumentFragment节点对象没有自己的属性和方法，全部继承自Node节点和ParentNode接口  
DocumentFragment节点代表一个文档的片段，本身就是一个完整的 DOM 树形结构  
它没有父节点，parentNode返回null，但是可以插入任意数量的子节点  
  
它不属于当前文档，操作DocumentFragment节点，要比直接操作 DOM 树快得多
  
**它一般用于构建一个 DOM 结构，然后插入当前文档**
  
创建一个空的DocumentFragment节点的方法：
  
    document.createDocumentFragment
    浏览器原生的DocumentFragment构造函数
  
然后再使用其他 DOM 方法，向其添加子节点
  
**注意，DocumentFragment节点本身不能被插入当前文档。当它作为appendChild()、insertBefore()、replaceChild()等方法的参数时，是它的所有子节点插入当前文档，而不是它自身。**
  
一旦DocumentFragment节点被添加进当前文档，它自身就变成了空节点（textContent属性为空字符串），可以被再次使用。如果想要保存DocumentFragment节点的内容，可以使用cloneNode方法。
