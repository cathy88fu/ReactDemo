const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HappyPack = require('happypack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const getClientEnvironment = require('./env');
const _ENV  = getClientEnvironment('testing');
module.exports = {
    // devtool: 'cheap-module-source-map',
    entry:{
        app:[
            'babel-polyfill',
            path.join(__dirname,'src/index.js')
        ],
        vendor:['react','react-router-dom','react-dom','mobx','mobx-react']
    },
    output:{
        path:path.join(__dirname,'./'+_ENV.publicUrl),
        filename:'static/js/[name].[chunkhash:8].js',
        chunkFilename:'static/js/[name].[chunkhash:8].chunk.js',
        publicPath:''
    },
    module:{
        rules: [
            {
                test: /\.(js|jsx)$/,
                // use:['happypack/loader?id=babel'],
                use: ['babel-loader?cacheDirectory=true'],//cacheDirectory用来缓存编译结果，下次编译加速
                include: path.join(__dirname, 'src'),
                exclude:path.resolve(__dirname,'node_modules'),
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
                test:/\.(bmp|gif|png|jpg|jpeg|woff|svg|ttf|eot)\??.*$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name:'static/images/[hash:8].[name].[ext]',
                        publicPath:'/'+_ENV.publicUrl+'/'
                    }
                },{
	            	loader:'image-webpack-loader',
                    options:{
                        bypassOnDebug: true
                    }
	            }]
            }
        ]
    },
    plugins:[
        new webpack.DefinePlugin(_ENV.NODE_ENV),
        new CleanWebpackPlugin([_ENV.publicUrl]),//打包优化
        /* new HappyPack({
            id: 'babel',
            loaders: [{
              loader: 'babel-loader?cacheDirectory=true',
            }],
          }), */
        new webpack.HashedModuleIdsPlugin(),//优化缓存
        new HtmlWebpackPlugin({
            filename:'index.html',
            template:path.join(__dirname,'src/index.html'),
            loader:'ejs-loader',//使用template时指定，否则生成的html不是期望的内容
            minify: { // 压缩 HTML 的配置
                collapseWhitespace: true,
                removeComments: true,
                useShortDoctype: true
              }
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
    resolve: {
        alias: {
            pages: path.join(__dirname, 'src/pages'),
            components: path.join(__dirname, 'src/components'),
            router: path.join(__dirname, 'src/router'),
            stores: path.join(__dirname, 'src/stores'),
        }
    }
}