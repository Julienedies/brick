/*!
 * webpack根据具体项目所做的配置
 * Created by j on 2018-12-31.
 */

const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const shellPlugin = require('webpack-shell-plugin')
const CleanPlugin = require('clean-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const FileManagerPlugin = require('filemanager-webpack-plugin');

const pkg = require('../../package.json')

const isPro = process.env.NODE_ENV === 'production'

const dev = require('./dev')
const pro = require('./pro')

const config = isPro ? pro : dev

const publicPath = config.publicPath
const projectRoot = path.resolve(__dirname, '../../')
const outputPath = path.resolve(__dirname, '../../dist')  //, `./${ pkg.version }`
const context = path.resolve(__dirname, '../../src')

const nodeSassIncludePaths = [path.resolve(__dirname, '../../../')]

const devtool = config.devtool

const entry = {
    'brick': './brick.js',
    'brick.datepicker': './directives/datepicker.js',
    'brick.transition': './services/transition.js',
}

const output = {
    path: outputPath,
    publicPath: publicPath,
    filename: '[name].js',
    chunkFilename: '[name].js',
    sourceMapFilename: '[file].map',
    libraryTarget: 'umd',
    globalObject: 'this',
    libraryExport: 'default',
    library: '[name]'
}

const resolve = {
    alias: {},
    extensions: ['.js', '.json', '.scss', '.css']
}

const plugins = [
    new webpack.DefinePlugin({
        'VERSION': `'V${pkg.version}'`,
        'TIMESTAMP': JSON.stringify((new Date).toLocaleString())
    }),
    new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[name].css',
        sourceMap: false, // 关键：关闭插件的内联 sourceMap
    }),
    new FileManagerPlugin({
        events: {
            onEnd: {
                copy: [
                    { source: path.resolve(__dirname,'../../dist/*'), destination: path.resolve(__dirname, '../../page/js/brick/') },
                    {
                        source: path.resolve(__dirname,'../../dist/*'), destination: path.resolve(__dirname, '../../../shandy/node_modules/@julienedies/brick/dist/'),
                        onStart: () => console.log('开始复制到 shandy/node_modules...'),
                        onEnd: () => console.log('完成复制到 shandy/node_modules...'),
                        onError: (err) => console.error('复制失败:', err),
                        options: {
                            overwrite: true,
                        },
                    },
                    { source: path.resolve(__dirname,'../../dist/*'), destination: path.resolve(__dirname, '../../../crx-jhandy/node_modules/@julienedies/brick/dist/') }
                ]
            }
        }
    }),
    // new CleanPlugin([`dist`], {
    //     root: projectRoot
    // }),
    new webpack.BannerPlugin({
        entryOnly: true,
        banner: `https://github.com/julienedies/brick.git
https://github.com/Julienedies/brick/wiki
license:ISC
V${pkg.version}
${(new Date).toLocaleString()}
`,
    }),
];

const externals = {
    jquery: {
        commonjs: 'jquery',
        commonjs2: 'jquery',
        amd: 'jquery',
        root: '$'
    },
    lodash: {
        commonjs: 'lodash',
        commonjs2: 'lodash',
        amd: 'lodash',
        root: '_'
    },
    moment: {
        commonjs: 'moment',
        commonjs2: 'moment',
        amd: 'moment',
        root: 'moment'
    },
    '@julienedies/brick': {
        commonjs: '@julienedies/brick',
        commonjs2: '@julienedies/brick',
        amd: 'brick',
        root: 'brick'
    },
};

let devServer = {}
let cssLoader = {
    loader: MiniCssExtractPlugin.loader,
    options: {
        publicPath: publicPath
    }
}

if (isPro) {  // 产品环境

} else {

    // 添加热模块替换client端脚本
    /*    for (let i in entry) {
            let arr = entry[i]
            arr = Array.isArray(arr) ? arr : [arr]
            arr.push('webpack-hot-middleware/client')
            entry[i] = arr
        }

        plugins.push(new webpack.HotModuleReplacementPlugin())*/

    /*    devServer = {
            publicPath: publicPath,
            contentBase: outputPath,
            hot: true
        }*/

}


module.exports = {
    mode: config.mode,
    projectRoot,
    publicPath,
    context,
    nodeSassIncludePaths,
    devtool,
    cssLoader,
    devServer,
    entry,
    output,
    resolve,
    externals,
    plugins
}
