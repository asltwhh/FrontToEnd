const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // 入口文件
    entry:'./src/js/index.js',
    // 只决定入口文件的输出位置和名字
    output:{
        filename:'js/built.js',
        path:resolve(__dirname, 'build')
    },
    // 配置各个资源的匹配规则和打包方式
    module:{
        rules:[
            // less   less文件和css文件会打包到js文件中保存
            {
                test:/\.less$/,
                use:['style-loader','css-loader','less-loader']
            },
            // css
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            },
            // 样式中的图片资源
            {
                test:/\.(png|jpg|gif)$/,
                loader:'url-loader',
                options:{
                    limit:10*1024,
                    name:'[hash:10].[ext]',
                    // 设定图片输出到哪个位置
                    outputPath:'imgs'
                }
                
            },
            // html中的图片资源
            {
                test:/\.html$/,
                loader:'html-loader'
            },
            // 其他的资源
            {
                exclude:/\.(html|css|less|js|jpg|png|gif)$/,
                loader:'file-loader',
                options:{
                    name:'[hash:10].[ext]',
                    // 设置其他文件打包到media目录下
                    outputPath:'media'
                }
            }
        ]
    },
    plugins:[
        // 打包html文件
        new HtmlWebpackPlugin({
            template:'./src/index.html'
        })
    ],
    // 设置开发模式
    mode:'development',
    // 开启自启动浏览器，自更新服务
    devServer:{
        contentBase: resolve(__dirname, 'build'),
        compress: true,
        port:3000,
        open:true
    }
}