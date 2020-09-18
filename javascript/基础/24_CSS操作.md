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
//     background-color: yellow;
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
