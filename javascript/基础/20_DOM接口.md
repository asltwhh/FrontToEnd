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


