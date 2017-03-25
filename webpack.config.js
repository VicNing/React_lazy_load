const path = require('path');

const config = {
    entry: {
        app: './js/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        // publicPath: '/webpack_lazy_load/dist/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                options: {
                    presets: ['es2015', 'react'],
                    cacheDirectory: './cache',
                    plugins: ['syntax-dynamic-import']
                },
            }
        ]
    },
    devServer: {
        contentBase: path.resolve(__dirname),
        inline: true,
        historyApiFallback: true
    },
    devtool: "source-map",

};
module.exports = config;