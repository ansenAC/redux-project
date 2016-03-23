var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');

// 配成自己的ip
var localPath = 'http://172.24.61.11:8080';

module.exports = {

    devtool: 'source-map',

    entry: [
        'main.js',
        'webpack-dev-server/client?' + localPath,
        'webpack/hot/only-dev-server',
    ],

    output: {
        path: 'build',
        publicPath: localPath + '/', // 本地serverIp方便调试
        filename: '[name].js'
    },

    module: {
        loaders: [
            {
                test: /\.(png|jpg)$/,
                loader: 'file-loader',
                query: {
                    name: '[path][name].[ext]',
                    context: 'src/'
                }
            },
            {
                test: /\.styl$/,
                loader: 'style-loader!css-loader!autoprefixer!stylus-loader'
            },
            {
                test: /\.jsx?$/,
                loader: 'react-hot',
                exclude: /node_modules/
            },
            {
                test: /\.jsx?$/,
                loader: 'babel',
                exclude: /(node_modules)/,
                query: {
                    presets: ['es2015', 'react', 'node5'],
                }
            },
            {
                test: /\.(woff(2)?|eot|ttf|svg)(\?[a-z0-9=\.]+)?$/,
                loader: 'file-loader',
                query: {
                    name: '[path][name].[ext]',
                    context: 'src/styles/'
                }
            }
        ]
    },

    resolve: {
        root: [
            __dirname + '/src/'
        ],
        alias: {
            styles: __dirname + '/src/styles',
            'painter': __dirname + '/dep/painter/0.0.2/src',
            'zlib': __dirname + '/dep/zlib/0.0.1/src',
            'cobble': __dirname + '/dep/cobble/0.3.13/src',
            'delightui': __dirname + '/dep/delightui'
        }
    },

    devServer: {
        host: '0.0.0.0',
        proxy: {
            '/live/*': 'http://127.0.0.1:3000'
        }
    },

    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            hash: false,
            inject: true,
            template: __dirname + '/view/index.html'
        }),
        new CopyWebpackPlugin(
            [
                {
                    from: __dirname + '/src/image/emotion',
                    to: '/image/emotion'
                }
            ]
        )
    ]

};
