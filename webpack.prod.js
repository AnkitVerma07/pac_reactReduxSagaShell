const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = merge(common, {
    output: {
        path: path.resolve('../EtWeb/src/main/webapp/www/build/'),
        filename: '[name].[chunkhash].min.js',
        libraryTarget: 'var',
        library: 'EntryPoint'
    },
    optimization: {
        minimizer: [
            new UglifyJSPlugin({
                sourceMap: false,
                cache: true,
                parallel: true
            })
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ]
})
