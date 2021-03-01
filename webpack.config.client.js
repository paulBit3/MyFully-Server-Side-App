// client-side webpack configuration for our dev

//requiring  objects
const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const CURRENT_WORKING_DIR = process.cwd();

// let's create the config object
const config = {
    name: "browser",
    mode: "development",
    devtool: 'eval-source-map',
    entry: [
        'webpack-hot-middleware/client?reload=true',
        path.join(CURRENT_WORKING_DIR , 'frontend/client/main.js')
    ],
    output: {
        filename: 'bundle.js',
        path: path.join(CURRENT_WORKING_DIR , '/dist'),
        publicPath: '/dist/' // Webpack dev middleware, if enabled, handles requests for this URL prefix
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ],
    resolve:  {
        alias: {
            'react-dom': '@hot-loader/react-dom'
        }
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader'
                ]
            }
        ]
    },
}

module.exports = config


