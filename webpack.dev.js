const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const webpack = require('webpack')

module.exports = merge(common, {
    output: {
        path: __dirname,
        publicPath: '/',
        filename: '[name].[chunkhash].js'
    },
    devtool: 'inline-source-map',
    devServer: {
        port: 3000,
        historyApiFallback: true
    },
})
