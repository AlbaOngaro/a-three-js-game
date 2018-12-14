const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const sass = require('node-sass');
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
    entry: {
        'bundle.js': [
            path.resolve(__dirname, 'src/js/game.js')
        ]
    },
    output: {
        filename: 'js/game.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
          rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ],  
    },
    plugins: [
        new CleanWebpackPlugin([
            'dist'
        ],{
            exclude:  ['index.html']
        }),
        new CopyWebpackPlugin([
            { 
                from: './src/scss/styles.scss', 
                to: './css/styles.css', 
                toType: 'file',
                transform (content, path) {
                    let result = sass.renderSync({
                      data: content.toString('utf-8')
                    });
                
                    return result.css.toString('utf-8');
                }
            },
        ]),
        new CopyWebpackPlugin([
            {from: './src/models', to: './models'}
        ])
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist')
    }
};