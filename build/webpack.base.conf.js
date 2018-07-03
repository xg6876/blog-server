const path = require('path')

const resolve = (...paths) => {
    return path.resolve(__dirname, ...paths)
}

const config = {
    target: 'web',
    entry: {
        index:resolve('../src/assets/js/admin/articles.js'),
        login:resolve('../src/assets/js/admin/login.js')
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
                test: /\.art$/,
                loader: 'art-template-loader',
                include: [resolve(__dirname, '../src/views')],
            },
            {
                test: /\.css/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.(gif|jpg|jpeg|png|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024,
                            name: '[path]/[name].[hash:7].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(woff|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 1024,
                    name: '[path]/[name].[hash:7].[ext]'
                }
            }
        ]
    }
}

module.exports = config