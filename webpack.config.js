// entry -> output
const path = require('path');
module.exports = {
    entry: './src/app.js',
    output: {
        path: path.join(__dirname,'public'), //absolute path so we cannot use ./
        filename: 'bundle.js'
    },
    module:{
        rules:[{
            loader: 'babel-loader',
            test: /\.js$/,
            exclude: /node_modules/,

        },{
            test: /\.s?css$/, //any file that ends with css
            use:[ //allows us to provide an array of loaders
                'style-loader', //dump its content into the DOM in a <style> tag and the end result is our styles showing up
                'css-loader', // whenever webpack encounter a .css file its going to read that file
                'sass-loader' //allow us actually import sass files
            ]
        }]
    },
    devtool: 'cheap-module-eval-source-map',
    devServer:{
        contentBase: path.join(__dirname,'public'),
        historyApiFallback: true
    }
};