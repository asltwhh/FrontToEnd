# matchesSelector()
    元素.matchesSelector(选择器)：检测某个元素是否与选择器匹配
        匹配返回true,否则返回false

```
<div id="myDiv" class="Div"></div>

document.div.matchesSelector("div");// true
document.div.matchesSelector("#myDiv");// true
document.div.matchesSelector(".Div");// true
```

    各个浏览器的兼容方法：
    IE 9+：msMatchesSelector()
    Firefox 3.6+：mozMatchesSelector()
    Safari 5+和 Chrome ：webkitMatchesSelector()

```
兼容各种方法：
<!DOCTYPE html>
<html>
<head>
    <title></title>
    <script>
    window.onload = function(){

        // 先定义一个函数兼容各个浏览器的选择器匹配问题
        function matchesSelector(element,selector){
            if(element.matchesSelector){
                return element.matchesSelector(selector);
            }
            if(element.msMatchesSelector){
                return element.msMatchesSelector(selector);
            }
            if(element.mozMatchesSelector){
                return element.mozMatchesSelector(selector);
            }
            if(element.webkitMatchesSelector){
                return element.webkitMatchesSelector(selector);
            }
        }
        
        // 注意：由于这里使用了body元素，而html一般都是自上向下加载界面的，如果不将js代码写在window.onload函数中，就会导致下面的代码运行出错，因为在执行下面一句时，body标签还没有创建
        console.log(matchesSelector(document.body,'#test'));//true
    }
</script>
</head>
<body id="test">
</body>
</html>
```