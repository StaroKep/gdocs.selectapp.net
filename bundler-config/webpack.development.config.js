const path = require('path');
const { DefinePlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');

/** Common config */
const { root, entry, resolve, output, configModule, htmlTemplate, applicationConfig } = require('./common');

console.log(`
    ----------
    Mode: development
    ----------
`);

module.exports = env => ({
    mode: 'development',
    entry,
    resolve,
    output,
    devtool: 'source-map',
    devServer: {
        port: 60010,
        historyApiFallback: true,
        contentBase: path.join(root, 'dist'),
    },
    module: configModule,
    plugins: [
        new HtmlWebpackPlugin({
            template: htmlTemplate,
            inlineSource: '.(js|css)$',
            // favicon: './src/assets/images/favicon.ico',
        }),
        new DefinePlugin({
            'process.env.APP_ENV': JSON.stringify(env.APP_ENV),
            ...applicationConfig,
        }),
        new HtmlWebpackInlineSourcePlugin(),
    ],
});