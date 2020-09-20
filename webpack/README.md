# 个人笔记

## 1 webpack基本概念
- webpack是是一种前端资源构建工具，一个静态的模块打包器(module bundler)
- webpack会将所有的js/json/less/img/css等文件均作为模块处理
- 它会设定一个入口文件，通过分析各个模块的依赖关系形成一个依赖关系图，然后依次将所有模块打包成静态资源(bundler)

#### 1.1 webpack的5个核心概念
- Entry
    - 入口(Entry)指示 webpack 以哪个文件为入口起点开始打包，分析构建内部依赖图。 
- Output
  - 输出(Outp)指示 webpack 打包后的资源 bundles 输出到哪里去，以及如何命名。
- Loader
  - Loader 让 webpack 能够去处理那些非JavScript文件(webpack自身只理解JavScript)
- Plugins
    - 插件(Plugins)可以用于执行范围更广的任务。插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量等。
- Mode  
![效果](./img/01.png)

## 2 webpack初体验
- 1 初始化package.json(即初始化项目)，在webpack文件加下直接初始化，这里初始化过程中填写的项目内容后期均可以在package.json文件中进行修改
```
npm init
```  
![效果](./img/00.png)
- package.json中的内容：  
![效果](./img/02.png)
- 2 将webpack直接安装到`webpack`文件夹下
```
npm install webpack webpack-cli -g  //全局安装
npm install webpack webpack-cli -D  //本地安装
```   
- 
  - 注意：这一步可能会出现以下问题  
![效果](./img/03.png)  
  - 解决办法：执行下面的命令
```
npm config set registry http://registry.npmjs.org
``` 
- 3 编译打包
    - 开发环境指令：`webpack ./src/js/index.js -o ./build/js/built.js --mode=production`
    - 生产环境指令：`webpack ./src/jsindex.js -o ./build/jsbuilt.js -mode=production`
    - 以开发环境打包得到结果：  
![效果](./img/04.png)
    - 观察开发环境和生产环境下的打包结果，可以发现在**开发环境下的打包结果压缩了**
- 另外，可以发现webpack可以直接编译打包的文件有：js和json
- 其他的文件不能直接编译打包，比如css,img.less等，这些文件需要借助loader工具预先处理，html等文件需要借助插件plugin进行预先处理

## 3 webpack开发环境的基本配置

- 注意：一旦确定以某个js文件作为入口文件，则需要**将其他需要编译打包的文件import到该入口文件中**，例如：  
![效果](./img/07.png)

#### 3.1 创建配置文件webpack.config.js
- 这是webpack的配置文件，直接指示webpack如何干活，干哪些活
- 配置文件的基本内容如下：**只包含js或者json的编译打包时webpack.config.js的文件的内容**：
```
// 引入nodejs的内置path模块，处理路径问题
const {resolve} = require('path');  

// 设置编译打包的输出
module.exports = {
    // 入口文件
    entry:'./src/js/index.js',
    // 输出配置
    output:{
        filename:'./build/js/built.js',
        // 输出路径
        // __dirname是nodejs的一个变量，表示当前文件(webpack.config.js)的目录路径
        path: resolve(__dirname, 'built.js')W
        // 上面两句话的意思：文件输出到webpack.config.js文件的目录/build/built.js
    },
    // loader配置
    module:{
        // 详细地loader配置
       rules:[] 
    },
    // plugin配置
    plugins:[
        // 详细配置
    ],
    // 设置开发环境
    mode: 'development'
}
```
- 编译打包的结果：  
![效果](./img/05.png)

#### 3.2 打包样式资源 css less
- 首先确定入口文件，将其他需要打包的文件(css,less)引入到入口文件中  
![07](img/07.png)

- 1 下载安装loader包:`css-loader style-loader less-loader`以及`less`
```
// 第一种方法：
npm install style-loader css-loader less-loader less -g

// 使用了第一种方法后面webpack有问题，可以使用第二种方法：
npm install style-loader --save
npm install css-loader --save
npm install less-loader --save
npm install less --save
```
- 2 在上面的webpack.config.js中直接修改module的内容
```
module: {
   rules:[
       // 详细地loader配置
       // 对于不同的文件需要配置不同的loader处理

       // 1 css文件
       {
           // 设置匹配哪些文件，使用正则表达式，下面表示匹配以css结尾的文件
           test:/\.css$/,
           // 进行哪些loader处理
           use: [
               // user中loader执行顺序：从右至左 依次执行
               // 首先css-loader将css文件变成commonjs模块加载到目标js文件中，以字符串样式呈现
               // 然后style-loader将目标js文件中的样式资源插入style标签中，添加到head中
               'style-loader','css-loader'
           ]
       },

       // 2 less文件
       {
        // 设置匹配哪些文件，使用正则表达式，下面表示匹配以css结尾的文件
        test:/\.less$/,
        // 进行哪些loader处理
        use: [
            // user中loader执行顺序：从右至左 依次执行
            // 首先less-loader将less文件编译成css文件
            // 然后css-loader将css文件变成commonjs模块加载到目标js文件中，以字符串样式呈现
            // 最后style-loader将目标js文件中的样式资源插入style标签中，添加到head中
            'style-loader','css-loader','less-loader'
        ]
    }
   ] 
},
```
- 3 然后使用webpack编译打包，效果如下：  
![效果](img/06.png)

#### 3.3 打包HTML资源:plugins
- html文件不用import进入口文件，在html中也不需要引入js文件或者less文件
- 1 下载html-webpack-plugin插件处理包
```
npm install html-webpack-plugin --save
```
- 2 修改webpack.config.js中plugins部分的内容
```
plugins:[
    // html-webpack-plugin插件配置
    new HtmlWebpackPlugin()
],
```
- 3 执行webpack命令，得到结果：  
![效果](./img/08.png)

## 4 图片资源的打包
- 1 安装包：
  -  首先，需要使用`html-loader`引入html中的图片到目标js文件中，所以先安装`html-loader`
  ```
  npm install html-loader ---save
  ```
  - 默认情况下，webpack处理不了html中的img图片，处理图片资源需要借助`url-loader`,而它又是依赖于`file-loader`产生作用的，所以首先就需要下载这两个loader包
  ```
  npm install url-loader file-loader ---save
  ```
- 2 搭配项目：  
![10](img/10.png)
  - ./src/index.html文件的内容：不需要引入less文件
  ```
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
  </head>
  <body>
      <div id="div1"></div>
      <div id="div2"></div>
      <div id="div3"></div>
      <img src="./img/angular.png" alt="angular">
  </body>
  </html>
  ```
- 3 配置webpack.config.js文件：
  - 执行顺序：
    - （1）通过入口文件开始打包，html-loader解析HTML文件中的图片文件
    -  (2) less-loader,css-loader,style-loader处理样式文件
    -  (3) url-loader解析样式中的图片路径问题，file-laoder处理其他文件格式
    -  (4) Plugins中的html-webpack-plugin则负责打包HTML文件;
```
const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry:'./src/index.js',
    output:{
        filename:'built.js',
        path:resolve(__dirname, 'build')
    },
    module:{
        rules:[
            // less文件
            {
                test:/\.less$/,
                use:['style-loader','css-loader','less-loader']
            },
            {
                // 1 匹配html文件，将html文件中的img引入目标js文件中，以commonjs模块化的形式
                test:/\.html$/,
                loader:'html-loader'
            },
            // png,jpg,gif
            {
                // 2 匹配图片，解析目标js文件中的样式的图片路径问题
                test:/\.(png|jpg|gif)$/,
                loader:'url-loader',
                options:{
                    // 限制如果图片大小小于12kb,则使用base64处理，这样可以减轻服务器的压力，但是如果图片太大使用base64处理就会导致请求速度变慢
                    limit:12*1024,
                    // 修改图片的命名，取图片的hash的前10位，ext表示取文件原来的扩展名
                    name: '[hash:10].[ext]'
                }
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    mode: 'development'
}
```
- 4 执行webpack指令，得到效果:  
  - 打包得到了4个文件，built.js,index.html,还有两张图片
  - 本来有3张图片，打包时却只有2张图片，这是因为还有一张图片的大小小于12kb,所以使用base64编码处理了
![效果](./img/09.png)![11](./img/11.png)

## 5 webpack打包其他资源
- 其他文件的打包方式：file-loader,排除js,css,html文件
```
module:{
    rules:[
        {
            test:/\.css$/,
            use:['style-loader','css-loader']
        },
        //打包其他资源（除了html,css,js之外的资源)
        {
            // 排除js,css,html文件
            exclude:/\.(js|css|html)$/,
            loader:'file-loader',
            options:{
                name: '[hash:10].[ext]'
            }
        }
    ]
}
```
- 例如：字体文件的打包：在网上下载一个字体包，然后找到下面的文件：  
![13](./img/13.png)
- html中内容如下：创建四个span,引入四个图标字体
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <span class="iconfont icon-icon-test"></span>
    <span class="iconfont icon-icon-test2"></span>
    <span class="iconfont icon-icon-test3"></span>
    <span class="iconfont icon-icon-test1"></span>
</html>
```
- 在index.js中需要引入iconfont.css
- 向上面说的添加module的rules,配置webpack.config.js文件
- 执行webpack命令后效果：  
![12](./img/12.png)

