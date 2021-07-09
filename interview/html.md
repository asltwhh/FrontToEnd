

# 一 html类

### 1 SGML 、 HTML 、XML 和 XHTML 的区别

```
SGML:Standard Generalized Markup Language
HTML:Hyper Text Markup Language
XML:eXtensible Markup Language
XHTML:eXtensible Hyper Text Markup Language

SGML：(Standard Generalized Markup Language，标准通用标记语言)，标准通用标记语言（以下简称“通用标言”），是一种定义电子文档结构和描述其内容的国际标准语言； 通用标言为语法置标提供了异常强大的工具，同时具有极好的扩展性，因此在数据分类和索引中非常有用

HTML：超文本标记语言，他继承了SGML的很多优点，但是html是一种界面技术，他只使用了SGML中很少的一部分标记，为了便于在计算机上实现，HTML规定的标记是固定的，即HTML语法是**不可扩展的**。**html用于显示数据，着重在于显示**

XML：xml是在html和sgml的基础上诞生的。XML使用一个简单而又灵活的标准格式，为基于Web的应用提供了一个描述数据和交换数据的有效手段。但是，XML并非是用来取代HTML的。HTML着重如何描述将文件显示在浏览器中，而XML与SGML相近，它着重描述如何将数据以结构化方式表示。**xml着重于传输和存储数据，着重在于传输信息，接受自定义标签**

XHTML：（eXtensible HyperText Markup Language），是一种标记语言，表现方式与超文本标记语言（html）类似，不过语法上更加严格。

从继承关系上讲，HTML是一种基于标准通用标记语言（sgml）的应用，是一种非常灵活的置标语言，而XHTML则基于可扩展标记语言（xml），XML是sgml的一个子集。
```

[《SGML 、 HTML 、XML 和 XHTML 的区别》](https://blog.csdn.net/zbzuikeai/article/details/108622925)    [HTML，XML，XHTML的概念和区别](https://www.jianshu.com/p/57cc6dc4faaf)

### 2 DOCTYPE

```
Web 世界中存在许多不同的文档。只有了解文档的类型，浏览器才能正确地显示文档。

html也有多个不同的版本，只有完全明白页面中使用的确切 HTML 版本，浏览器才能完全正确地显示出 HTML 页面。

<!DOCTYPE>就是指示浏览器当前页面使用的HTML文档的类型。<!DOCTYPE> 不是 HTML 标签。它为浏览器提供一项信息（声明），即 HTML 是用什么版本编写的。

目前，html的版本：
	HTML	1991
    HTML+	1993
    HTML 2.0	1995
    HTML 3.2	1997
    HTML 4.01	1999
    XHTML 1.0	2000
    HTML5	2012
    XHTML5	2013
```

### 3 DTD

```
文档类型定义(Document Type Definition):是一套为了进行程序间的数据交换而建立的关于标记符的语法规则。它是标准通用标记语言(SGML)和可扩展标记语言(XML)1.0版规格的一部分，文档可根据某种DTD语法规则验证格式是否符合此规则。

在 HTML 4.01 中，<!DOCTYPE> 声明引用 DTD，因为 HTML 4.01 基于 SGML。DTD 规定了标记语言的规则，这样浏览器才能正确地呈现内容。
HTML5 不基于 SGML，所以不需要引用 DTD。在 HTML5 中只有一种：<!DOCTYPE html>
```

[《w3 school doctype》](https://www.w3school.com.cn/tags/tag_doctype.asp)   [《w3 school dtd》](https://www.w3school.com.cn/dtd/dtd_intro.asp)

### H5新特性

1. 标签语义化：header,footer,section,article,nav等
2. 存储方面：localStorage,sessionStorage,serviceWorker结合cacheStorage实现离线存储
3. audio,vedio
4. 地理定位，canvas画布
5. 多线程编程：webWorker,websocket协议

### 4 标准模式与兼容模式(怪异模式)各有什么区别?

```
标准模式用于呈现遵循最新标准的网页，而兼容模式用于呈现为传统浏览器而设计的网页。

标准模式的排版和JS运作模式都是以该浏览器支持的最高标准运行。兼容模式中，页面以宽松的向后兼容的方式显示,模拟老式浏览器的行为以防止站点无法工作。简单说就是尽可能的显示能显示的东西给用户看。

具体区别：
    1.盒模型
      在标准模式中 ：width是内容宽度 ，元素真正的宽度 = width;
      在兼容模式中 ：width则是=width+padding+border

    2.兼容模式下可设置百分比的高度和行内元素的高宽
        在标准模式下，给span等行内元素设置width和height都不会生效，而在兼容模式下，则会生效。
        在标准模式下，一个元素的高度是由其包含的内容来决定的，如果父元素没有设置高度，子元素设置一个百分比的高度是无效的。

    3.用margin:0 auto设置水平居中在IE下会失效
        使用margin:0 auto在标准模式下可以使元素水平居中，但在兼容模式下却会失效（用text-align属性解决）
        body{text-align:center};#content{text-align:left}

    4.兼容模式下Table中的字体属性不能继承上层的设置，white-space:pre会失效，设置图片的padding会失效
```

[《标准模式与兼容模式各有什么区别?》](https://www.cnblogs.com/coldfishdt/p/6533120.html)

### 5 行内元素和块元素

```
HTML4中，元素被分成两大类：inline （内联元素）与 block （块级元素）。

	1. 格式上，默认情况下，行内元素不会以新行开始，而块级元素会新起一行。
	2. 内容上，默认情况下，行内元素只能包含文本和其他行内元素。而块级元素可以包含行内元素和其他块级元素。
	3. 行内元素与块级元素属性的不同，主要是盒模型属性上：行内元素设置 width 无效，height 无效（可以设置 line-height），设置 margin 和 padding 的上下不会对其他元素产生影响。
	
行内元素：a b span img strong sub sup button input label select textarea
块元素：div ul ol li dl dt dd h1 h2 h3 h4 h5 h6 p 
```

### 6 空元素

```
标签内没有内容的 HTML 标签被称为空元素。空元素是在开始标签中关闭的。

常见的空元素有：br hr img input link meta
```

### 7 link标签

```
<link> 标签定义文档与外部资源的关系,最常见的用途是链接样式表。
link 元素是空元素，它仅包含属性。

注意： 此元素只能存在于 head 部分，不过它可出现任何次数。
<head>
	<link rel="stylesheet" type="text/css" href="theme.css" media="print" />
</head>

rel属性规定当前文档与被链接文档之间的关系。  stylesheet表示文档的外部样式表
media属性规定当被链接文档在什么条件下应用，指定设备的类型
```

### 8  @import？

```
@import用于在一个css文件中从其他样式表导入样式规则
语法：
	@import url("fineprint.css") print;;
	@import url('landscape.css') screen and (orientation:landscape);  // 横向有屏幕的设备
	这个 URL 可以是绝对路径或者相对路径。 要注意的是这个 URL 不需要指明一个文件； 可以只指明包名，然后合适的文件会被自动选择
	screen and (orientation:landscape)是一个逗号分隔的 媒体查询 条件列表，决定通过URL引入的 CSS 规则 在什么条件下应用，这可以结合移动端开发使用
```

[《媒体查询》](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Media_Queries/Using_media_queries)   

### 9 页面导入样式时，使用 link 和 @import 有什么区别？

```
1. 从属关系区别。 @import 是 CSS 提供的语法规则，只有导入样式表的作用；link 是 HTML 提供的标签，不仅可以加载 CSS 文件，还可以定义 RSS、rel 连接属性、引入网站图标等。

2. 加载顺序区别。加载页面时，link 标签引入的 CSS 被同时加载；@import 引入的 CSS 将在页面加载完毕后被加载。

3. 兼容性区别。@import 是 CSS2.1 才有的语法，故只可在 IE5+ 才能识别；link 标签作为 HTML 元素，不存在兼容性问题。

4. DOM 可控性区别。可以通过 JS 操作 DOM ，插入 link 标签来改变样式；由于 DOM 方法是基于文档的，无法使用 @import 的方式插入样式。
```

### 10 你对浏览器的理解？

```
简单来说浏览器可以分为两部分，shell 和 内核。

其中 shell 的种类相对比较多，内核则比较少。

shell 是指浏览器的外壳：例如菜单，工具栏等。主要是提供给用户界面操作，参数设置等等。它是调用内核来实现各种功能的。

内核才是浏览器的核心。内核是基于标记语言显示内容的程序或模块。也有一些浏览器并不区分外壳和内核。从 Mozilla 将 Gecko 独立出来后，才有了外壳和内核的明确划分。

    内核主要分成两部分：渲染引擎和 JS 引擎。

        渲染引擎的职责就是渲染，即在浏览器窗口中显示所请求的内容。默认情况下，渲染引擎可以显示 html、xml 文档及图片，它也可以借助插件（一种浏览器扩展）显示其他类型数据，例如使用 PDF 阅读器插件，可以显示 PDF 格式。

    	JS 引擎：解析和执行 javascript 来实现网页的动态效果。
	最开始渲染引擎和 JS 引擎并没有区分的很明确，后来 JS 引擎越来越独立，内核就倾向于只指渲染引擎。
```

### 11 常见浏览器所用内核

```
1. IE 浏览器内核：Trident 内核，也是俗称的 IE 内核；
2. Chrome 浏览器内核：统称为 Chromium 内核或 Chrome 内核，以前是 Webkit 内核，现在是 Blink内核；
3. Firefox 浏览器内核：Gecko 内核，俗称 Firefox 内核；
4. Safari 浏览器内核：Webkit 内核；
5. Opera 浏览器内核：最初是自己的 Presto 内核，后来加入谷歌大军，从 Webkit 又到了 Blink 内核；
```

### 12 浏览器的渲染原理？

```
1. 首先解析收到的文档HTML/SVG/XHTML，根据文档定义构建一棵 DOM 树，DOM 树是由 DOM 元素及属性节点组成的。
2. 然后对 CSS 进行解析，生成 CSSOM 规则树。
3. 根据 DOM 树和 CSSOM 规则树构建渲染树。渲染树的节点被称为渲染对象，渲染对象是一个包含有颜色和大小等属性的矩形，渲染对象和 DOM 元素相对应，但这种对应关系不是一对一的，不可见的 DOM 元素不会被插入渲染树。还有一些 DOM元素对应几个可见对象，它们一般是一些具有复杂结构的元素，无法用一个矩形来描述。
4. Layout – 定位坐标和大小，是否换行，各种position, overflow, z-index属性 ……。当渲染对象被创建并添加到树中，它们并没有位置和大小，所以当浏览器生成渲染树以后，就会根据渲染树来进行布局。这一阶段浏览器要做的事情是要弄清楚各个节点在页面中的确切位置和大小。通常这一行为也被称为“自动重排”。
5. 布局阶段结束后是绘制阶段，遍历渲染树并调用渲染对象的 paint 方法将它们的内容显示在屏幕上，绘制使用 UI 基础组件。
	
	值得注意的是，这个过程是逐步完成的，为了更好的用户体验，渲染引擎将会尽可能早的将内容呈现到屏幕上，并不会等到所有的html 都解析完成之后再去构建和布局 render 树。它是解析完一部分内容就显示一部分内容，同时，可能还在通过网络下载其余内容。
```

#### 12.1 问题一：渲染过程中遇到JS文件怎么处理？

```
JavaScript的加载、解析与执行会阻塞DOM的构建，也就是说，在构建DOM时，HTML解析器若遇到了JavaScript，那么它会暂停构建DOM，将控制权移交给JavaScript引擎，等JavaScript引擎运行完毕，浏览器再从中断的地方恢复DOM构建。

也就是说，如果你想首屏渲染的越快，就不应该在首屏就加载 JS 文件，这也是都建议将 script 标签放在 body 标签底部的原因。当然在当下，并不是说 script 标签必须放在底部，因为你可以给 script 标签添加 defer 或者 async 属性。

JS文件不只是阻塞DOM的构建，它会导致CSSOM也阻塞DOM的构建。

原本DOM和CSSOM的构建是互不影响，井水不犯河水，但是一旦引入了JavaScript，CSSOM也开始阻塞DOM的构建，只有CSSOM构建完毕后，DOM再恢复DOM构建。

这是什么情况？

这是因为JavaScript不只是可以改DOM，它还可以更改样式，也就是它可以更改CSSOM。前面我们介绍，不完整的CSSOM是无法使用的，但JavaScript中想访问CSSOM并更改它，那么在执行JavaScript时，必须要能拿到完整的CSSOM。所以就导致了一个现象，如果浏览器尚未完成CSSOM的下载和构建，而我们却想在此时运行脚本，那么浏览器将延迟脚本执行和DOM构建，直至其完成CSSOM的下载和构建。也就是说，在这种情况下，浏览器会先下载和构建CSSOM，然后再执行JavaScript，最后在继续构建DOM。
```

#### 问题2：重绘repain和回流reflow

```
重绘:当render tree中的一些元素需要更新属性，而这些属性只是影响元素的外观、风格，而不会影响布局的，比如background-color。
回流:当render tree中的一部分(或全部)因为元素的规模尺寸、布局、隐藏等改变而需要重新构建,任何会改变元素几何信息(元素的位置和尺寸大小)的操作，都会触发回流

回流必定会发生重绘，重绘不一定会引发回流。
重绘和回流会在我们设置节点样式时频繁出现，同时也会很大程度上影响性能。回流所需的成本比重绘高的多，改变父节点里的子节点很可能会导致父节点的一系列回流。

如何减少回流、重绘??
	1. 使用 transform 替代 top
	2. 使用 visibility 替换 display: none ，因为前者只会引起重绘，后者会引发回流（改变了布局）
    3. 不要把节点的属性值放在一个循环里当成循环里的变量。
    	for(let i = 0; i < 1000; i++) {
            // 获取 offsetTop 会导致回流，因为需要去获取正确的值
            console.log(document.querySelector('.test').style.offsetTop)
        }
    4. 不要使用 table 布局，可能很小的一个小改动会造成整个 table 的重新布局
    5. 动画实现的速度的选择，动画速度越快，回流次数越多，也可以选择使用 requestAnimationFrame
    6. CSS 选择符从右往左匹配查找，避免节点层级过多
    7. 将频繁重绘或者回流的节点设置为图层，图层能够阻止该节点的渲染行为影响别的节点。比如对于 video 标签来说，浏览器会自动将该节点变为图层。
```

### 问题3 ：文档的预解析

```
Webkit 和 Firefox 都做了这个优化
当执行 JavaScript 脚本时，另一个线程解析剩下的文档，并加载后面需要通过网络加载的资源。
这种方式可以使资源并行加载从而使整体速度更快。需要注意的是，预解析并不改变 DOM 树，它将这个工作留给主解析过程，自己只解析外部资源的引用，比如外部脚本、样式表及图片。

就是在没有开启async和defer的情况下，浏览器提供另一个线程，主线程在遇到js脚本则直接去加载和执行该脚本，另一个线程负责继续解析剩下的文档，并加载后面需要通过网络加载的资源。
```

#### 问题3：async和defer的作用是什么？有什么区别?

```
1.	<script src="script.js"></script>
	没有 defer 或 async，浏览器会立即加载并执行指定的脚本，也就是说不等待后续载入的文档元素，读到就加载并执行。
	
2.	<script defer src="script.js"></script>(延迟执行)
    defer 属性表示延迟执行引入的 JavaScript脚本。执行顺序：
    1. HTML所有元素解析完成，DOM树构建完成后。不需要管外部资源有没有下载完毕，和外部资源的下载并行加载和执行
    2. 但是 script.js 的执行要在之后，即文档显示之后，DOMContentLoaded 事件触发之前完成
    多个脚本按顺序执行。
    不会阻塞页面首屏的加载过程

3.	<script async src="script.js"></script> (异步下载)
	async 属性表示异步执行引入的 JavaScript
	
	async的脚本请求的过程和DOM树的构建并行执行，但是当async的脚本得到响应结果，则如果此时DOM树还未构建完毕，则先执行该脚本，然后再继续构建DOM树
	与 defer 的区别在于，如果已经加载好，就会开始执行——无论此刻是 HTML 解析阶段还是 DOMContentLoaded 触发之后。所以它依然可能阻塞页面的加载过程
	多个脚本的执行顺序无法保证。
```

#### 首页白屏时间长

为外部js文件添加async或者defer标记，防止其对于创建DOM树过程的阻塞，个人感觉defer更好，一定不会阻塞该过程

#### 问题4：DOMContentLoaded与load的区别

```
DOMContentLoaded：（也叫DOMReady）dom内容加载完毕。当输入一个URL，页面的展示首先是空白的，然后过一会，页面会展示出内容，但是页面的有些资源比如说图片资源还无法看到，此时页面是可以正常的交互，过一段时间后，图片才完成显示在页面。从页面空白到展示出页面内容，会触发DOMContentLoaded事件。而这段时间就是HTML文档被加载和解析完成。

load：页面上所有的资源（图片，音频，视频等）被加载以后才会触发load事件，简单来说，页面的load事件会在DOMContentLoaded被触发之后才触发。
```

[《DOMContentLoaded与load的区别》](https://www.cnblogs.com/caizhenbo/p/6679478.html)

#### 问题5：为什么操作 DOM 慢

```
因为 DOM 是属于渲染引擎中的东西，而 JS 又是 JS 引擎中的东西。

当我们通过 JS 操作 DOM 的时候，其实这个操作涉及到了两个线程之间的通信，那么势必会带来一些性能上的损耗。操作 DOM 次数一多，也就等同于一直在进行线程之间的通信，并且操作 DOM 可能还会带来重绘回流的情况，所以也就导致了性能上的问题。
```

#### 问题6：渲染页面时常见哪些不良现象？

**由于浏览器的渲染机制不同，在渲染页面时会出现两种常见的不良现象—-白屏问题和FOUS（无样式，内容闪烁）**

```
FOUC：由于浏览器渲染机制（比如firefox），在CSS加载之前，先呈现了HTML，就会导致展示出无样式内容，然后样式突然呈现的现象；

白屏：有些浏览器渲染机制（比如chrome）要先构建DOM树和CSSOM树，构建完成后再进行渲染，如果CSS部分放在HTML尾部，由于CSS未加载完成，浏览器迟迟未渲染，从而导致白屏；也可能是把js文件放在头部，脚本会阻塞后面内容的呈现，脚本会阻塞其后组件的下载，出现白屏问题。
```

[《深入浅出浏览器渲染原理》](https://blog.fundebug.com/2019/01/03/understand-browser-rendering/)

### 13 SVG

```
SVG: Scalable Vector Graphics,缩放矢量图形,是一种用于描述二维的矢量图形,基于 XML 的标记语言。作为一个基于文本的开放网络标准，SVG能够优雅而简洁地渲染不同大小的图形，并和CSS，DOM，JavaScript和SMIL等其他网络标准无缝衔接。

SVG 文件可通过以下标签嵌入 HTML 文档：<embed>、<object> 或者 <iframe>。
<embed src="rect.svg" width="300" height="100" 
type="image/svg+xml" pluginspage="http://www.adobe.com/svg/viewer/install/" />

<object data="rect.svg" width="300" height="100" 
type="image/svg+xml"
codebase="http://www.adobe.com/svg/viewer/install/" />

<iframe src="rect.svg" width="300" height="100">
</iframe>
```

### 14 H5对于各种浏览器的兼容性

```
HTML5支持所有的主流浏览器，如Chrome，火狐，Safari，IE9及以上的浏览器，但是不兼容IE8及以下的浏览器。
所有兼容的浏览器，不论新旧，都会自动把未识别元素当做行内元素来处理，可以设置：
	header, section, footer, aside, nav, main, article, figure {
        display: block; 
    }

ie8-兼容性解决：
方法1：手动创建标签,但是注意手动创建的标签默认都是行内元素，可以使用display：block转换为块元素
	document.createElement('article');  // 如果不添加这句话则不能为其设置样式或者通过js操作
	并且这句话需要在dom加载前执行，即要放在
方法2：引入第三方插件，下面的代码是一段注释，但是 IE9 的早期版本会读取它（并理解它）。
        国内用户请使用百度静态资源库（Google 资源库在国内不稳定）：
        <!--[if lt IE 9]>
            <script src="http://apps.bdimg.com/libs/html5shiv/3.7/html5shiv.min.js"></script>
        <![endif]-->
		原作者在googlecode上提供的地址：
		<!--[if lt IE 9]>
			<script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
		<![endif]-->
```

[《html5的浏览器兼容》](https://blog.csdn.net/hhhhhh__hh/article/details/116487457)

### 15 添加自定义标签

```
自定义标签和H5中添加的标签一样，默认都是行内元素，并且不兼容IE8-
除了IE8-之外的浏览器都可以自定义标签，并且为其添加样式
IE8-需要使用document.createElement()方法手动添加标签
```

### 16 html语义化的理解

```
html 语义化主要指的是我们应该使用合适的标签来划分网页内容的结构。

html 的本质作用其实就是定义网页文档的结构,一个语义化的文档，能够使页面的结构更加清晰，易于理解。这样不仅有利于开发者的维护和理解，同时也能够使机器对文档内容进行正确的解读。比如说我们常用的 b 标签和 strong 标签，它们在样式上都是文字的加粗，但是 strong 标签拥有强调的语义。

对于一般显示来说，可能我们看上去没有差异，但是对于机器来说，就会有很大的不同。如果用户使用的是屏幕阅读器来访问网页的话，使用 strong 标签就会有明显的语调上的变化，而 b 标签则没有。

如果是搜索引擎的爬虫对我们网页进行分析的话，那么它会依赖于 html 标签来确定上下文和各个关键字的权重，一个语义化的文档对爬虫来说是友好的，是有利于爬虫对文档内容解读的，从而有利于我们网站的 SEO 。从 html5 我们可以看出，标准是倾向于以语义化的方式来构建网页的，比如新增了 header、main 、footer 这些语义标签，删除了 big 、font 这些没有语义的标签。

SEO:Search Engine Optimization,搜索引擎优化。简单地说，SEO是指从自然搜索结果得到网站流量的技术和过程。更严谨些的定义可以表达为：SEO是指在了解搜索引擎自然排名机制的基础上，对网站进行内部及外部的调整优化，不断改进网站在搜索引擎中的关键词自然排名，得到更多流量，从而达到网站销售及品牌建设的目标
```

### 17 前端需要注意哪些 SEO ？

```
1. 合理的 title、description、keywords：搜索对这三项的权重逐个减小，title 值强调重点即可，重要关键词出现不要超过2次，而且要靠前，不同页面 title 要有所不同；description 把页面内容高度概括，长度合适，不可过分堆砌关键词，不同页面 description 有所不同；keywords 列举出重要关键词即可。

2. 语义化的 HTML 代码，符合 W3C 规范：语义化代码让搜索引擎容易理解网页。

3. 重要内容 HTML 代码放在最前：搜索引擎抓取 HTML 顺序是从上到下，有的搜索引擎对抓取长度有限制，保证重要内容肯定被抓取。

4. 重要内容不要用 js 输出：爬虫不会执行 js 获取内容

5. 少用 iframe：搜索引擎不会抓取 iframe 中的内容

6. 非装饰性图片必须加 alt

7. 提高网站速度：网站速度是搜索引擎排序的一个重要指标
```

### 18 b 与 strong 的区别和 i 与 em 的区别？

```
首先：这几个标签都是行内标签

从页面显示效果来看，被 <b> 和 <strong> 包围的文字将会被加粗，而被 <i> 和 <em> 包围的文字将以斜体的形式呈现。

但是 <b> <i> 是自然样式标签，分别表示无意义的加粗，无意义的斜体，表现样式为 { font-weight: bolder}，仅仅表示「这里应该用粗体显示」或者「这里应该用斜体显示」，此两个标签在 HTML4.01 中并不被推荐使用。

而 <em> 和 <strong> 是语义样式标签。 <em> 表示一般的强调文本，而 <strong> 表示比 <em> 语义更强的强调文本。

使用阅读设备阅读网页时：<strong>会加粗显示且会重读，而<b>只是加粗显示。
```

### 19 H5离线存储

#### 1 工作原理

```
随着Web App的发展，越来越多的移动端App使用HTML5的方式来开发，除了一些HybridApp以外，其他一部分Web App还是通过浏览器来访问的，通过浏览器访问就需要联网发送请求，这样就使得用户在离线的状态下无法使用App，同时Web App中一部分资源并不是经常改变，并不需要每次都向服务器发出请求，出于这些原因，HTML5提出的一个新的特性：离线存储。

通过离线存储，我们可以通过把需要离线存储在本地的文件列在一个manifest配置文件中，这样即使在离线的情况下，用户也可以正常使用App。
```

#### 2 浏览器怎么管理和加载H5的离线存储资源呢

这个问题尚未解决，存疑？？？？

```
在线的情况下:
	浏览器发现html头部有manifest属性，它会请求manifest文件
	如果是第一次访问app，那么浏览器就会根据manifest文件的内容下载相应的资源并且进行离线存储。
	如果已经访问过app并且资源已经离线存储了，那么浏览器就会先使用离线的资源加载页面，然后浏览器会对比新的manifest文件与旧的manifest文件，如果文件没有发生改变，就不做任何操作，如果文件改变了，那么就会重新下载文件中的资源并进行离线存储。但是浏览器不会立刻使用新的缓存文件修改界面，需要到下次打开页面才能生效。如果需要使用新的数据，则需要重新打开页面

离线的情况下，浏览器就直接使用离线存储的资源。
```

### 20 常见的浏览器端的存储技术有哪些

```
浏览器常见的存储技术有 cookie(4kb)、localStorage 和 sessionStorage(5MB左右)。

还有用于大规模数据存储:indexDB（一般来说不少于 250MB）。
```

### 21 cookies，sessionStorage 和 localStorage 的区别？

```
SessionStorage， LocalStorage， Cookie 这三者都可以被用来在浏览器端存储数据，而且都是字符串类型的键值对。区别在于前两者属于 HTML5 WebStorage，创建它们的目的便于客户端存储数据。而 cookie 是网站为了标示用户身份而储存在用户本地终端上的数据（通常经过加密）。cookie 数据始终在同源（协议、主机、端口相同）的 http 请求中携带（即使不需要），会在浏览器和服务器间来回传递。
 
存储大小：
   	cookie 数据大小不能超过4 k 。
   	sessionStorage 和 localStorage 虽然也有存储大小的限制，但比 cookie 大得多，可以达到 5M 或更大。

有期时间：
   	localStorage    存储持久数据，浏览器关闭后数据不丢失除非主动删除数据。
   	sessionStorage  数据在页面会话结束(标签页关闭)时会被清除。页面会话在浏览器打开期间一直保持，并且重新加载或恢复页面仍会保持原来的页面会话。在新标签或窗口打开一个页面时会在顶级浏览上下文中初始化一个新的会话。
   	cookie          设置的 cookie 过期时间之前一直有效，即使窗口或浏览器关闭。
  
 作用域：
     sessionStorage  只在同一个标签页中共享数据，也就是只在当前会话中共享。
     localStorage    在所有同源窗口中都是共享的。
     cookie          在所有同源窗口中都是共享的。
```

### cacheStorage和webStorage的区别

webStorage包括 localStorage、sessionStorage

sessionStorage用于本地存储一个会话（session）的数据，这些数据只有在同一个会话中的页面才能访问并且当会话结束后数据也随之销毁（浏览器关闭）。因此sessionStorage不是一种持久化的本地存储，仅仅是会话级别的存储，操作与localStorage一样，就不细讲了。

localStorage在同源页面中共享数据，是一种持久化存储

cacheStorage用来存储Response对象的，也就是说用来对HTTP响应做缓存的。它可以配合service-worker实现离线缓存

### cookie和session的区别

cookie和session都用来存储用户信息，cookie存放于客户端，session存放于服务器端；

cookie存放于客户端，很有可能被窃取，所以cookie一般用来存放不敏感的信息，比如用户设置的网站主题等。另外，每次http请求都会携带cookie信息，如果cookie数据过大，会产生性能问题。单个cookie保存的数据不能超过4kb,很多浏览器都限制一个站点最多保存20个cookie

session一般保存敏感信息，比如用户的登录信息。

### 22 如何实现浏览器内多个标签页之间的通信?

```
浏览器端存储信息：
    1. 使用H5提供的 localStorage 实现,可以在一个标签页对 localStorage 的变化事件进行监听，然后当另一个标签页修改数据的时候，我们就可以通过这个监听事件来获取到数据。这个时候 localStorage 对象就是充当的中介者的角色。     同源
    2. 使用cookie   同源   通过document
    3. 使用indexdB    同源   
    4. 使用iframe,将子页面作为一个iframe放在父页面中。要求同源  
    	对于不同源的情况,两种处理办法：
    		(1)可以通过在父(子)页面的修改对方的hash值，并且在对应的页面中监听onhashchange事件实现通讯
			(2)使用H5提供的postMesage，主要是借助于iframe使用后，在父(子)页面中可以获取对方的window对象，通过在父页面使用子页面的window对象.postMessage向子页面的所在域发送信息，在子页面监听message事件接收信息，同理反之。
服务器端信息存储：
    5. 使用WebSocket协议，标签页通过向服务器发送数据，然后由服务器向其他标签页推送转发。    同源
    6. 使用ShareWorker,shareWorker 会在页面存在的生命周期内创建一个唯一的线程，并且开启多个页面也只会使用同一个线程。这个时候共享线程就可以充当中介者的角色。标签页间通过共享一个线程，然后通过这个共享的线程来实现数据的交换。     同源  
```

### 23 iframe的缺点

```
1. iframe 会阻塞主页面的 onload 事件。window 的 onload 事件需要在所有 iframe 加载完毕后（包含里面的元素）才会触发。在 Safari 和 Chrome 里，通过 JavaScript 动态设置 iframe 的 src 可以避免这种阻塞情况。
2. 搜索引擎的检索程序无法解读这种页面，不利于网页的 SEO 。
3. iframe 和主页面共享连接池，而浏览器对相同域的连接有限制，所以会影响页面的并行加载。
4. 浏览器的后退按钮失效。
5. 小型的移动设备无法完全显示框架。
```

### 24 跨域处理

```
1 JSONP
2 CORS
3 H5提供的postMessage+iframe
4 修改document.domain+iframe
	相同主域名下的不同子域名资源，设置 document.domain 为 相同的一级域名
	需要保证：同一一级域名；相同协议；相同端口
5 Html5 websocket 协议	
	浏览器一定版本要求，服务器需要支持 websocket 协议
6 iframe+hash
```

### 24 websocket和http协议的关系

    1. WebSocket和HTTP都是基于TCP协议的两个不同的协议
    2. WebSocket依赖于HTTP连接
    
    在传输层建立了tcp连接后，进入应用层，websocket第一次发起请求使用的还是http协议请求，但是它在http请求中添加了几个请求头，用以说明要建立websocket连接
    	GET /chat HTTP/1.1
        Host: server.example.com
        Upgrade: websocket   把当前的HTTP请求升级到WebSocket协议
        Connection: Upgrade
        Sec-WebSocket-Key:dGhlIHNhbXBsZSBub25jZQ==
        Origin: http://example.com
        Sec-WebSocket-Version: 13
    如果是服务器支持的协议，则必须返回101：
        HTTP/1.1 101 Switching Protocols
        Upgrade: websocket
        Connection: Upgrade
        Sec-WebSocket-Accept:s3pPLMBiTxaQ9kYGzzhZRbK+xOo=
    至此，HTTP请求就完成了它的使命，如果成功触发onopen事件，否则触发onerror事件，后面的传输则不再依赖HTTP协议。
    
    区别：
     	1. 单工和全双工的区别
     	http协议：建立好tcp请求后，浏览器每次发起一个http请求，服务器才会响应一个response，请求和响应是一一对应的，并且只能是先请求后响应，服务器不能主动发起请求
        webscoket协议: 在完成协议的升级，成功触发onopen事件后，websocket可以实现全双工通信，即服务器和客户端都可以主动发送数据给对方
        2. Websocket是一个持久化的协议，相对于HTTP这种非持久的协议来说
        在HTTP1.0中，客户端发送一次请求，服务器端返回一次响应，这次HTTP请求就结束了，断开tcp连接。
        在HTTP1.1中进行了改进，使得有一个keep-alive，也就是说，在一个HTTP连接中，可以发送多个Request，接收多个Response。但是请记住 Request = Response ， 在HTTP中永远是这样，也就是说一个request只能有一个response。而且这个response也是被动的，不能主动发起。
        websocket协议：只需要经过一次HTTP请求，就可以做到源源不断的信息传送了。除非关闭websocket连接，使用websocket.close()关闭 WebSocket连接,如果连接已经关闭,则此方法不执行任何操作。

[《理清 WebSocket 和 HTTP 的关系 - 知乎 (zhihu.com)》](https://zhuanlan.zhihu.com/p/95622141)   [《WebSocket 是什么原理？为什么可以实现持久连接》](https://www.zhihu.com/question/20215561/answer/16147953)

### 25 http1.0和http1.1的区别

```
HTTP 1.0规定浏览器与服务器只保持短暂的连接，浏览器的每次请求都需要与服务器建立一个TCP连接，服务器完成请求处理后立即断开TCP连接，服务器不跟踪每个客户也不记录过去的请求。但是可以在请求时，加上 Connection: keep-a live 来要求服务器不要关闭 TCP 连接

HTTP 1.1默认使用长连接，增加了新的请求头来帮助实现，例如，Connection请求头的值为Keep-Alive时，客户端通知服务器返回本次请求结果后保持连接；Connection请求头的值为close时，客户端通知服务器返回本次请求结果后关闭连接。HTTP 1.1还提供了与身份认证、状态管理和Cache缓存等机制相关的请求头和响应头。

目前对于同一个域，大多数浏览器支持 同时建立 6 个持久连接。
```

### 26 long poll长轮询和ajax轮询

```
ajax轮询 
	让浏览器隔个几秒就发送一次请求，询问服务器是否有新信息。如果没有，则断开tcp连接,下一次重新连接
	场景再现：
		客户端：啦啦啦，有没有新信息(Request)
		服务端：没有（Response）
		客户端：啦啦啦，有没有新信息(Request)
		服务端：没有。。（Response）
		客户端：啦啦啦，有没有新信息(Request)
		服务端：你好烦啊，没有啊。。（Response）
		客户端：啦啦啦，有没有新消息（Request）
		服务端：好啦好啦，有啦给你。（Response）
		客户端：啦啦啦，有没有新消息（Request）服务端：。。。。。没。。。。没。。。没有（Response） 
		
loop poll长轮询 
	原理跟 ajax轮询 差不多，都是采用轮询的方式，不过采取的是阻塞模型，客户端发起连接后，如果没消息，就一直不返回Response给客户端，连接不断开。直到有消息才返回，返回完之后，断开本次连接。客户端再次建立连接，周而复始。
	场景再现：
		客户端：啦啦啦，有没有新信息，没有的话就等有了才返回给我吧（Request）
		服务端：额。。等待到有消息的时候。。来 给你（Response）
		客户端：啦啦啦，有没有新信息，没有的话就等有了才返回给我吧（Request） -loop
		
	从上面可以看出其实这两种方式，都是在不断地建立HTTP连接，然后等待服务端处理，可以体现HTTP协议的另外一个特点，被动性。何为被动性呢，其实就是，服务端不能主动联系客户端，只能有客户端发起。简单地说就是，服务器不会、不能主动发起连接。
	
缺陷：
	1. 两种都是非常消耗资源的。
		ajax轮询 需要服务器有很快的处理速度和资源。（速度）
		long poll 需要有很高的并发，因为连接不终止，服务器只有存在数据了才返回响应，结束本次连接，占用了一个http请求的资源。（场地大小）
		所以ajax轮询 和long poll 都有可能发生服务器任务太多，无法响应的情况
```

### 27 websocket如何兼容低版本的浏览器

```
1. 使用长轮询或者长连接
2. 使用flash或者其他方法实现一个websocket客户端
```

### 28  如何在页面上实现一个圆形的可点击区域

```
1. 纯 css 实现，使用 border-radius ，当 border-radius 的长度等于宽高相等的元素值的一半时，即可实现一个圆形的点击区域。
2. 纯 js 实现，判断一个点在不在圆上的简单算法，通过监听文档的点击事件，获取每次点击时鼠标的位置，判断该位置是否在我们规定的圆形区域内。
3. canvas实现：
	(1)在画布上画一个带颜色的填充圆，然后由于画布上的其他像素点都是透明色的，所以通过判断单个像素的颜色就可以确定当前是否点击到了填充圆上
	(2)通过ctx.isPointInPath(x, y)判断该点是否点击到了当前canvas画布的圆上
```

### 29 实现不使用 border 画出 1 px 高的线，在不同浏览器的标准模式与怪异模式下都能保持一致的效果。

```
<div style="height:1px;overflow:hidden;background-color:red;"></div>
```

### 30 title和h1的区别

```
title属性没有明确意义，只是个标题
h1则表示层次明确的标题，对页面信息的抓取也有很大影响
```

### 31 img的alt和title的区别

```
alt:在图片不能正常显示时可以显示alt提供的文本信息，在屏幕阅读器可以读取该内容
title:在鼠标悬浮时显示
```

### 32 渐进增强和优雅降级

```
渐进增强：针对低版本浏览器进行构建页面，保证最基本的功能，然后再针对高级浏览器进行效果、交互等改进和追加功能达到更好的用户体验。

 优雅降级：一开始就根据高版本浏览器构建完整的功能，然后再针对低版本浏览器进行兼容。
```

### 33 attribute和property的区别

```
attribute是dom元素作为html标签所拥有的属性
property是dom元素在js中作为对象拥有的属性
对于 html 的标准属性来说，attribute 和 property 是同步的，是会自动更新的，
但是对于自定义的属性来说，他们是不同步的。
```

### 34 对web标准、可用性、可访问性的理解

```
可用性（Usability）：产品是否容易上手，用户能否完成任务，效率如何，以及这过程中用户的主观感受可好，是从用户的角度来看产品的质量。可用性好意味着产品质量高，是企业的核心竞争力

可访问性（Accessibility）：Web 内容对于残障用户的可阅读和可理解性
 
可维护性（Maintainability）：一般包含两个层次，一是当系统出现问题时，快速定位并解决问题的成本，成本低则可维护性好。二是代码是否容易被人理解，是否容易修改和增强功能。
```

### 35  IE 各版本和 Chrome 可以并行下载多少个资源？

```
1. IE6：2个；
	IE7：4个；
	IE8+：6个
2. iE7 升级之后的 6 个并发，之后版本也是 6 个
3. Firefox，chrome 也是6个

同一时间针对同一域名下的请求有一定数量限制，超过限制数目的请求会被阻塞。大多数浏览器的并发数量都控制在6以内。有些资源的请求时间很长，因而会阻塞其他资源的请求。因此，对于一些静态资源，如果放到不同的域名下面就能实现与其他资源的并发请求。
```

### 36 怎么重构页面？

```
1. 编写 CSS
2. 让页面结构更合理化，提升用户体验
3. 实现良好的页面效果和提升性能
```

### 37 浏览器架构

```
* 用户界面
   * 主进程
   * 内核
       * 渲染引擎
       * JS 引擎
           * 执行栈
       * 事件触发线程
           * 消息队列
               * 微任务
               * 宏任务
       * 网络异步线程
       * 定时器线程
```

### 38 meta

```
<meta> 元素可提供有关页面的元信息（meta-information），比如针对搜索引擎和更新频度的描述和关键词。
 <meta> 标签位于文档的头部，不包含任何内容。<meta> 标签的属性定义了与文档相关联的名称/值对。
 
 <meta name="description" content="不超过150个字符"/>       页面描述
 <meta name="keywords" content=""/>      页面关键词者
 <meta name="author" content="name, email@gmail.com"/>    网页作
 <meta name="robots" content="index,follow"/>      搜索引擎抓取
 <meta name="viewport" content="initial-scale=1, maximum-scale=3, minimum-scale=1, user-scalable=no"> 为移动设备添加 viewport
 	initial-scale：页面首次被显示是可视区域的缩放级别，取值1.0则页面按实际尺寸显示，无任何缩放
 	maximum-scale：用户可将页面放大的程序，1.0将禁止用户放大到实际尺寸之上。
 	minimum-scale：用户可将页面缩小的程序，1.0将禁止用户缩小到实际尺寸之下。
 	user-scalable：是否可对页面进行缩放，no 禁止缩放
 <meta name="apple-mobile-web-app-title" content="标题"> iOS 设备 begin
```

### 39 移动端点击事件的300s延迟

```
300 毫秒延迟的主要原因是解决双击缩放(double tap to zoom)。双击缩放，顾名思义，即用手指在屏幕上快速点击两次，iOS 自带的 Safari 浏览器会将网页缩放至原始比例。

如果页面内存在一个链接，当用户一次点击屏幕之后(还没来得及点击第二次或者没有想要点击第二次)，浏览器并不能立刻判断用户是确实要打开这个链接，还是想要进行双击操作。所以浏览器中手动点击和真正触发click事件之间存在300ms延迟，如果没有二次点击，则说明是打开链接

在移动端的click事件可以拆解为：touchstart -> touchmove -> touchend -> click，浏览器在 touchend 之后会等待约 300ms ，如果没有再次点击行为，则触发 click 事件。 而浏览器等待约 300ms 的原因是，判断用户是否是双击行为，双击过程中就不适合触发 click 事件了。 由此可以看出 click 事件触发代表一轮触摸事件的结束。

方法1： Chrome on Android (all versions)：直接关闭缩放,那双击缩放的功能就没有意义了，此时浏览器可以禁用默认的双击缩放行为并且去掉300ms的点击延迟。
<meta name="viewport" content="width=device-width, user-scalable=no"> 
或者：
<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1">

方法2：对于Android版chrome 32+浏览器
<meta name="viewport" content="width=device-width">
因为双击缩放主要是用来改善桌面站点在移动端浏览体验的，而随着响应式设计的普及，很多站点都已经对移动端坐过适配和优化了，这个时候就不需要双击缩放了，如果能够识别出一个网站是响应式的网站，那么移动端浏览器就可以自动禁掉默认的双击缩放行为并且去掉300ms的点击延迟。
它没有完全禁用缩放，而只是禁用了浏览器默认的双击缩放行为，但用户仍然可以通过双指缩放操作来缩放页面。

方法3：IE支持，其他浏览器支持不完善
	IE11: touch-action: manipulation; 去除某些元素上的双击缩放功能
	IE10：-ms-touch-action: manipulation.

方法4：使用FastClick.js：除了解决300ms延迟外，还可以解决单击穿透问题

FastClick 是 FT Labs 专门为解决移动端浏览器 300 毫秒点击延迟问题所开发的一个轻量级的库。FastClick的实现原理是在检测到touchend事件的时候，会通过DOM自定义事件立即触发模拟一个click事件，并把浏览器在300ms之后的click事件阻止掉。
    <script src="https://as.alipayobjects.com/g/component/fastclick/1.0.6/fastclick.js"></script>
      <script>
        if ('addEventListener' in document) {
          document.addEventListener('DOMContentLoaded', function() {
            FastClick.attach(document.body);
          }, false);
        }
        if(!window.Promise) {
          document.writeln('<script src="https://as.alipayobjects.com/g/component/es6-promise/3.2.2/es6-promise.min.js"'+'>'+'<'+'/'+'script>');
        }
      </script>
```

### 39 css reset 和 normalize.css 有什么区别？

```
为什么会有 CSS Reset 的存在呢？那是因为早期的浏览器支持和理解的 CSS 规范不同，导致渲染页面时效果不一致，会出现很多
 兼容性问题。

 reset 的目的，是将所有的浏览器的自带样式重置掉，这样更易于保持各浏览器渲染的一致性。

 normalize 的理念则是尽量保留浏览器的默认样式，不进行太多的重置，而尽力让这些样式保持一致并尽可能与现代标准相符合。


 1.Normalize.css 保护了有价值的默认值

 Reset 通过为几乎所有的元素施加默认样式，强行使得元素有相同的视觉效果。 相比之下，Normalize.css 保持了许多默认的浏
 览器样式。 这就意味着你不用再为所有公共的排版元素重新设置样式。 当一个元素在不同的浏览器中有不同的默认值时，Normali
 ze.css 会力求让这些样式保持一致并尽可能与现代标准相符合。


 2.Normalize.css 修复了浏览器的 bug

 它修复了常见的桌面端和移动端浏览器的 bug。这往往超出了 Reset 所能做到的范畴。关于这一点，Normalize.css 修复的问题
 包含了 HTML5 元素的显示设置、预格式化文字的 font-size 问题、在 IE9 中 SVG 的溢出、许多出现在各浏览器和操作系统中
 的与表单相关的 bug。


 3.Normalize.css 没有复杂的继承链

 使用 Reset 最让人困扰的地方莫过于在浏览器调试工具中大段大段的继承链。在 Normalize.css 中就不会有这样的问题，因为在
 我们的准则中对多选择器的使用时非常谨慎的，我们仅会有目的地对目标元素设置样式。


 4.Normalize.css 是模块化的

 这个项目已经被拆分为多个相关却又独立的部分，这使得你能够很容易也很清楚地知道哪些元素被设置了特定的值。因此这能让你自己
 选择性地移除掉某些永远不会用到部分（比如表单的一般化）。


 5.Normalize.css 拥有详细的文档

 Normalize.css 的代码基于详细而全面的跨浏览器研究与测试。这个文件中拥有详细的代码说明并在 Github Wiki 中有进一步的
 说明。这意味着你可以找到每一行代码具体完成了什么工作、为什么要写这句代码、浏览器之间的差异，并且你可以更容易地进行自己
 的测试。
```

### 40 head 标签中必不少的是？

```
<head> 标签用于定义文档的头部，它是所有头部元素的容器。<head> 中的元素可以引用脚本、指示浏览器在哪里找到样式表、提供元信息等等。

 文档的头部描述了文档的各种属性和信息，包括文档的标题、在 Web 中的位置以及和其他文档的关系等。绝大多数文档头部包含的数据都不会真正作为内容显示给读者。

 下面这些标签可用在 head 部分：<base>, <link>, <meta>, <script>, <style>, 以及 <title>。

 <title> 定义文档的标题，它是 head 部分中唯一必需的元素。
```

### 41 HTML5 新增的表单元素有？

```
datalist 规定输入域的选项列表，通过 option 创建！ 
 
 keygen 提供一种验证用户的可靠方法，密钥对生成器，私钥存于客户端，公钥发到服务器，用于之后验证客户端证书！
 
 output 元素用于不同类型的输出！
```

### 42 在 HTML5 中，哪个方法用于获得用户的当前位置？

```
 getCurrentPosition()
```

### 43 文档的不同注释方式？

```
 HTML 的注释方法 <!--注释内容--> 
 
 CSS 的注释方法 /*注释内容*/ 
 
 JavaScript 的注释方法 /* 多行注释方式 */ //单行注释方式
```

### 44 disabled 和 readonly 的区别？

```
disabled 指当 input 元素加载时禁用此元素。input 内容不会随着表单提交。
  
 readonly 规定输入字段为只读。input 内容会随着表单提交。

 无论设置 readonly 还是 disabled，通过 js 脚本都能更改 input 的 value
```

### 45  主流浏览器内核私有属性 css 前缀？

```
 mozilla 内核 （firefox,flock 等）    -moz
 webkit  内核 （safari,chrome 等）   -webkit
 opera   内核 （opera 浏览器）        -o
 trident 内核 （ie 浏览器）           -ms
```

### 46 前端性能优化？

```
 前端性能优化主要是为了提高页面的加载速度，优化用户的访问体验。我认为可以从这些方面来进行优化。

 第一个方面是页面的内容方面

 （1）通过文件合并、css 雪碧图、使用 base64 等方式来减少 HTTP 请求数，避免过多的请求造成等待的情况。

 （2）通过 DNS 缓存等机制来减少 DNS 的查询次数。

 （3）通过设置缓存策略，对常用不变的资源进行缓存。

 （4）使用延迟加载的方式，来减少页面首屏加载时需要请求的资源。延迟加载的资源当用户需要访问时，再去请求加载。

 （5）通过用户行为，对某些资源使用预加载的方式，来提高用户需要访问资源时的响应速度。

 第二个方面是服务器方面

 （1）使用 CDN 服务，来提高用户对于资源请求时的响应速度。

 （2）服务器端启用 Gzip、Deflate 等方式对于传输的资源进行压缩，减小文件的体积。

 （3）尽可能减小 cookie 的大小，并且通过将静态资源分配到其他域名下，来避免对静态资源请求时携带不必要的 cookie

 第三个方面是 CSS 和 JavaScript 方面

 （1）把样式表放在页面的 head 标签中，减少页面的首次渲染的时间。把CSS文件<head>里：这样做可以使尽量多的CSS在首次渲染前可以被加载、解析。这样一来，即使因为CSS Rule Tree的变动导致Reflow（回流）与 Repaint（重绘），造成的影响也已经降到最小了。

 （2）避免使用 @import 标签。

 （3）尽量把 js 脚本放在页面底部或者使用 defer 或 async 属性，避免脚本的加载和执行阻塞页面的渲染。

 （4）通过对 JavaScript 和 CSS 的文件进行压缩，来减小文件的体积。
```

CDN网络：

CDN 是一个内容分发网络，通过对源网站资源的缓存，利用本身多台位于不同地域、不同运营商的服务器，向用户提供资就近访问的功能。也就是说，用户的请求并不是直接发送给源网站，而是发送给 CDN 服务器，由 CND 服务器将请求定位到最近的含有该资源的服务器上去请求。

这样有利于提高网站的访问速度，同时通过这种方式也减轻了源服务器的访问压力。

### 47 Html 规范中为什么要求引用资源不加协议头`http`或者`https`？

```
如果用户当前访问的页面是通过 HTTPS 协议来浏览的，那么网页中的资源也只能通过 HTTPS 协议来引用，否则浏览器会出现警告信息，不同浏览器警告信息展现形式不同。

 为了解决这个问题，我们可以省略 URL 的协议声明，省略后浏览器照样可以正常引用相应的资源，这项解决方案称为protocol-relative URL，暂且可译作协议相对 URL。

 如果使用协议相对 URL，无论是使用 HTTPS，还是 HTTP 访问页面，浏览器都会以相同的协议请求页面中的资源，避免弹出类似的警告信息，同时还可以节省5字节的数据量。
```

### 48 base64

[《base64》](https://zhuanlan.zhihu.com/p/339477329)  [图片格式](../html5/html.md)

### 49 浏览器的存储和缓存机制

```
浏览器存储：localStorage,sessionStorage,cookie,indexDB
浏览器缓存：主要是 HTTP 协议定义的缓存机制。浏览器缓存分为强缓存和协商缓存：
	
	浏览器再次访问一个已经访问过的页面的简单流程如下：
    1. 浏览器先根据这个资源的http头信息来判断是否命中强缓存。如果命中则直接加载缓存中的资源，并不会将请求发送到服务器。（强缓存）
    2. 如果未命中强缓存，则浏览器会将资源加载请求发送到服务器。服务器来判断浏览器本地缓存是否失效。若可以使用，则服务器并不会返回资源信息，浏览器继续从缓存加载资源。（协商缓存）
    3. 如果未命中协商缓存，则服务器会将完整的资源返回给浏览器，浏览器加载新资源，并更新缓存。（新的请求）
    
开启强缓存的方法：
    浏览器第一次访问一个页面，如果在请求头中设置了Expires或者Cache-Control，则在响应头中会添加一个Cache-Control字段或者Expires字段，Cache-Control字段是相对时间，Expires字段是绝对时间。第二次访问该页面时会首先检查有没有到达到期时间，如果有效，则会命中强缓存，则直接将缓存结果返回
    
开启协商缓存的两个方法：

    如果浏览器访问某个页面时在请求头添加了Etag，则服务器会返回一个Etag字段，则在第二次访问该页面时，会在请求头中添加一个If-None_Match字段，值就是服务器返回的值。服务器会将所请求的资源产生一个新Etag值，如果If-None_Match===新Etag,则表明资源没有修改，则直接返回缓存。
    
    如果浏览器访问某个页面时在请求头中设置了Last-Modified字段，则服务器会返回一个Last-Modified字段，值是该资源的上次修改的时间，则在第二次访问该页面时，会在请求头中添加一个If-Modify-Since，值就是上次返回的值，服务器会对比If-Modify-Since的时间和新的Last-Modified,相等则表明资源没有修改，则直接返回缓存。
```

### 50 mvc,mvp,mvvm

```
mvc出现之前，ajax出现后：

ajax技术出现后，前后端职责更加清晰了，前端通过ajax与后台服务器进行交互，前端开发人员只需要开发这部分内容，数据可由后台提供，而且ajax可实现页面的部分刷新
```

![image-20210524203939127](C:\Users\17273\AppData\Roaming\Typora\typora-user-images\image-20210524203939127.png)

```
前端的mvc模型：View,Controller,Model
Model:负责保存应用数据，与后台数据进行同步
Controller:负责业务逻辑，根据用户在视图层输入的命令，选取Mdel层的数据进行修改，产生相应的结果
View:负责视图展示，将model中的数据可视化出来
```

![image-20210524204408287](C:\Users\17273\AppData\Roaming\Typora\typora-user-images\image-20210524204408287.png)

在开发过程中很繁琐，三者单向数据流动，不灵活

```
MVP:
Presenter:可以理解为一个中间人，负责View和Model之间的数据流动，防止View和Model之间直接交流
View 非常薄，不部署任何业务逻辑，称为"被动视图"（Passive View），即没有任何主动性，而 Presenter非常厚，所有逻辑都部署在那里。
Presenter与具体的 View是没有直接关联的，而是通过定义好的接口进行交互，从而使得在变更View时候可以保持Presenter的不变，即模型与视图完全分离，我们可以修改视图而不影响模型
View 与 Model 不发生联系，都通过 Presenter 传递。

缺点：presenter需要和View/Model双向交互，需要的体积过大
```

![image-20210524205026428](C:\Users\17273\AppData\Roaming\Typora\typora-user-images\image-20210524205026428.png)

```
MVVM 模式将 Presenter 改名为 ViewModel，基本上与 MVP 模式完全一致,唯一的区别就是它采用双向绑定，View和ViewModel采用双向绑定。

MVVM：Model View ModelView

一个ViewModel和一个View匹配，它没有MVP中的IView接口，而是完全的和View绑定，所有View中的修改变化，都会自动更新到ViewModel中，同时ViewModel的任何变化也会自动同步到View上显示。

```

![image-20210524210426323](C:\Users\17273\AppData\Roaming\Typora\typora-user-images\image-20210524210426323.png)

```
这三者均是框架模式，目的都是为了解决Model和View的耦合问题
MVC模式多用于后端，优点是分层清晰，缺点是数据流混乱，灵活性差
MVP模式的Presenter作为中间层负责MV通信，解决了两者的耦合问题，但P过于臃肿
MVVM模式在前端领域应用广泛，不仅解决了MV耦合问题，还同时解决了维护两者映射关系的大量繁杂代码和DOM交互代码，提高了开发效率，保证了可读性

React不是mvvm架构，它是一个单向数据流的库，状态驱动视图。
State --> View --> New State --> New View
```

# 二 CSS类

1 css属性width默认值width: auto与width: 100%区别

> **width: auto**
>
> > - 子元素（包括content+padding+border+margin）撑满整个父元素的content区域。
> > - 子元素有margin、border、padding时，会减去子元素content区域相对应的width值
> > - 父元素的content = 子元素（content + padding + border + margin )width: 100%
>
> **width:100%**
>
> > - 强制将子元素的content区域 撑满 父元素的content区域
> > - 子元素有margin、border、padding时，不改变子元素content区域的width，而是溢出父盒子，保持原有值
> > - 父元素的content = 子元素的content

![image-20210506145202652](C:\Users\17273\AppData\Roaming\Typora\typora-user-images\image-20210506145202652.png)

![image-20210506150108679](C:\Users\17273\AppData\Roaming\Typora\typora-user-images\image-20210506150108679.png)



css清除浮动：

开启了BFC的元素，在其内部产生了一个独立的布局环境，不会对外部布局产生影响，从而如果该元素内部存在浮动元素为了不影响外部环境，则该元素就不能高度塌陷问题，从而解决了元素内部的浮动影响

## 1 visibility:collapse

```
当作用于table类的元素(table,tr,td,td...)时，相当于display:none，不显示也不占位置
当作用于非table类的元素时，相当于visibility:hidden，不显示但是占据空间位置
```

### 2 画一条0.5px的线

理论上px的最小单位是1。

在chrome中把0.5px四舍五入变成了1px，而firefox/safari能够画出半个像素的边，并且Chrome会把小于0.5px的当成0，而Firefox会把不小于0.55px当成1px，Safari是把不小于0.75px当成1px，进一步在手机上观察IOS的Chrome会画出0.5px的边，而安卓(5.0)原生浏览器是不行的。所以直接设置0.5px不同浏览器的差异比较大，并且我们看到不同系统的不同浏览器对小数点的px有不同的处理。所以如果我们把单位设置成小数的px包括宽高等，其实不太可靠，因为不同浏览器表现不一样。

1. 使用scale

   1. ```
      .line {
              border-bottom: 1px solid black;
              transform: scaleY(0.5);
            }
      ```

2. 移动端：将视口调整为完美视口，初始缩放调整为0.5，这样1px的线就可以表示为0.5px了

   1. ```
      <meta name="viewport" content="width=device-width, initial-scale=0.5">
      <style>
          #line3 {
              border-bottom: 1px solid #000;
          }
      </style>
      ```

### 2 设置一个元素的背景颜色，背景颜色会填充哪些区域？

content  padding   border

一般我们可能看到的是设置了border后，border是黑色的，看起来似乎背景颜色并没有填充border区域。

但是实际上是border简写属性默认颜色是黑色，如果我们将border-color设置为transparent 透明，则整体的背景颜色就会透出来

### 3  BFC 规范（块级格式化上下文：block formatting context）

```
块格式化上下文（Block Formatting Context，BFC）是Web页面的可视化CSS渲染的一部分，是布局过程中生成块级盒
子的区域，也是浮动元素与其他元素的交互限定区域。

通俗来讲

•BFC是一个独立的布局环境，可以理解为一个容器，在这个容器中按照一定规则进行物品摆放，并且不会影响其它环境中的物品。
•如果一个元素符合触发BFC的条件，则BFC中的元素布局不受外部影响。

创建BFC

（1）根元素或包含根元素的元素
（2）浮动元素float＝left|right或inherit（≠none）
（3）绝对定位元素position＝absolute或fixed
（4）display＝inline-block|flex|inline-flex|table-cell或table-caption
（5）overflow＝hidden|auto或scroll(≠visible)
```

回答：

```
BFC指的是块级格式化上下文，一个元素形成了BFC之后，那么它内部元素产生的布局不会影响到外部元素，外部元素的布局也
不会影响到BFC中的内部元素。一个BFC就像是一个隔离区域，和其他区域互不影响。

一般来说根元素是一个BFC区域，浮动和绝对定位的元素也会形成BFC，display属性的值为inline-block、flex这些
属性时也会创建BFC。还有就是元素的overflow的值不为visible时都会创建BFC。
```

### 4 清除浮动

```
1. 开启BFC
2. 使用clear属性，为元素添加clearfix伪类
3. 对于ie浏览器，使用zoom:1
```

### 5 table和ul的区别

table产生有行有列的数据，ul产生行数据，

### 6 文字超出用省略号表示

一行文字：

```
overflow:hidden;
text-overflow:ellipsis;
white-space:nowrap;
```

多行文字：适用于webkit内核的浏览器(Chrome,Sarafa,Opera, Chrome和Sarafa后来发展成为了Blink内核)，但是发现它同样适用于火狐浏览器(gecko内核)，IE不适用(trident内核)

```
overflow:hidden;
text-overflow:ellipsis;
-webkit-line-clamp: 3; // 控制一个块元素显示的文本的行数
display: -webkit-box; // 将对象作为弹性伸缩盒子模型
-webkit-box-orient: vertical; // 设置盒子的子元素的排列方式
```

### 7 css样式中浏览器的前缀

在CSS属性能中，时常会出现-webkit-，-moz-之类的前缀，这种就叫做浏览器私有前缀，是浏览器对于新CSS属性的一个提前支持。-webkit-是webkit内核的，-moz-是Firefox Gecko内核，moz代表的是Firefox的开发商Mozilla。
	为什么要有私有前缀呢？因为制定HTML和CSS标准的组织W3C动作是很慢的。通常，有w3c组织成员提出一个新属性，比如说圆角border-radius，大家都觉得好，但是w3c不会为这个属性制定标准，而是要走很复杂的程序，经过很多审查。而浏览器商不愿意等那么久，他们觉得一个属性已经够成熟了，就会在浏览器中加入支持。但是避免日后w3c公布标准时有所变更，就会加入一个私有前缀，比如-webkit-border-radius，通过这种方式来提前支持新属性，等到日后w3c公布了标准，border-radius的标准写法确立之后，再让新版的浏览器支持border-radius这种写法。

zhen
