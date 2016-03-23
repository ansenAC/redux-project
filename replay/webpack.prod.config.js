var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var WebpackMd5Hash = require('webpack-md5-hash');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {

    entry: {
        main: 'main',
        vendor: [
            'react',
            'redux',
            'react-redux',
        ],
        jquery: ['jquery']
    },

    output: {
        path: 'public',
        filename: '[name]_[chunkhash].js',
        chunkFilename: '[name]_[chunkhash].js'
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
                loader: ExtractTextPlugin.extract(
                    'css!autoprefixer!stylus'
                )
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
                    compact: false
                }
            },
            {
                test: /\.(woff(2)?|eot|ttf|svg)(\?[a-z0-9=\.]+)?$/,
                loader: 'file-loader',
                query: {
                    name: '[path][name]_[hash].[ext]',
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

    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
        new ExtractTextPlugin('[name]_[contentHash].css'),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names: [
                'vendor',
                'jquery'
            ]
        }),
        new WebpackMd5Hash(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            hash: false,
            inject: false,
            template: __dirname + '/view/index.ejs'
        }),
        new CleanWebpackPlugin(['public'], {
            root: __dirname,
            verbose: true,
            dry: false
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
