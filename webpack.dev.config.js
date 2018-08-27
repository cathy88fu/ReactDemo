const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    devtool: 'inline-source-map',
    entry:{
        app:path.join(__dirname,'src/index.js'),//入口
        vendor:['react','react-router-dom','react-dom','mobx','mobx-react']
    },
    output:{//输出
        path:path.join(__dirname,'./dist'),
        filename:'js/bundle.js',
        chunkFilename:'js/[name].chunk.js'
    },
    devServer: {
        historyApiFallback: true,
        //contentBase: path.join(__dirname, './dist'),
        hot: true,
        inline: true,
        progress: true,
        port: 8080,
        //host: '10.0.0.9',
        proxy: {
            '/test/*': {
                target: 'http://localhost',
                changeOrigin: true,
                secure: false
            }
        }
    },
    module:{
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude:/node_modules/,
                use: ['babel-loader?cacheDirectory=true'],//cacheDirectory用来缓存编译结果，下次编译加速
                include: path.join(__dirname, 'src'),
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader', 
                    use: ['css-loader']
                })
            },
            {
                test:/\.scss$/,
                //use: ['style-loader','css-loader','sass-loader']
                use:ExtractTextPlugin.extract({
                    fallback:'style-loader',
                    use:['css-loader','sass-loader']
                })
            },
            {
                test:[/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name:'images/[hash:8].[name].[ext]'
                    }
                }]
            }
        ]
    },
    plugins:[
        new CleanWebpackPlugin(['dist']),//打包优化
        new webpack.HashedModuleIdsPlugin(),//优化缓存
        new HtmlWebpackPlugin({
            filename:'index.html',
            template:path.join(__dirname,'src/index.html'),
            loader:'ejs-loader',//使用template时指定，否则生成的html不是期望的内容
        }),
        new webpack.optimize.RuntimeChunkPlugin({
            name: "vendor"
        }),
        new ExtractTextPlugin({
            filename: 'css/index.css',
            allChunks: true
        }),
        new UglifyJSPlugin()
    ],
}