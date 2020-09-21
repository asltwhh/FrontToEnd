const {resolve} = require('path'); 
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 设置nodejs的环境变量
process.env.NODE_ENV = 'development';


module.exports = {
    entry: './src/js/index.js',
    output:{
        filename:'js/built.js',
        path:resolve(__dirname, 'build')
    },
    module:{
        rules:[
            // css文件
            {
                test:/\.css$/,
                use:[
                    // 这个插件.loader取代了style-loader
                    // style-loader将样式内容从js中文件中读出，然后放在style标签中
                    // 这个loader直接提取js中的样式内容成为单独文件
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            // 对输出的文件进行重命名
            filename:'css/index.css'
        })
    ],
    mode: 'development'
}