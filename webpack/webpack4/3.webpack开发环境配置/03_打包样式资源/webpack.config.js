// 引入nodejs的内置path模块，处理路径问题
const {resolve} = require('path');  

// 设置编译打包的输出
module.exports = {
    // 入口文件
    entry:'./src/js/index.js',
    // 输出配置
    output:{
        // 输出文件名
        filename:'built.js',
        // 输出路径
        path: resolve(__dirname, 'build')
    },
    // loader配置
    module: {
       rules:[
           // 详细地loader配置
           // 对于不同的文件需要配置不同的loader处理

           // 1 css文件
           {
               // 设置匹配哪些文件，使用正则表达式，下面表示匹配以css结尾的文件
               test: /\.css$/,
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
    // plugin配置
    plugins:[
        // 详细配置
    ],
    // 设置开发环境
    mode: 'development'
}