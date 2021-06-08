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
            // png,jpg,gif
            {
                test:/\.(png|jpg|gif)$/,
                loader:'url-loader',
                options:{
                    limit:12*1024,
                    name: '[hash:10].[ext]'
                }
            },
            {
                test:/\.html$/,
                loader:'html-loader'
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