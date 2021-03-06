const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HappyPack = require('happypack');
const getClientEnvironment = require('./env');
const _ENV  = getClientEnvironment('development');

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry:{
        app:[
            'babel-polyfill',
            path.join(__dirname,'src/index.js'),//入口
        ],
        vendor:['react','react-router-dom','react-dom','mobx','mobx-react','antd-mobile','axios']
    },
    output:{//输出
        path:path.join(__dirname,'./'+_ENV.publicUrl),
        // filename:'static/js/bundle.js',
        chunkFilename:'static/js/[name].chunk.js',
        publicPath:'/'
    },
    devServer: {
        historyApiFallback: true,
        contentBase: path.join(__dirname, './'+_ENV.publicUrl),
        hot: true,
        inline: true,
        progress: true,
        // port: 8080,
        /* proxy: {
            '/api': {
                target:'',
                changeOrigin: true,
                secure: false,
                pathRewrite: {
					'^/api': ''
				}
            }
        }  */
    },
    module:{
        rules: [
            {
                test: /\.(js|jsx)$/,
                use:['happypack/loader?id=babel'],
                //use: ['babel-loader?cacheDirectory=true'],//cacheDirectory用来缓存编译结果，下次编译加速
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
                        //publicPath:'/'//解决css中解析图片路径错误问题
                    }
                }]
            }
        ]
    },
    plugins:[
        new webpack.DefinePlugin(_ENV.NODE_ENV),
        new webpack.HotModuleReplacementPlugin(),//热替换
        // new CleanWebpackPlugin([_ENV.publicUrl]),//打包优化
        new webpack.HashedModuleIdsPlugin(),//优化缓存
        // new BundleAnalyzerPlugin(),
        new HappyPack({
            id: 'babel',
            loaders: [{
              loader: 'babel-loader?cacheDirectory=true',
            }],
          }),
        new HtmlWebpackPlugin({
            filename:'index.html',
            template:path.join(__dirname,'src/index.html'),
            loader:'ejs-loader',//使用template时指定，否则生成的html不是期望的内容
        }),
        new webpack.optimize.RuntimeChunkPlugin({
            name: "vendor"
        }),
        new ExtractTextPlugin({
            filename: 'static/css/index.css',
            allChunks: true
        }),
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