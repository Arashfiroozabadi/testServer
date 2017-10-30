const path = require('path');

module.exports = {
    entry:'./app/index.js',
    output:{
        path: path.resolve(__dirname,'build'),
        filename: 'budle.js'
    },
    module:{
        rules:[
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                  presets: ['es2015']
                }
            }
        ]
    }
};