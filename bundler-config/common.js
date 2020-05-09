const path = require('path');
const root = path.resolve(__dirname, '../');

module.exports.applicationName = 'Payment Widget';

module.exports.root = root;
module.exports.entry = path.resolve(root, 'src/index.tsx');
module.exports.htmlTemplate = path.resolve(root, 'src/index.html');

module.exports.resolve = {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
        src: path.resolve(root, 'src/'),
    },
};

module.exports.output = {
    filename: 'main.js',
    path: path.resolve(root, 'dist'),
};

module.exports.configModule = {
    rules: [
        {
            test: /\.ts|.tsx$/,
            exclude: /node_modules/,
            use: [
                {
                    loader: 'babel-loader',
                },
                {
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: true,
                    },
                },
            ],
        },
        {
            test: /\.pcss/,
            use: [
                'style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        sourceMap: true,
                        modules: true,
                        importLoaders: 1,
                        localIdentName: '[name]__[local]___[hash:base64:5]',
                    },
                },
                { loader: 'postcss-loader' },
            ],
        },
        {
            test: /\.(png|jpg|gif)$/i,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        esModule: false,
                    },
                },
            ],
        },
    ],
};
