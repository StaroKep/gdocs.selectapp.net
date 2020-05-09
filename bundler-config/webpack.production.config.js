const { DefinePlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');

/** Common config */
const { entry, resolve, output, configModule, htmlTemplate, applicationConfig } = require('./common');

console.log(`
    ----------
    Mode: production
    ----------
`);

module.exports = env => ({
    mode: 'production',
    entry,
    resolve,
    output,
    module: configModule,
    plugins: [
        new HtmlWebpackPlugin({
            template: htmlTemplate,
            inlineSource: '.(js|css)$',
            // favicon: './src/assets/images/favicon.ico',
        }),
        new DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(env.APP_ENV),
            'process.env.APP_ENV': JSON.stringify(env.APP_ENV),
            ...applicationConfig,
        }),
        new HtmlWebpackInlineSourcePlugin(),
    ],
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
    },
});