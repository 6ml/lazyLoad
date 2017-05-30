var path = require('path');
var webpack = require('webpack');
var CleanPlugin = require("clean-webpack-plugin");
//定义了一些文件夹的路径
var ROOT_PATH = path.resolve(__dirname);
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');

module.exports = {
    entry: {
        lazyload: path.resolve(ROOT_PATH, 'lazyload.js')
    },
    output: {
        path: BUILD_PATH,
        filename: '[name].min.js'
    },
    plugins: [
        new CleanPlugin(['build']),
        new webpack.optimize.UglifyJsPlugin({optimize: true,compress:{warnings:false,drop_console:true}})
    ]
};
