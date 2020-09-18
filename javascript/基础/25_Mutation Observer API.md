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
