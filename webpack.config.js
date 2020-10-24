const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const distDirname = require('./utils/get-distribution-dirname.js');

const projectConfig = require('./data/config/config-build.js');

module.exports = {
    watch: (process.env.WATCH === 'false' ? false : true),
    watchOptions: {
        ignored: [
            path.resolve(__dirname, 'node_modules', '**')
        ]
    },
    devtool: 'source-map',
    entry: './src/index.js',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    output: {
        path: path.join(__dirname, distDirname, 'casebook'),
        publicPath: '/casebook/',
        filename: (
            process.env.NODE_ENV === 'production' ?
                '[name].[contenthash].js' :
                '[name].js'
        )
    },
    performance: (function () {
        const ob = {};
        if (process.env.NODE_ENV === 'production') {
            ob.maxEntrypointSize = 1000000;
            ob.maxAssetSize = 1000000;
        } else {
            ob.maxEntrypointSize = 10000000;
            ob.maxAssetSize = 10000000;
        }
        return ob;
    }()),
    plugins: [
        new HtmlWebpackPlugin({
            title: `Casebook / ${projectConfig.subtitle}`,
            template: 'src/index.html.template'
        })
    ]
};
