var webpack = require('webpack');

module.exports = {
    
     entry: ["babel-polyfill", './src/Index.js'] , 

    output: {
        path: __dirname + '/public/',
        filename: 'bundle.js'
    },

    devServer: {
        hot: true,
        inline: true,
        host: '0.0.0.0',
        port: 80,
        contentBase: __dirname + '/public/',
        historyApiFallback: true , 
         disableHostCheck : true
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/,
                query: {
                    cacheDirectory: true,
                    presets: ['es2015', 'react']
                }
            }, 
            {
                test: /\.css$/,
                loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
            },
            {
                test: /jquery[\\\/]src[\\\/]selector\.js$/,
                loader: 'amd-define-factory-patcher-loader'
            }
        ]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ] , 
    
};
