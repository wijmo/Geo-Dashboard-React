const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.jsx',
    module: {
        rules: [
            { 
                test: /\.js$/,
                use: ["source-map-loader"],
                enforce: "pre"
            },
            { 
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react'
                        ]
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                  { loader: 'style-loader' },
                  { loader: 'css-loader' }
                ]
            },
            {
                // to load bootstrap fonts
                test: /\.(png|woff|woff2|eot|ttf|svg)$/, 
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 100000
                        }
                    }
                ]
            }            
        ]
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: [ '.js', '.jsx' ]
    },
    plugins: [
        new HtmlWebpackPlugin({  
          template: 'index.html'
        }),
        new CopyWebpackPlugin([{
            context: path.resolve(__dirname, "src", "assets"),
            from: '**/*',
            to: 'assets'
        }])
    ],
    devServer: {
        contentBase: './dist'
    },
    devtool: "inline-source-map"
};