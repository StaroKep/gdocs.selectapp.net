const path = require('path');
const { DefinePlugin } = require('webpack');

const infraPath = path.resolve(__dirname);

module.exports = () => ({
    target: 'node',
    mode: 'production',
    entry: path.resolve(infraPath, 'src/index.ts'),
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
    output: {
        filename: 'main.js',
        path: path.resolve(infraPath, 'dist'),
    },
    module: {
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
        ],
    },
    plugins: [
        new DefinePlugin({
            'process.env.DIR_NAME': JSON.stringify(__dirname),
        }),
    ]
});
