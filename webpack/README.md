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
- html文件不用import进入口文件
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