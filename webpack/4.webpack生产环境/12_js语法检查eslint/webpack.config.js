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
            // eslint-loader
            {
                test:/\.js$/,
                exclude:/node_modules/,
                loader:'eslint-loader',
                options:{
                    // 自动修复代码中存在的格式问题
                    fix:true
                }
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