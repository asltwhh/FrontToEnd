# innerHTML

    innerHTML 属性返回与调用元素的所有子节点（包括元素、注释和文本节点）对应的 HTML 标记

```
<p>This is a <strong>paragraph</strong> with a list following it.</p> 
    <ul> 
        <li>Item 1</li> 
        <li>Item 2</li> 
        <li>Item 3</li> 
    </ul> 
</div> 

// 对于上面的<div>元素来说，它的 innerHTML 属性会返回如下字符串。
<p>This is a <strong>paragraph</strong> with a list following it.</p> 
<ul> 
    <li>Item 1</li> 
    <li>Item 2</li> 
    <li>Item 3</li> 
</ul>
```

可以为元素设定innerHTML,可以包含标签:

```
div.innerHTML = "hello,world!!!";
div.innerHTML = "Hello & welcome, <b>\"reader\"!</b>";
```

想使用innerHTML添加script标签：（style标签同理）

    （1）必须为<script>元素指定 defer 属性
    （2）<script>元素必须位于（微软所谓的）“有作用域的元素”（scoped element）之后

```
div.innerHTML = "_<script defer>alert('hi');<\/script>";  // 在文本_之后
div.innerHTML = "<div>&nbsp;</div><script defer>alert('hi');<\/script>"; //在一个有内容的div块之后

// 一个隐藏的<input>域,不影响页面布局，首选
div.innerHTML = "<input type=\"hidden\"><script defer>alert('hi');<\/script>";
```

# outerHTML

    返回调用它的元素及所有子节点的 HTML 标签