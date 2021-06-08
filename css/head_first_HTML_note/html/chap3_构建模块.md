
## chap3构建模块
    - 引例：Tony要出发去旅行，写了很多日志，需要你把这些日志变成一个网页web
    - 见E:\java前端\学习代码与笔记\chap3_代码\journal.html

## 1 文本的引用（1）——短
    - <q>引用的内容</q>
    - 适合于在一个段落中的部分文字引用，在<p>内部


```python
<q>千里之行，始于足下</q>
```

<q>千里之行，始于足下</q>

    - 修改journal.html中的引用部分：<q>A journey of a thousand miles begins with one Segway.</q>

<q>A journey of a thousand miles begins with one Segway.</q>

## 文本的引用（2）——长
    - 块引用<blockquote>
    - 会创建一个单独的文本块，并且还会将文字稍微缩进，注意有的浏览器并不会缩进
    - 适合于多个段落或者一块文字的引用，在<p>外部
    - 可以在blockquote中嵌入<q>


```python
<blockquote>
		Passing cars,
		<q>When you can't see</q>,
		May get you,
		A glimpse,
		Of eternity.
</blockquote>
<p>
    hello,man
</p>
```

<blockquote>
		Passing cars,
    <q>When you can't see</q>,
		May get you,
		A glimpse,
		Of eternity.
</blockquote>
<p>
    hello,man
</p>

#### blockquote和q的区别：
    - blockquote特立独行，单独显示，好像前后均存在换行；
        - 块元素通常用作web界面的主要构建模块
    - q是内联元素，在文本流中作用，出现在行内，随波逐流
        - 内联元素往往用来标记小段的内容

## 2 文本换行
    - <br>或者<br/>元素，是一个没有任何内容的元素，并且将其简化为不具备结束标记，这样可以提高效率
    - 我们将这类没有内容的元素称为void元素，例如<img>元素
    - 在每句话后面加一个<br>就可以实现换行
        - 不能将正常元素改为void元素，例如将一个超链接<a href='test.html></a>不指定内容就相当于没有任何作用


```python
<blockquote>
		Passing cars,<br>
		<q>When you can't see</q>,<br>
		May get you,<br>
		A glimpse,<br>
		Of eternity.<br>
</blockquote>
```

<blockquote>
		Passing cars,<br>
		<q>When you can't see</q>,<br>
		May get you,<br>
		A glimpse,<br>
		Of eternity.<br>
</blockquote>

## 3文本的强调:一般位于<p段落>内部
    - <em>元素强调文本内容，会将字体变为斜体：<em>呜呜呜</em>
<em>呜呜呜</em>

## 4 有序和无序列表
    - 最笨拙的方法就是使用<p>元素创建列表
        <p>1、aaa</p>
        <p>2、bbb</p>
        <p>3、ccc</p>
<p>1、aaa</p>
<p>2、bbb</p>
<p>3、ccc</p>

#### 创建列表
    - 第一步：将每个列表项放在<li>元素中LIst
    - 第二步：使用<ol>元素或者<ul>元素包围列表项
        - ol：表示有序列表OrderedList
        - ul:表示无序列表UnorderedList


```python
# 有序列表
<ol>
		<li>Walla Walla,Wa</li>
		<li>Magic City,ID</li>
		<li>Bountiful,UT</li>
		<li>Last Chance,CO</li>
		<li>Why,AZ</li> 
        <li>Arizona</li>
</ol>
```

<ol>
		<li>Walla Walla,Wa</li>
		<li>Magic City,ID</li>
		<li>Bountiful,UT</li>
		<li>Last Chance,CO</li>
		<li>Why,AZ</li> 
		<li>Truthor Consequences,NM</li>
        <li>Arizona</li>
		</ol>


```python
# 无序列表
<ul>
    <li>hello</li>
    <li>world</li>
</ul>
```

<ul>
    <li>hello</li>
    <li>world</li>
</ul>

#### 在列表中嵌套列表
    - 直接将某个列表项的内容换成一个列表即可


```python
<ol>
    <li>
        <ul>
            <li>hello</li>
            <li>huanhuan</li>
        </ul>
    </li>
    <li>你好</li>
</ol>
```

<ol>
    <li>
        <ul>
            <li>hello</li>
            <li>huanhuan</li>
        </ul>
    </li>
    <li>你好</li>
</ol>

## 5 交叉列表
    - 列表中每一项均有一个定义术语<dt>和一个定义描述<dd>


```python
<d1>
    <dt>hello</dt>
    <dd>你好</dd>
    <dt>world</dt>
    <dd>世界</dt>
<d1>
```

<d1>
    <dt>hello</dt>
    <dd>你好</dd>
    <dt>world</dt>
    <dd>世界</dt>
<d1>

h1内联 a内 em内 ul块 br内 li内 ol块 img内 q内 blockquote块


## 6 文本加粗：
    - <strong>...</strong>
    - font-style:bold;

## 如何在浏览器中使用<>这两个字符
    - 一般浏览器会根据<>判断开始和结束标记，所以在html中如果包含这两种字符，如何使用呢
    - html定义了一种字符实体
        >字符的缩写是&gt;
        <字符的缩写是&lt;
        所以如果在html中包含<>,则可以写为&lt;内容&gt;
<html>
    &lt;html&gt;
</html>

    - &字符的缩写为&amp;
&amp;

    - 常用的字符实体：英文网站https://www.w3schools.com/html/html_entities.asp
    - 中文网站https://www.w3school.com.cn/tags/tag_pre.asp
![09.png](image/09.png)

#### 元素大杂烩
    - <time>:告诉浏览器这个内容是一个时间或者日期
    - <code>:用来显示计算机程序代码
    - <pre>:希望浏览器按照自己输入的方式显示文本时，使用该元素制定文本格式
        - 被包围在 pre 元素中的文本通常会保留空格和换行符。而文本也会呈现为等宽字体。
    - <strong>:标记希望特别强调的文本

    - <strong>hello</strong>
<strong>hello</strong>
    - <pre>hello，你好，世界</pre>
<pre>hello，你好，世界</pre>
    - <time>20200116</time>
<time>20200116</time>

## 本章总结：
    - 开始输入内容之前要先规划好web界面的结构，可以自己先画一个草图，然后创建一个略图，最后再写出html
    - 先设计块元素，再使用内联元素填充
    - <p>,<blockquote>,<ol>,<ul>,<li>都是块元素，单独显示，在内容前后均存在换行
        - 即<blockquote>,<ol>,<ul>,<li>都不需要放在<p>内执行
    - <q>,<em>,<img>等都是内联元素
        - 需要放在块元素内部执行
    - <br>和<a>处于块元素和内联元素之间的一个模糊地段
    - 特殊字符要使用字符实体
    - 相关内容查询：https://www.w3school.com.cn/tags/index.asp
