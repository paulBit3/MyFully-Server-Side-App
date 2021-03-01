// This will configure the webpack to bundle the React code to be used in production mode

//requiring  objects
const path = require('path');
const CURRENT_WORKING_DIR = process.cwd();


// let's create the config object
const config = {
    mode: "production",
    entry: [
        path.join(CURRENT_WORKING_DIR , 'frontend/client/main.js')
    ],
    output: {
        path: path.join(CURRENT_WORKING_DIR , '/dist'),
        filename: 'bundle.js',
        publicPath: '/dist/'
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
    }
}

module.exports = config