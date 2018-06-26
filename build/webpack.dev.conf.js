const path = require('path')
var colors = require('colors')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HTMLPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MemoryFS = require('memory-fs')
const baseConfig = require('./webpack.base.conf')


const resolve = (...paths) => {
    return path.resolve(__dirname, ...paths)
}

const config = merge(baseConfig, {
    devtool: '#cheap-module-eval-source-map',
    module: {
        rules: [
            {
                test: /\.scss/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.HashedModuleIdsPlugin(),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'runtime'
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development')
            }
        }),
        new CopyWebpackPlugin([
            {
                from: resolve(__dirname, '../src/views'),
                to: resolve(__dirname, '../dist/views'),
                ignore: ['.*']
            }
        ]),
        new HTMLPlugin({
            filename: '../src/views/admin/index.art',
            template: resolve(__dirname, '../src/views/admin/index.art'),
            inject: true,
            chunksSortMode: 'dependency',
            chunks: ['runtime', 'index']
        })

    ],
    watch: true,
    watchOptions: {
        ignored: /node_modules/,
        // 监听到变化发生后会等300ms再去执行动作，防止文件更新太快导致重新编译频率太高
        // 默认为 300ms  
        aggregateTimeout: 800,
        // 判断文件是否发生变化是通过不停的去询问系统指定文件有没有变化实现的
        // 默认每秒轮询1000次
        poll: 1000
    }
})

const webpackCompiler = webpack(config);
// const mfs = new MemoryFS();
// webpackCompiler.outputFileSystem = mfs;

webpackCompiler.watch({}, (err, stats) => {
    if (err) throw err
    console.log(stats.errors)
    console.log(stats.warnings)
    stats = stats.toJson()
    stats.errors.forEach(err => console.log(err))
    stats.warnings.forEach(warn => console.warn(warn))
    console.log('generate success'.green)
})



