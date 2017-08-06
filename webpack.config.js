var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var config = {
    entry: './source/app.ts',
    output: {
        pathinfo: true,
        filename: 'scripts/magmanuim.bundle.js',
        path: path.resolve('./dist'),
        publicPath: '',
    },
    plugins: [
        new CopyWebpackPlugin([{ from: './assets', to:'./assets' }]),
        new CopyWebpackPlugin([{ from: './node_modules/phaser/build/phaser.min.js', to:'./scripts' }]),
        new HtmlWebpackPlugin({ template: './index.html', inject: 'body' }),
        new webpack.NoEmitOnErrorsPlugin(),
    ],
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        loaders: [
            { test: /\.ts(x?)$/, loader: 'ts-loader' },
        ]
    },
    node: {
       fs: 'empty'
    },

    externals: {
        'phaser': 'Phaser'
    },
    devtool: 'cheap-source-map'
};

module.exports = config;