const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
module.exports = {
    entry:{
        app:[
            'babel-polyfill',
            path.join(__dirname,'src/index.js')
        ],
        vendor:['react','react-router-dom','react-dom',]
    },
    output:{
        path:path.join(__dirname,'./dist'),
        filename:'static/js/[name].[chunkhash:8].js',
        chunkFilename:'static/js/[name].[chunkhash:8].chunk.js'
    },
    module:{
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude:/node_modules/,
                use: ['babel-loader'],//cacheDirectory用来缓存编译结果，下次编译加速
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
                        name:'static/images/[hash:8].[name].[ext]'
                    }
                }]
            }
        ]
    },
    plugins:[
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
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
            filename: 'static/css/[hash:8].[name].css',
            allChunks: true
        }),
        new UglifyJSPlugin()
    ],
}