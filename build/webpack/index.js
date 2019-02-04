/*!
 * webpack 项目通用基础配置;  混入 config,  prod or dev
 * Created by j on 2018-12-24.
 */

console.log(process.env.NODE_ENV)

const config = require('./config')

module.exports = {
    mode: config.mode,  // 会设置打包文件环境下的 process.env.NODE_ENV
    devtool: config.devtool,
    context: config.context,  // 基础目录，绝对路径，用于从配置中解析入口起点(entry point)和 loader
    entry: config.entry,
    output: config.output,
    resolve: config.resolve,
    externals: config.externals,
    devServer: config.devServer,
    module: {
        rules: [
            /*{
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                enforce: 'pre',
                use: [
                    {
                        loader: 'eslint-loader',
                        options: {}
                    },
                    {
                        loader: 'inline-loader',
                        options: {}
                    }
                ]
            },*/
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: 'babel-loader',
                        /*options: { move to .babelrc
                            presets: ['@babel/preset-env'],
                            plugins: ['@babel/plugin-syntax-dynamic-import']
                        }*/
                    }
                ]
            },
            {
                test: /tpl\/.+\.html$/,
                exclude: /node_modules/,
                use: {loader: 'html-loader'}
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: '[hash].[ext]',
                            outputPath: './img',
                            publicPath: config.publicPath + 'img/'
                        }
                    }
                ]
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    config.cssLoader,
                    {
                        loader: 'css-loader',
                        options: {}
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            includePaths: config.nodeSassIncludePaths || ['']
                        }
                    }
                ]
            }
        ]
    },
    optimization: {
        splitChunks: {
            chunks: 'all',  // async initial all
            minSize: 30,  // 3k  chunk最小30k以上, 才会分离提取
            minChunks: 1,    // 最少有两次重复引用, 才会分离提取
            maxAsyncRequests: 25,
            maxInitialRequests: 25,
            automaticNameDelimiter: '~',
            name: '',
            cacheGroups: {
                styles: {
                    name: 'brick',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true,
                    priority: 20,
                },
                common: {
                    name: 'all',
                    test: /\.zzz/,
                    minChunks: 2,
                    chunks: 'async',
                    priority: 10,
                    minSize: 30000,
                    reuseExistingChunk: true // 表示是否使用已有的 chunk，如果为 true 则表示如果当前的 chunk 包含的模块已经被抽取出去了，那么将不会重新生成新的。
                }
            }
        }
    },
    plugins: config.plugins

}