// server-side webpack configuration for our dev

//requiring  objects
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CURRENT_WORKING_DIR = process.cwd();


// let's create the config object
const config =  {
    name: "server",
    entry: [ path.join(CURRENT_WORKING_DIR , './backend/server/server.js') ],
    target: "node",
    //output bundled code in server.generated.js in the dist folder
    output: {
        path: path.join(CURRENT_WORKING_DIR , '/dist/'),
        filename: "server.generated.js",
        publicPath: '/dist/',
        libraryTarget: "commonjs2"
    },
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [ 'babel-loader' ]
            }
        ]
    }
}

module.exports = config