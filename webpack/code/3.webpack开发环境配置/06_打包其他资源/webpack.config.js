const { resolve } = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output:{
        filename:'built.js',
        path:resolve(__dirname, 'build')
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            },
            //打包其他资源（除了html,css,js之外的资源)
            {
                // 排出js,css,html文件
                exclude:/\.(js|css|html)$/,
                loader:'file-loader',
                options:{
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
    mode:'development'
}