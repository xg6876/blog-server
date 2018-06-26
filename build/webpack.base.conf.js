const path = require('path')

const resolve = (...paths) => {
    return path.resolve(__dirname, ...paths)
}

const config = {
    target: 'web',
    entry: {
        index:resolve('../src/assets/js/index.js')
    },
    output: {
        filename: '[name].js',
        path: resolve('../dist'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                include: [resolve(__dirname, '../src/assets/js')],
            },
            {
                test: /\.(gif|jpg|jpeg|png|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024,
                            name: '[path]/[name].[hash:8].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 1024,
                    name: '[path]/[name].[hash:8].[ext]'
                }
            }
        ]
    }
}

module.exports = config