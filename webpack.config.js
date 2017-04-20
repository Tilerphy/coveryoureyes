var path = require('path');
var webpack = require('webpack');

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: {
		index: './app/src/js/page/index.js'
	},
	output: {
		path: path.join(__dirname, 'app/asset'),
		publicPath: '../',
		filename: 'js/[name].js'
	},
	module: {
		loaders: [
			{
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                	fallback: 'style-loader',
                	use: 'css-loader'
            	})
            },
			{
                test: /\.less/,
                loader: ExtractTextPlugin.extract('css-loader!less-loader')
            },
            {
                test: /\.html$/,
                loader: "html-loader?attrs=img:src img:data-src"
            },
            {
                test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader?name=./fonts/[name].[ext]'
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader?limit=8192&name=./img/[hash].[ext]'
            }
		]
	},
	plugins: [
		new webpack.ProvidePlugin({
			$: 'jquery'
		}),
		new ExtractTextPlugin('css/[name].css'),
		new HtmlWebpackPlugin({
            filename: './view/index.html',
            template: './app/src/view/index.html',
            inject: 'body',
            hash: true,
            chunks: ['index'],//需要引入的chunk，不配置就会引入所有页面的资源
            minify: {
                removeComments: true,
                collapseWhitespace: false
            }
        }),
        // Hot-load
        new webpack.HotModuleReplacementPlugin()
	]
};
