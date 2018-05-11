const path = require('path')
const WebpackAssetsManifest = require('webpack-assets-manifest')

const config = {
    entry: {
        index: ['./src/index.js'],
        vendor: [
            'babel-polyfill',
            'whatwg-fetch',
            'react',
            'react-dom',
            'material-ui',
            'redux',
            'react-redux',
            'react-router-dom',
            'redux-saga',
            'react-tooltip',
            'react-table',
            'react-select',
        ]
    },
    module: {
        rules: [{
            test: /\.js$|\.jsx$/,
            use: 'babel-loader?cacheDirectory',
            exclude: /node_modules\/(?!(query-string|strict-uri-encode)\/).*/,
        }, {
            test: /\.css$/,
            loaders: ['style-loader', 'css-loader']
        },
            {
                test: /\.svg$/,
                loader: 'svg-loader'
            }]
    },
    plugins: [
        new WebpackAssetsManifest(),
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                default: false,
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all'
                },
            },
        },
    },
}

module.exports = config