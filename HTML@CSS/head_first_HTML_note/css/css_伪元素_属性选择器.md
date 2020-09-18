
### 伪元素
    - 可以指定元素内部某一部分内容的样式，这部分的内容可能不便于包围在div或者span中，也不方便用其他方法来选择
        - span就是将其中的一些内联文本圈起来方便为其指定不同的样式
    - 例如first-line和first-letter均是伪元素

#### 1 first-line
    - 可以选择块元素的第一行的内容，并为其指定样式
    p:first-line{
        font-size:3em;
    }

#### 2 first-letter
    - 可以选择块元素的第一个字母，并为其指定样式
    p:first-letter{
        font-size:3em;
    }

### 属性选择器
    - 根据属性值选择元素，为有规定属性或者属性值的元素设定样式
    p[width]{  为有width属性的元素设置背景
        background:url(tt.gif) red top left;
    }
    img[height="200"]{   为高度为200像素的图像设置边框
        border:thin red solid;
    }
    img[alt~="you"]{   为alt属性值中包含you的图像设置边框
        border:thin red solid;  
    }
    

### 按兄弟元素选择
    h1+p{  选择前面有一个h1元素的段落
        font-style:italic;
    }



